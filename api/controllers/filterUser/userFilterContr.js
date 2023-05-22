const Student = require("../../models/userByAdmin/userStdModel");

const getStudent = async (req, res) => {
  try {
    const query = req.query;

    const filter = {};
    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" };
    }
    if (query.course) {
      filter.course = { $regex: query.course, $options: "i" };
    }
    if (query.enrollYear) {
      const startDate = `${query.enrollYear}-01-01`;
      const endDate = `${query.enrollYear }-12-01`;
      filter.courseEnroll = {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      };
    }
    if (query.currentSemester) {
      filter.currentSemester = { $regex: query.currentSemester, $options: "i" };
    }
    const students = await Student.find(filter);

    //filtering by name

    return res.status(200).send({
      size: students.length,
      students,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getStudent,
};
