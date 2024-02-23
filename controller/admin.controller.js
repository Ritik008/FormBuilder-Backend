const { User, Form } = require("../model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createError } = require("../error")

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return next(createError(400, 'Email or password is required'))
        }
        const user = await User.findOne({email})
        if(!user) {
            return next(createError(400, 'User with this email not  found'))
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match) {
            return next(createError(400, 'Bad Credentials'))
        }
        if(user.role !== 'admin') {
            return next(createError(401, 'Unauthorized User'))
        }
        const payload = {
            userId: user._id,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        res.status(200).json({token})

    }catch(err) {
        next(err)
    }
}

const allForms = async (req, res, next) => {
    try {
        const form = await Form.find({}).sort({createdAt: -1})
        res.status(200).json(form)
    }catch(err) {
        next(err)
    }
}

module.exports = {
    login,
    allForms
}