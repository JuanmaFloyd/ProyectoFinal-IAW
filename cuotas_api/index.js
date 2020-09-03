const express = require("express");
const mercadopago = require("mercadopago");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verify = require("./verifyToken")
const Customer = require("../cuotas_api/models/Customer");
const User = require("../cuotas_api/models/User");
const { json } = require("express");

var url = "mongodb+srv://admin:admin@cuotas-app.78abe.mongodb.net/cuotas-app?retryWrites=true&w=majority"

mercadopago.configurations.setAccessToken("TEST-8266240309399984-082013-ec1e445a5960214bcafb763c85777e51-628791970");

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = 5001;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization, token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/", (req, res) => {
    res.redirect("/user")
})

app.get("/isAuth", (req, res) => {
    const token = req.header("token");
    if (!token) return res.status(401).send("No autenticado");

    try{
        jwt.verify(token, process.env.TOKEN_SECRET);
        res.status(200).send();
    } catch(err){
        res.status(400).send("Token invalido");
    } 
})

app.post("/signup", async (req, res) => {
    var salt = await bcrypt.genSalt(10);
    var hashPwd = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        nickname: req.body.nickname,
        email: req.body.email,
        password: hashPwd
    })

    user.save()
        .then(res => res.send(res))
        .catch(err => res.status(400).send(err))
})

app.post("/signin", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email incorrecto");

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.status(400).send("Contraseña incorrecta");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header("token", token).send(token);
})

app.get("/user", verify, (req, res) => {
    Customer.find({}, (err, all) => {
        var customers = [];

        all.forEach((cus => {
            customers.push(cus);
        }))

        res.json(customers);
    })
})

app.get("/user/:id", verify, (req, res) => {
    Customer.findOne({_id: req.params.id}, (err, user) => {
        if (err){
            console.log(err)
            res.status(500).send();
        }
        res.json(user);
    })
})

app.post("/user", verify, (req, res) => {
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        dni: req.body.dni,
        email: req.body.email,
        month: 0,
        year: 0
    })

    customer.save()
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
})

app.put("/user/:id", verify, (req, res) => {
    var id = req.params.id;

    Customer.findOne({_id: id}, (err, user) => {
        if (err){
            console.log(err);
            res.status(500).send();
        } else {
            user.name = req.body.name;
            user.dni = req.body.dni;
            user.email = req.body.email;

            user.save()
            .then(result => {
                res.status(200).json({
                    message: "Customer updated",
                    updatedCustomer: user
                })
            })
            .catch(err => console.log(err))
        }
    })
})

app.put("/pay/:id", verify, (req, res) => {
    var id = req.params.id;
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();

    Customer.findOne({_id: id}, (err, user) => {
        if (err){
            console.log(err);
            res.status(500).send();
        } else {
            user.month = month;
            user.year = year;

            user.save()
            .then(result => {
                res.status(200).json({
                    message: "Customer updated",
                    updatedCustomer: user
                })
            })
            .catch(err => console.log(err))
        }
    })
})

app.delete("/user/:id", verify, (req, res) => {
    var id = req.params.id;
    Customer.findByIdAndRemove({_id: id}, (err) => {
        if (err){
            console.log(err)
            res.status(500).send();
        }
        res.status(200).send();
    })
})

app.post("/procesar_pago/:id", verify, (req, res) => {
    console.log(req.body)
    var id = req.params.id;
    var payment_data = {
        transaction_amount: parseInt(req.body.transaction_amount),
        token: req.body.token,
        description: req.body.description,
        installments: parseInt(req.body.installments),
        payment_method_id: req.body.payment_method_id,
        payer: {
            email: req.body.email
        }
    };
    console.log(payment_data)
     
    mercadopago.payment.save(payment_data).then(function (data) {
        console.log(data);

        Customer.findOne({_id: id}, (err, user) => {
            if (err)
                console.log(err)
            else {
                var date = new Date();
                var month = date.getMonth();
                var year = date.getFullYear();

                user.month = month;
                user.year = year;

                user.save().catch(err => console.log(err))
            }
        })
        
        res.json(data)

        }).catch(function (error) {
            res.json(error)
        });
})

app.listen(port, () => console.log("listening on port " + port))