// //verify the email address
// function verifyEmail(email) {
//   let pattern = /@aec\.ac\.in$/;

//   //exatrct
//   let domain = email.match(pattern);

//   return domain ? domain[0] : null;
// }

// const email = "sandeep@aec.ac.in";
// console.log(verifyEmail(email));

const express = require("express");
const app = express();
const authRouter = require("./routes/auth/verifyemailRoute");

//middlware
app.use(express.json());
app.use("/user/auth", authRouter);
//testing purpose
app.get("/", () => {
  console.log("hello");
});

app.listen(8800, () => {
  console.log("Server is running");
});
