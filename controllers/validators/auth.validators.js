const Joi = require('joi')

const signupSchema = Joi.object({
	username: Joi.string().required(),
	fullName: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	password: Joi.string().min(8).required(),
})

const signinSchema = Joi.object({
	username: Joi.string(),

	email: Joi.string(),

	password: Joi.string().min(8).required(),
}).or('email', 'username')

const validateSignupMiddleware = (req, res, next) => {
	try {
		let { error, value } = signupSchema.validate(req.body)
		if (error) {
			return res.status(400).json({
				message: error,
			})
		}
		next()
	} catch (err) {
		return res.status(500).json({
			message: 'server issues',
		})
	}
}

const validateSigninMiddleware = (req, res, next) => {
	try {
		let { error, value } = signinSchema.validate(req.body)
		if (error) {
			return res.status(400).json({
				message: error,
			})
		}
		next()
	} catch (err) {
		return res.status(500).json({
			message: 'server issues',
		})
	}
}

module.exports = {
	validateSignupMiddleware,
	validateSigninMiddleware,
}
