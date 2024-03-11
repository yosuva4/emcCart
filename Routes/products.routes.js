

module.exports = app => {
    var router = require("express").Router();
    const products = require("../controller/product.controller")

    router.post('/saveproduct', products.saveProduct)
    router.get('/products', products.fetchAll)

    app.use("/api/products/", router)
}