const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../connection/db');

const validateRegistration = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // Add more validations as needed
];

// POST /register endpoint for user registration
router.post('/register', validateRegistration, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    const { username, email, password, parentCode,referrallink } = req.body;
    const values = [username, email, password, parentCode,referrallink];

    // Insert into database
    db.query("INSERT INTO users (username, email, password, parentCode,referrallink) VALUES (?, ?, ?, ?, ?)", values, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Failed to register user'
            });
        }
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            insertedId: result.insertId 
        });
    });
});

// GET /users/:username endpoint for fetching user details
router.get('/:id', (req, res) => {
    const Id = req.params.id;

    // Fetch user from database
    db.query("SELECT * FROM users WHERE id = ?", Id, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch user'
            });
        }
        
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const user = results[0];
        res.status(200).json({
            success: true,
            user
        });
    });
});

module.exports = router;
