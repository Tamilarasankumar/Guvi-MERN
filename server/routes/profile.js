const express = require("express");
const UserModel = require('../models/user.js');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, age, gender, mobile, dob } = req.body;
        const existingProfile = await UserModel.findOneAndUpdate(
            { email },
            { name, age, gender, mobile, dob },
            { new: true, upsert: true }
        );
        res.status(existingProfile ? 200 : 201).json({
            message: existingProfile ? 'Profile updated successfully' : 'Profile created successfully',
        });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        } else {
            console.error('Error updating or creating profile:', error);
            res.status(500).send('Internal Server Error');
        }
    }
});

module.exports = router;
