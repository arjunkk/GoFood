const express = require('express')
const Router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

//for ecryption
const bcrypt = require('bcryptjs')
//for authorization
const jwt = require('jsonwebtoken')
const jwtSecret ="Mynameisgogomama"

Router.post('/createuser',
    [
        body('name').isLength({ min: 5 }),
        body('email').isEmail(),
        body('password', 'incorrect password').isLength({ min: 5 })
    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        /* encrypting the password using bcryptjs*/
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);

        try {
            const user = await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            console.log("User created:", user);
            res.json({ success: true });
        } catch (error) {
            console.error("Error creating user:", error);
            res.json({ success: false, error: error.message });
        }
    });




    Router.post('/loginuser',
    [
        body('email').isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({email});
            if(!userData){
                console.log("try with correct credentials");
            }
            // pwt use
            const pwtCompare= await bcrypt.compare(req.body.password,userData.password)

            if(!pwtCompare){
                console.log("try with correct credentials");
            }
            // 
            const data={
                user:{
                    id:userData.id // from mongodb
                }
            }

            const authToken = jwt.sign(data,jwtSecret)
            // send authToken to client
            return res.json({success:true,authToken:{authToken}})

        } catch (error) {
            console.error("Error logging user:", error);
            res.json({ success: false, error: error.message });
        }
    });


module.exports = Router;