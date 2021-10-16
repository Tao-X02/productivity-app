// Import modules
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Import Mongoose model
import userModel from '../models/User.js';

// Import validations
import validateLogin from '../validation/login.js'
import validateSignup from '../validation/register.js';

const app = express();
const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    const users = await userModel.find({});
    try {
        res.json(users).status(200);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// GET user by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    userModel.findById(id, (err, entry) => {
        if (err) {
            res.status(400).send(err);
        }
        res.send(entry);
    })
});

// POST new user
router.post('/', async (req, res) => {
    const userFirst = req.body.firstName;
    const userLast = req.body.lastName;
    const userPassword = req.body.password;
    const userEmail = req.body.email;
    const user = new userModel({
        firstName: userFirst,
        lastName: userLast,
        password: userPassword,
        email: userEmail,
        tasks: []
    });
    try {
        await user.save();
        res.send(user);
    } catch(error) {
        console.error(error);
        res.status(400).send(error);
    };
});

// Patch user
router.patch('/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).exec();
        
        let query = {$set: {}};
        for (let key in req.body) {
            if (user[key] && user[key] != req.body[key]) {
                query.$set[key] = req.body[key];
            }
        }
        const updatedUser = await userModel.findOneAndUpdate({_id: req.params.id}, query);
		res.send(updatedUser);
	} catch (error) {
		console.error(error);
        res.status(400).send(error);
	}
});

// Delete user
router.delete('/:id', (req, res) => {
    userModel.findByIdAndRemove(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        console.error(error);
        res.status(400).send(error);
    })
});

// Register user
router.post('/register', async (req, res) => {
    // Validate
    const { errors, isValid } = validateSignup(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check if user already exists
    userModel.findOne({ email: req.body.email }).then(currentUser => {
        if (currentUser) {
            return res.status(400).json({ email: "Email already in use" });
        } else {
            // Use inputs
            const userFirst = req.body.firstName;
            const userLast = req.body.lastName;
            const userPassword = req.body.password;
            const userEmail = req.body.email;
            const user = new userModel({
                firstName: userFirst,
                lastName: userLast,
                password: userPassword,
                email: userEmail,
                tasks: []
            });

            // Hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

// Login user
router.post('/login', async (req, res) => {
    // Validate
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check if user already exists
    userModel.findOne({ email: req.body.email }).then(currentUser => {
        if (!currentUser) {
            return res.status(400).json({ email: "Email not found" });
        } else {
            // Check password
            bcrypt.compare(req.body.password, currentUser.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: currentUser._id,
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName
                    };

                    // Sign in token
                    jwt.sign(
                        payload,
                        process.env.SECRETORKEY,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                } else {
                    return res.status(400).json({ password: "Password incorrect" });
                }
            });
        }
    });
});

export default router;