const express = require('express');
const router = express.Router();
const db = require("../connection/db")


router.get('/dashboard', (req, res) => {
    db.query('SELECT * FROM users', (err, results, fields) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(results);
    })
});

module.exports = router;

