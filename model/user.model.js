const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

User.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})  

User.statics.doesEmailAlreadyExists = async function(email) {
    const exists = await this.exists({email})
    return exists
}

User.methods.doesPasswordMatches = async function(password) {
    const user = this
    const match = await bcrypt.compare(password, user.password)
    return match
}

module.exports = mongoose.model('user', User)