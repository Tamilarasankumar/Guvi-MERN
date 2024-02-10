const express = require("express");
const bcrypt = require("bcryptjs");
const EmployeeModel = require('../models/Employee');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingEmployee = await EmployeeModel.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ error: "User with this email already exists. Please use a different email." });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newEmployee = new EmployeeModel({ name, email, password: hashedPassword });
        await newEmployee.save();
        return res.json(newEmployee);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while registering. Please try again." });
    }
});

module.exports = router;
