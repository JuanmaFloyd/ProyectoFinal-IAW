const router = require("express").Router();
const mercadopago = require("mercadopago");
const mongoose = require("mongoose");
const verify = require("../verifyToken")
const Customer = require("../models/Customer");

router.get("/", verify, (req, res) => {
    Customer.find({user: req.user._id}, (err, all) => {
        var customers = [];

        all.forEach((cus => {
            customers.push(cus);
        }))

        res.json(customers);
    })
})

router.get("/:id", verify, (req, res) => {
    Customer.findOne({_id: req.params.id}, (err, user) => {
        if (err){
            console.log(err)
            res.status(500).send();
        }
        res.json(user);
    })
})

router.post("/", verify, (req, res) => {
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        dni: req.body.dni,
        number: req.body.number,
        user: req.user._id,
        month: 0,
        year: 0
    })

    customer.save()
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
})

router.put("/:id", verify, (req, res) => {
    var id = req.params.id;

    Customer.findOne({_id: id}, (err, user) => {
        if (err){
            console.log(err);
            res.status(500).send();
        } else {
            user.name = req.body.name;
            user.dni = req.body.dni;
            user.number = req.body.number;

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

router.put("/:id/cash", verify, (req, res) => {
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

router.delete("/:id", verify, (req, res) => {
    var id = req.params.id;
    Customer.findByIdAndRemove({_id: id}, (err) => {
        if (err){
            console.log(err)
            res.status(500).send();
        }
        res.status(200).send();
    })
})

router.post("/:id/card", verify, (req, res) => {
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

module.exports = router;