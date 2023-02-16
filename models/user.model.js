const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
	{
		fullName: String,
		email: String,
		username: String,
		password: String,
		phone: String,
	},
	{ timestamp: true }
)

userSchema.pre('save', function () {
	const saltRounds = bcrypt.genSaltSync(10)

	const hash = bcrypt.hashSync(this.password, saltRounds)
	this.password = hash
})

userSchema.method('generateToken', function () {
	const token = JWT.sign(
		{
			id: this.id,
			username: this.username,
			email: this.email,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '12h' }
	)

	return token
});

userSchema.method("checkPassword", function (password) {
	const validPassword = bcrypt.compareSync(password, this.password)
	return validPassword
});

const User = mongoose.model('User', userSchema)

module.exports = User
