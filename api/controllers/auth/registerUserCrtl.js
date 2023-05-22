const User = require("../../models/verify/userModel");
const Student = require("../../models/userByAdmin/userStdModel");
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
  res.clearCookie("token");

  res.status(200).json({
    message: "Logout succesfully",
  });
};

//create user by admin

const createUser = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      age,
      gender,
      email,
      phoneNumber,
      address,
      course,
      batch,
      department,
      gpa,
      attendance,
      dob,
      parentName,
      parentContact,
      courseEnroll,
      courseComplete,
      currentSemester,
      job,
      img,
    } = req.body;

    const student = new Student({
      name: name,
      rollNumber: rollNumber,
      age: age,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      course: course,
      batch: batch,
      department: department,
      gpa: gpa,
      attendance: attendance,
      dob: dob,
      parentName: parentName,
      parentContact: parentContact,
      courseEnroll: courseEnroll,
      courseComplete: courseComplete,
      currentSemester: currentSemester,
      job: job,
      img: img,
    });

    await student.save();

    return res.status(200).json({
      message: "Success",
      student,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//student update
const studentUpdate = async (req, res) => {
  try {
    const userId = req.params.id;
    const student = await Student.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "Updated",
      student,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//student delete by admin

const studentDelete = async (req, res) => {
  try {
    const studentId = req.params.id;

    await Student.findByIdAndDelete(studentId);
    return res.status(200).json({
      message: "Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  createUser,
  studentUpdate,
  studentDelete,
};
