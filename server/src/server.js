// Import modules
import express from 'express';
import cors from "cors";
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();

// Import routes
import users from './routes/users.js';
import tasks from './routes/tasks.js';

// import passportFunc from './passport.js';

// Express
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Connect to MongoDB with Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//.then(() => console.log("Connection to MongoDB successful"))
.catch((err) => console.error(err));

// Passport middleware
app.use(passport.initialize());

require("./passport")(passport);

// Call routes
app.use('/api/v1/users', users);
app.use('/api/v1/tasks', tasks);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

export default app;