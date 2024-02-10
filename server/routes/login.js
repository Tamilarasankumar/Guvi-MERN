const express = require("express");
const bcrypt = require("bcryptjs");
const EmployeeModel = require('../models/Employee');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email });
       if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
           if (passwordMatch) {
                res.json({
                    status: 'success',
                });
            } else {
                res.json("The password is incorrect");
            }
        } else {
            res.json("No record existed");
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
