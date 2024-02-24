const { createError } = require('../utils/error')
const {User} = require('../model')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
  const {fullName, email, password} = req.body
  try {
    if(!fullName || !email || !password) {
      return next(createError(400, 'All fields are required'))
    }
    if(await (User.doesEmailAlreadyExists(email))){
      return next(createError(422, 'Email already exists'))
    }
    const user = await User.create({fullName, email, password})
    res.status(200).json({fullName: user.fullName, email: user.email})
  }catch(err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createError(400, "Email or password is required"));
    }
    const user = await User.findOne({email})
    if(!user) {
      return next(createError(404, 'User email does not exists'))
    }
    if(!(await user.doesPasswordMatches(password))) {
      return next(createError(401, 'Bad Credentails'))
    }
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register
};
