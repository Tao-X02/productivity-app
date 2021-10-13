// Import modules
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define schema
const userSchema = new Schema({
    name: {
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