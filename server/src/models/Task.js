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
        type: [Date],
        default: Date.now,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
});

// Export
const Task = mongoose.model("SleepData", taskSchema);
export default Task;