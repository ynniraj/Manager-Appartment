const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { username, email, phone, password: plaintextpassword } = req.body;

    const password = await bcrypt.hash(plaintextpassword, 10);
    try {
        const user = await User.create({ username, email, phone, password });

        return res.status(200).send({ user, status: "ok" });
    } catch (error) {
        return res.json({ status: "error" });
    }
};



const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }).lean().exec();
        if (!user) return res.status(404).send({ status: "error", message: "user not found" })
        //compare jwt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send({ status: "error", message: "password is incorrect" })
        const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "1h" });
        return res.status(200).send({ token, user });

    } catch (error) {
        return res.json({ status: "error", error: "Invalid username or password there" });
    }
};


module.exports = { register, login }

