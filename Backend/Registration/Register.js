const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../connection/db');

// Function to generate a referral code
const generateReferralCode = () => {
    return Math.random().toString(36).substr(2, 10);
};

// Validation middleware for registration
const validateRegistration = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
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

    const { username, email, password } = req.body;

    // Generate referral code and link
    const referralCode = generateReferralCode();
    const referral_link = `https://taa.com/ref/${referralCode}`;

    // Insert into database
    const sql = "INSERT INTO users (username, email, password, referralCode, referral_link) VALUES (?, ?, ?, ?, ?)";
    const values = [username, email, password, referralCode, referral_link]; // Include referralCode and referral_link in values array

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to register user:", err);
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

// GET /getusers endpoint to fetch all users
router.get('/getusers', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error("Failed to fetch users:", err);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch users'
            });
        }
        res.status(200).json({
            success: true,
            users: result
        });
    });
});

module.exports = router;
