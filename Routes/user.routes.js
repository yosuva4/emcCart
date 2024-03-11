module.exports = app => {
    var router = require("express").Router();
    const users = require("../controller/user.cotroller")

    router.post('/register', users.register)
    router.post('/user', users.validateUser)
    router.post('/updateCart', users.updateCart)
    router.post('/removeCart', users.removeCart)


    app.use("/api/user/", router)

}