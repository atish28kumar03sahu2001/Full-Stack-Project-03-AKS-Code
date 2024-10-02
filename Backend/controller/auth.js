//backend/controller/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users } from '../models/index.js';

export const signup = async (req, res) => {
   try {
        const { username, usermail, userpassword } = req.body;
        const userimage = req.file;

        const existingUser = await Users.findOne({ usermail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please sign in." });
        }

        const hashedPassword = await bcrypt.hash(userpassword, 12);



        const newUser = new Users({
            username,
            usermail,
            userpassword: hashedPassword,
            userimage: userimage ? userimage.buffer : null,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        newUser.usertoken = token;

        await newUser.save();

        res.status(201).json({ user: newUser, token });
   } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Something went wrong during signup." });
   } 
}
export const signin = async (req, res) => {
    try {
        const { username, usermail, userpassword } = req.body;
    
        // Check if the user exists
        const existingUser = await Users.findOne({ usermail });
        if (!existingUser) {
          return res.status(404).json({ message: "User not found. Please sign up first." });
        }
    
        // Validate the password
        const isPasswordCorrect = await bcrypt.compare(userpassword, existingUser.userpassword);
        if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Invalid credentials. Please try again." });
        }
    
        // Create a JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET,);

        if(existingUser.token = token) {
            return res.status(200).json({ user: existingUser, token });
        }
        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong during signin." });
    }
}

export const patchUser = async (req, res) => {
    try {
        const { username, usermail } = req.body;
        const userId = req.params.id;

        const updates = {};
        if (req.file) {
            updates.userimage = req.file.buffer;
        }
        if (username) {
            updates.username = username;
        }
        if (usermail) {
            updates.usermail = usermail;
        }

        const updatedUser = await Users.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}