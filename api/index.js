const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth/verifyemailRoute");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//middlware
app.use(express.json());
app.use(cors());
app.use("/user/auth", authRouter);
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
