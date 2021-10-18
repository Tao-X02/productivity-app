// Import modules
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define schema
const taskSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    duration: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        default: "Not started",
        required: true
    }
});

// Export
const Task = mongoose.model("TaskData", taskSchema);
export default Task;