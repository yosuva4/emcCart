const dbConfig = require("../config/db.config")
const mongoose = require("mongoose")

const db = {}

db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.models")(mongoose);
db.product = require('./product.models')(mongoose);

module.exports = db;
