const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const History = db.history;
const Book = db.book;

verifyToken = (req, res, next) => {

    let authorization = req.headers["authorization"];

    if (!authorization) {
        return res.status(403).send({ message: "No Token Provided!" });
        }

    let bearer = authorization.split(' ');
    if(bearer[0]==='Bearer'){
        let token = bearer[1];
  
        if (!token) {
        return res.status(403).send({ message: "No Token Provided!" });
        }
    
        jwt.verify(token, config.secretkey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userID = decoded.id
        req.roles = decoded.roles;
        
        next();
        
        });
    }else{
        return res.status(403).send({ message: "No Token Provided!" });
    }
};

isAdmin = (req, res, next) => {

    if(req.roles == "Admin"){
        next()
        return
    }else{
        res.status(403).send({ message: "Require Admin Role!" });
        return;
    }
  };

const authJsonWebToken = {
    verifyToken,
    isAdmin
  };
module.exports = authJsonWebToken;