const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerValidation } = require("../validations/validation");

router.get("/isAuth", (req, res) => {
    const token = req.header("token");
    if (!token) return res.status(401).send("No autenticado");

    try{
        jwt.verify(token, process.env.TOKEN_SECRET);
        res.status(200).send();
    } catch(err){
        res.status(400).send("Token invalido");
    } 
})

router.post("/signup", async (req, res) => {
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('El email ya se encuentra en uso');

    var salt = await bcrypt.genSalt(10);
    var hashPwd = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        nickname: req.body.nickname,
        email: req.body.email,
        password: hashPwd
    })

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(error) {
        res.status(400).send(error);
    }
})

router.post("/signin", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email incorrecto");

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.status(400).send("Contraseña incorrecta");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header("token", token).send(token);
})

module.exports = router;