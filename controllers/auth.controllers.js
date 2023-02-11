const { User } = require("../models");

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
    let userExist = User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (userExist) {
      return res.status(400).json({
        message: "user already exist",
      });
    }

    const user = new User(req.body);
    await user.save();
    return res.status(201).json({
      message: "account created",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

module.exports = { getBase, Signup };
