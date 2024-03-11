const firebase = require('firebase-admin');
const db = require("../models");
const User = db.user;

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


exports.register = async (req, res) => {

    const email = req.body.email
    const name = req.body.name
    const phone = req.body.phone
    const pswd = req.body.pswd
    const address = req.body.address

    if (!email || !name || !phone || !pswd || !address) {
        return res.status(400).json({ message: "Content can not be empty!" })
    }

    if (pswd.length < 6) {
        return res.status(400).json({ message: "Please valid password!" })
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Email is valid.!" })
    }

    try {
        try {
            const userRecord = await firebase.auth().getUserByEmail(email);

            if (userRecord) {
                return res.status(400).json({ message: "User already exists" });
            }
        }
        catch (error) {
            if (error.code == 'auth/user-not-found') {
                const userRecord = await firebase.auth().createUser({
                    email: email,
                    password: pswd,
                    displayName: name,
                }).then((response) => {
                    const user = User({
                        name: response.displayName,
                        email: response.email,
                        phone_number: phone,
                        address: address,
                        uid: response.uid,
                        cardIds: [],
                        isAdmin: false
                    });
                    user.save().then((response) => {
                        return res.status(201).send(response);
                    })
                }).catch((err) => {
                    return res.status(400).send(err);
                })
            }
        }
    }
    catch {
        return res.status(400).json({ message: "somthing Error" })
    }
}



exports.validateUser = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.body.currentUser })
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send("User Not Found")
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching the User."
        });
    }
}

exports.updateCart = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.body.userId });
        if (!user) {
            return res.send(user);
        }
        if (user.cardIds.includes(req.body.product_id)) {
            return res.send(user);
        }
        user.cardIds.push(req.body.product_id);
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(404).send({ message: 'Error updating product:', error });
    }

}

exports.removeCart = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.body.userId });
        if (!user) {
            return res.send(user);
        }
        const productIndex = user.cardIds.indexOf(req.body.product_id);
        if (productIndex === -1) {
            return res.status(404).send({ message: 'Product does not exist for the user' });
        }

        user.cardIds.splice(productIndex, 1);
        await user.save();

        return res.send(user);
    } catch (error) {
        return res.status(404).send({ message: 'Error updating product:', error });
    }

}