const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const  emailService  = require("../services/email.services");

/**
 * - user register controller
 * - POST api/auth/register
 */
async function userRegisterController(req, res) {
  const { email, password, name } = req.body;

  const isExists = await User.findOne({
    email: email,
  });

  if (isExists) {
    return res.status(422).json({
      message: "User already exists with email",
      status: failed,
    });
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User register successfully!",
    user:{
        _id:user._id,
        name:user.name,
        email:user.email,

    },
    token
  });

  await emailService.sendRegistrationEmail(user.email, user.name);
}


/**
 * - User login controller
 * - POST /api/auth/login
 */
async function userLoginController(req, res)  {
  const {email, password} = req.body;

  const user = await User.findOne({email}).select("+password")

  if(!user){
    return res.status(401).json({
      message:"Email or password invalid",
      success:false
    })
  }

  const isValidPassword = await user.comparePassword(password)
  
  if(!isValidPassword){
    return res.status(401).json({
        message:"Email or password invalid",
        success:false
      })
  }

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "User login successfully!",
    user:{
        _id:user._id,
        name:user.name,
        email:user.email,

    },
    token
  });

}

module.exports = {
  userRegisterController,
  userLoginController
};
