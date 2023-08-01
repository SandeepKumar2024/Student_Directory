const jwt = require("jsonwebtoken");

//protected route
const verifyUserToken = (req, res, next) => {
  const jwtToken = req.headers.authorization;
  if (jwtToken) {
    // const cookies = jwtToken.split("; ");
    // const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    // if (tokenCookie) {
    //   const token = tokenCookie.split("=")[1];
    const token = jwtToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          message: "Unauthorized",
          mes: err,
        });
      } else {
        req.user = decoded;
        console.log(decoded);
        next();
      }
    });
  } else {
    return res.status(404).json("Unauthorized , Token is invalid");
  }

  //token exists
};

//check user is admin or not
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

const superAdmin = (req, res, next) => {};

module.exports = {
  verifyUserToken,
  verifyTokenandAdmin,
};
