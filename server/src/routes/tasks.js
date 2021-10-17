// Import modules
import express from 'express';

// Import Mongoose model
import taskModel from '../models/Task.js';

const app = express();
const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    const tasks = await taskModel.find({});
    try {
        res.send(tasks);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// GET task by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    taskModel.findById(id, (err, entry) => {
        if (err) {
            res.status(400).send(err);
        }
        res.send(entry);
    })
});

const current = new Date();
current.setHours(0,0,0,0);

// Get task by user id
router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    taskModel.find({ userId: id, date: { $gte: current } }, (err, entry) => {
        if (err) {
            res.status(400).send(err);
        }
        
        if (current.getDate()) {
            res.send(entry);
        }
    })
});

// Get completed tasks
router.get('/users/:id/completed', (req, res) => {
    const id = req.params.id;
    taskModel.find({  userId: id, status: "Completed" }, (err, entry) => {
        if (err) {
            res.status(400).send(err);
        }
        
        if (current.getDate()) {
            res.send(entry);
        }
    })
});

// POST new task
router.post('/', async (req, res) => {
    // Get request body
    const userIdInput = req.body.userId;
    const titleInput = req.body.title;
    const descriptionInput = req.body.description;
    const dateInput = req.body.date;
    const statusInput = req.body.status;
    
    // Create new model
    const task = new taskModel({
        userId: userIdInput,
        title: titleInput,
        description: descriptionInput,
        date: dateInput,
        status: statusInput
    });
    try {
        await task.save();
        res.send(task);
    } catch(error) {
        console.error(error);
        res.status(400).send(error);
    };
});

// Patch task
router.patch('/:id', async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id).exec();
        
        let query = {$set: {}};
        for (let key in req.body) {
            if (task[key] && task[key] != req.body[key]) {
                query.$set[key] = req.body[key];
            }
        }
        const updatedTask = await taskModel.findOneAndUpdate({_id: req.params.id}, query);
		res.send(updatedTask);
	} catch (error) {
		console.error(error);
        res.status(400).send(error);
	}
});

// Delete task
router.delete('/:id', (req, res) => {
    taskModel.findByIdAndRemove(req.params.id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch((error) => {
        console.error(error);
        res.status(400).send(error);
    })
});

export default router;