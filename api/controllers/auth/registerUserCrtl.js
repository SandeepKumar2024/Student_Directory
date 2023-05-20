const User = require("../../models/verify/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  const { name, email, password, img } = req.body;

  //alreday exists user
  const userExist = await User.findOne({ email: email });
  if (userExist)
    return res.status(401).json({
      message: "User already exists",
    });

  //hash password
  const salt = bcryptjs.genSaltSync(10);
  const hashPassword = bcryptjs.hashSync(password, salt);
  //new user save
  const newUser = new User({
    name: name,
    email: email,
    password: hashPassword,
    img: img,
  });

  await newUser.save();

  // const { passwordd, ...others } = newUser;

  return res.status(200).json({
    message: "Sucess",
    newUser,
  });
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check user
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    //check password

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password or Email",
      });
    }

    //jwt token generate
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    //store token  in cookie
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "Logged in succsefully",
      token,
    });
  } catch (error) {
    console.log(error);
  }

  //if everything is correct
};

const userLogout = (req, res) => {
  res.clearCookie('token');

  res.status(200).json({
    message: "Logout succesfully",
  });
};

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
};
