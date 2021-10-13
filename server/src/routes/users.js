// Import modules
import express from 'express';

// Import Mongoose model
const userModel = require('../models/User');

const app = express();
const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    const users = await userModel.find({});
    try {
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// GET user by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    userModel.findById(id, (err, entry) => {
        res.send(entry);
    })
});

// POST new user
router.post('/', async (req, res) => {
    const userName = req.body.name;
    const userEmail = req.body.email;
    const user = new userModel({
        name: userName,
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

module.exports = router;