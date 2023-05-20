const jwt = require("jsonwebtoken");
//protected route
const verifyUserToken = (req, res, next) => {
  const token = req.cookies.token;

  //token exists
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          message: "Unauthorized",
        });
      } else {
        req.user = decoded;
        console.log(decoded);
        next();
      }
    });
  } else {
    return res.status(404).json("Unauthorized");
  }
};

const verifyTokenandAdmin = (req, res, next) => {
  verifyUserToken(req, res, () => {
    if (req.user.isAdmin) {
      req.user = res.user;
      next();
    } else {
      res.status(404).json("Unauthorized");
    }
  });
};

// const superAdmin = (req,res,next)=>{
//     const
// }

module.exports = {
  verifyUserToken,
  verifyTokenandAdmin,
};
