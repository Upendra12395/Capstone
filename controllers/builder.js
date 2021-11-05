const Builder = require("../models/builder");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//for builder regitser
module.exports.signup = (req, res) => {
	const { builderName, email, password, dob, certificateNo } = req.body;
	if (!builderName || !email || !password || !dob || !certificateNo) {
		return res.status(400).json({ message: "please enter all fields" });
	}
	Builder.findOne({ email: email }).then((builder) => {
		if (builder) {
			return res.status(400).json({ message: "Builder already exist" });
		} else {
			//create salt and hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					const newBuilder = new Builder({
						builderName: builderName,
						email: email,
						password: hash,
						dob: dob, 
                        certificateNo : certificateNo
					});
					newBuilder
						.save()
						.then((builder) => {
							// console.log(builder);
							return res.status(201).json({ message: "Builder saved successfully." });
						})
						.catch((error) => {
							return res.status(500).json({ message: error.message });
						});
				});
			});
		}
	});
};

//for builder login
module.exports.login = (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Please enter all the fields." });
	}
	Builder.findOne({ email: email }).then((builder) => {
		if (!builder) {
			return res.status(400).json({ message: "Builder does not exist." });
		}
		//password validation
		bcrypt.compare(password, builder.password).then((isMatch) => {
			if (!isMatch) {
				return res.status(400).json({ message: "Invalid email or password." });
			}
			jwt.sign(
				{ id: builder._id },
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
						.json({ token: token, Builder: { id: builder._id, name: builder.name, email: builder.email } }); //remove Builder later
				}
			);
		});
	});
};

//to get all the builders
module.exports.getAll = (req, res) => {
	Builder.find()
		.then((builders) => {
			res.json(builders);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.updateProfile = (req, res) =>{
	const builderId = req.user._id
	Builder.findByIdAndUpdate(builderId, req.body, {useModifyAndUpdate : false})
	.then(buiilder=>{
		res.status(200).json({message : 'Profile Updated successfully'})
	})
	.catch(err =>{
		res.status(500).json({message : err.message})
	})
}
