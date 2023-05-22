const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      default: null,
    },
    name: String,
    rollNumber: String,
    age: Number,
    gender: String,
    email: String,
    phoneNumber: String,
    address: String,
    course: String,
    batch: String,
    department: String,
    gpa: Number,
    attendance: [Number],
    dob: Date,
    parentName: String,
    parentContact: String,
    courseEnroll: Date,
    courseComplete: Date,
    currentSemester: String,
    job: {
      type: String,
      default: "Student",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
