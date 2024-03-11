
const db = require('../models')

const Product = db.product;


exports.saveProduct = async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.price || !req.body.imagePath) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image_path: req.body.imagePath
        });
        product
            .save(product)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the product."
                });
            });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the product."
        });
    }
}


exports.fetchAll = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send({
          message:
            err.message || "Some error occurred while fetching the product."
      });
    }
  }