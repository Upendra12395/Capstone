const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')

//for user register
module.exports.signup = (req, res) => {	
	const { userName, email, password, dob } = req.body;
	if (!userName || !email || !password || !dob) {
		return res.status(400).json({ message: "please enter all fields" });
	}
	User.findOne({ email: email }).then((user) => {
		if (user) {
			return res.status(400).json({ message: "User already exist" });
		} else {
			//create salt and hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					const newUser = new User({
						userName: userName,
						email: email,
						password: hash,
						dob: dob
					});
					newUser
						.save()
						.then((user) => {
							// console.log(user);
							return res.status(201).json({ message: "User saved successfully." });
						})
						.catch((error) => {
							return res.status(500).json({ message: error.message });
						});
				});
			});
		}
	});
};

//for user login
module.exports.login = (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Please enter all the fields." });
	}
	User.findOne({ email: email }).then((user) => {
		if (!user) {
			return res.status(400).json({ message: "User does not exist." });
		}
		//password validation
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) {
				return res.status(400).json({ message: "Invalid email or password." });
			}
			jwt.sign(
				{ id: user._id },
				process.env.JWT_KEY,
				{
					expiresIn: 3600
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					return res
						.status(200)
						.json({ token: token, user: { id: user._id, name: user.name, email: user.email } }); //remove user later
				}
			);
		});
	});
};

//to find out all users
module.exports.getAll = (req, res) => {
	User.find()
		//.select("-password")
		.then((users) => {
			res.json(users);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.updateProfile = (req, res)=>{
	const userId = req.user._id
	Builder.findByIdAndUpdate(userId, req.body, {useFindAndModify : false})
	.then(user=>{
		res.status(200).json({message : 'Profile Updated successfully'})
	})
	.catch(err =>{
		res.status(500).json({message : err.message})
	})
}