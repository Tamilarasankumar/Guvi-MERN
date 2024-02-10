const express = require("express");
const UserModel = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email } = req.body;
    const userProfile = await UserModel.findOne({ email });

    if (userProfile) {
        res.json({
            status: 'success',
            data: userProfile
        });
    } else {
        res.json({
            status: 'failure'
        });
    }
});

module.exports = router;
