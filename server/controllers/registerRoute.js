const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// Register Route
const registerRoute = async (req, res) => {
    const { username, password, role = 'user' } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({
            message: 'Please enter all fields',
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters',
        });
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        // Security check: Only allow admins to create new admins
        // const isAdmin = role === 'admin';
        // if (isAdmin) {
        //     // For example, you might check if the requester is an admin
        //     // const currentUser = req.user; // Assuming current user is in req.user
        //     // if (!currentUser || currentUser.role !== 'admin') {
        //     //     return res.status(403).json({ message: 'Unauthorized' });
        //     // }
        // }

        const newUser = new User({
            username,
            password,
            role: role === 'admin' ? 'admin' : 'user', // Default to user if not admin
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Save the user
        const savedUser = await newUser.save();

        // Create JWT
        const token = jwt.sign(
            { id: savedUser._id, role: savedUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            token,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                role: savedUser.role,
            },
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = registerRoute;
