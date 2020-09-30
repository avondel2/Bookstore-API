const config = require("../config/auth.config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = db.user;


exports.registeruser = (req, res) => {
    if(req.body.username&&req.body.password&&req.body.fullname){
        const user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            fullname: req.body.fullname,
            roles: req.body.roles
        });
        
        user.save((err, user) => {
            if(err){
                if (err.code == 11000) {
                    return res.status(500).send({ message: "User Duplicate" });
                }
                return res.status(500).send({ message: err});
                
            }
            else{
                res.json({ message: "User was registered successfully!" });
            }
        });
    }else{
        res.status(400).send({ message:"Bad request"})
    }
};


exports.loginuser = (req, res) => {
    if(req.body.username&&req.body.password){
        User.findOne({
            username: req.body.username
        })
            .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
                });
            }

            let payload = {
                sub:user.username,
                id:user._id,
                iat: Math.floor(Date.now() / 1000),
                roles:user.roles
            };

            var token = jwt.sign(payload, config.secretkey, {expiresIn: '3d'});

            res.status(200).json({
                id: user._id,
                username: user.username,
                access_token: token
            });
            });
    }else{
        res.status(400).send({ message:"Bad request"})
    }
};