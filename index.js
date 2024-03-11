const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require("./config/firebase.config")

var corsOptions = {
    origin: ["http://localhost:5173"]
};

const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions))

const dataBase = require("./models")
dataBase.mongoose.connect(dataBase.url)
    .then(succes => console.log("database is Connected...!"))
    .catch((err) => console.log("Database did not connected...!"))


app.get("/", (req, res) => {
    res.json({ message: "Welcome to EMCKart Application." });
});

require("./Routes/user.routes")(app)
require("./Routes/products.routes")(app)

app.listen(PORT, (err) => console.log("Port Is Running : " + PORT))

