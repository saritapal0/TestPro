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

    const { username, email, password, parentCode,referralCode } = req.body;
    const values = [username, email, password, parentCode,referral];

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

router.get("/getusers",(req,res)=>{
    db.query("select * from users",(err,result)=>{
      if(err){res.send("error")}
      else{res.send(result)}                                                                              
    });
  });


module.exports = router;
