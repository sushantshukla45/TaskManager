const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        
        if (!firstName || !email || !password) {
            return res.status(400).json({ msg: "First name, email, and password are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword 
        });
        
        const savedUser = await newUser.save();
        
        res.status(201).json({ 
            msg: "User registered successfully",
            user: { 
                id: savedUser._id, 
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email 
            } 
        });

    } catch (err) { 
        res.status(500).json({ error: "Server error during registration." }); 
    }
};

// LOGIN 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields." });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            token, 
            user: { 
                id: user._id, 
                firstName: user.firstName,
                lastName: user.lastName || "", 
                email: user.email 
            } 
        });
    } catch (err) {
        res.status(500).json({ error: "Server error during login." });
    }
};