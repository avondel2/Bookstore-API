
module.exports = app => {

    const { authJWT } = require("../middlewares");
    const controller = require("../controllers/books.controller");

    app.get("/books/getbooks",controller.getbooks);
    app.post("/books/insertbooks",[authJWT.verifyToken,authJWT.isAdmin],controller.insertbooks);
    app.post("/books/updatebooks",[authJWT.verifyToken,authJWT.isAdmin],controller.updatebooks);
    app.post("/books/rentbooks",[authJWT.verifyToken], controller.rentbooks);
    app.post("/books/returnbooks",[authJWT.verifyToken],controller.returnbooks)


};