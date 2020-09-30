
module.exports = app => {

    const { authJWT } = require("../middlewares");
    const controller = require("../controllers/history.controller");

    app.post("/history/notreturnhistory",[authJWT.verifyToken,authJWT.isAdmin],controller.notreturnhistory);
    app.post("/history/allhistory",[authJWT.verifyToken,authJWT.isAdmin], controller.allhistory);

};