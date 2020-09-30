
module.exports = app => {

    const controller = require("../controllers/auth.controller");

    app.post("/auth/registeruser",controller.registeruser);
    app.post("/auth/loginuser", controller.loginuser);

};