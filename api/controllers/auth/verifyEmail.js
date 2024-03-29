const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const userEmail = require("../../models/verify/verifyUser");

//emailtransporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mylearn9101@gmail.com",
    pass: "fksoibvpbgvjitym",
  },
});

//generate otp
const generateOtp = () => {
  const otp = speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    encoding: "base32",
    step: 120,
  });
  return otp;
};

const otpExpireIn = 1 * 60 * 1000; // 2 minutes

const verifyEmail = async (req, res) => {
  try {
    const pattern = /aec\.ac\.in$/;
    const email = req.body.email;
    const domain = email.split("@")[1];
    //test
    const isMatched = pattern.test(domain);
    if (isMatched) {
      //store otp
      const otp = generateOtp();

      //if there is alredy user
      const findUser = await userEmail.findOne({ email: email });
      if (findUser) {
        await userEmail.findOneAndUpdate({
          email: email,
          otp: otp,
          cretedDate: new Date(),
          new: true,
        });
      } else {
        const user = new userEmail({
          email: email,
          otp: otp,
        });

        await user.save();
      }

      //compose the otp email
      const sub = "OTP verification";
      const body = `Your OTP for email verification is: ${otp}`;
      const sendEmail = "aecstudentportal@aec.ac.in";
      const recEmail = email;

      //send mail
      const mailOptions = {
        from: sendEmail,
        to: recEmail,
        subject: sub,
        text: body,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json({
            message: "OTP sent to the email .",
          });
        }
      });
    } else {
      res.status(404).json({
        message: "Please provide only college email",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifybyOtp = async (req, res) => {
  try {
    const {  otp } = req.body;
    console.log(otp);

    //reteive otp
    const user = await userEmail.findOne({  otp: otp });
    if (!user)
      return res.status(404).json({
        message: "Invalid OTP",
      });

    //time expire
    // const currentTime = new Date().getTime();
    // const otpTime = user.createdAt
    //   ? user.createdAt.getTime()
    //   : user.updatedAt.getTime();
    // if (currentTime - otpTime > otpExpireIn) {
    //   return res.status(403).json({
    //     message: "OTP has expired",
    //   });
    // }
    const currentTime = new Date().getTime();
    // const otpTime = user.createdAt
    //   ? new Date(user.createdAt).getTime()
    //   : new Date(user.updatedAt).getTime();
    const otpTime = new Date(user.cretedDate).getTime();
    // const otpExpireIn = 60000; // Example value, should be replaced with the actual expiry duration in milliseconds
    console.log(currentTime - otpTime);
    console.log(otpExpireIn);
    if (currentTime - otpTime > otpExpireIn) {
      return res.status(403).json({
        message: "OTP has expired",
      });
    }

    //update
    user.isVerified = true;
    user.otp = null;
    user.cretedDate = null;
    await user.save();
    return res.status(200).json({
      message: "Email verified succesfully",
    });
  } catch (error) {
    console.log(error);
  }

  //check
  // try {
  //   if (
  //     storeOtp &&
  //     speakeasy.totp.verify({
  //       secret: storeOtp,
  //       encoding: "base32",
  //       token: otp,
  //     })
  //   ) {
  //     res.status(200).send("OTP verified succesfully");
  //     // delete otpToken[email];
  //   } else {
  //     // console.log(otp, storeOtp);
  //     res.status(404).send("Invalid otp");
  //   }
  // } catch (error) {
  //   res.send(error);
  // }
};

module.exports = {
  verifyEmail: verifyEmail,
  verifybyOtp: verifybyOtp,
};
