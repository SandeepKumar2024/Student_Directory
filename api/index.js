const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth/verifyemailRoute");
const userRouter = require("./routes/auth/userRoute");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

//middlware
app.use(express.json());
app.use(cors());
app.use(cookieParser({ httpOnly: true }));
app.use("/user/auth", authRouter);
app.use("/user", userRouter);
//testing purpose
app.get("/", () => {
  console.log("hello");
});

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8800, () => {
  console.log("Server is running");
});
