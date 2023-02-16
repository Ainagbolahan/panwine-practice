const { User } = require("../models");
const 	{StatusCodes}
= require("http-status-codes");

const getBase = async (req, res) => {
  try {
    res.status(200).json({
      message: "welcome",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

const Signup = async (req, res) => {

  try {
    const userExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
      });



    // console.log(userExist);
    if (userExist) {
      return res.status(400).json({
        message: "user already exist",
      });
    } else {
      const user = new User(req.body);
    const token = user.generateToken();
      await user.save();
      console.log(user.password);
      return res.status(201).json({
        message: "account created",
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          phone: user.phone,
          fullName: user.fullName,
        },
        token
      });
    }

   
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};


const Signin = async(req, res) => {
  try {
    const { email, password, username } = req.body;
    const userExist = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!userExist) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User does not exist',
      })
    }
    const validatePassword = userExist.checkPassword(password);
    if (!validatePassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Invalid password'
      });
    }
    const token = userExist.generateToken();
    return res.status(StatusCodes.OK).json({
      message: "User Loggedin Successfully",
      token,
      user: {
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        fullName: userExist.fullName,
        phone: userExist.phone
      }
    });

    
  }catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
}

module.exports = { getBase, Signup ,Signin};
