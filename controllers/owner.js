const Owner = require("../model/owner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "please enter all fieds" });
    }
    Owner.findOne({ email: email }).then((owner) => {
        if (owner) {
            return res.status(400).json({ message: "Owner already exist" });
        } else {
            //create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    const newOwner = new Owner({
                        name: name,
                        email: email,
                        password: hash,
                    });
                    newOwner
                        .save()
                        .then((owner) => {
                            // console.log(user);
                            return res.status(201).json({ message: "Owner saved successfully." });
                        })
                        .catch((error) => {
                            return res.status(500).json({ message: error.message });
                        });
                });
            });
        }
    });
};

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all the fields." });
    }
    Owner.findOne({ email: email }).then((owner) => {
        if (!owner) {
            return res.status(400).json({ message: "Owner does not exist." });
        }
        //password validation
        bcrypt.compare(password, owner.password).then((isMatch) => {
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid email or password." });
            }
            jwt.sign(
                { id: owner._id },
                process.env.JWT_KEY,
                {
                    /*expiresIn: 3600*/
                },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    return res
                        .status(200)
                        .json({ token: token, owner: { id: owner._id, name: owner.name, email: owner.email } }); //remove user later
                }
            );
        });
    });
};
