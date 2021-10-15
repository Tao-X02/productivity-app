// Import modules
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tasks: [String]
});

// Export
const User = mongoose.model("UserData", userSchema);
export default User;