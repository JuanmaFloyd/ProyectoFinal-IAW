const express = require("express");
const mercadopago = require("mercadopago");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./controllers/auth");
const customerRoute = require("./controllers/customers");

dotenv.config();

mercadopago.configurations.setAccessToken(process.env.PRIVATE_KEY);
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

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

app.use("/auth", authRoute);

app.use("/customers", customerRoute);

app.get("/", (req, res) => {
    res.send("Server running...")
})

app.listen(process.env.PORT, () => console.log("listening on port " + process.env.PORT))