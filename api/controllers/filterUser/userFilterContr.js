const Student = require("../../models/userByAdmin/userStdModel");

const getStudent = async (req, res) => {
  try {
    const query = req.query;

    const filter = {};

    //filter using name
    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" };
    }
    //filter using course eg CSE ,Mech
    if (query.course) {
      const courses = Array.isArray(query.course)
        ? query.course
        : [query.course];
      filter.course = { $in: courses.map((course) => new RegExp(course, "i")) };
      // filter.course = { $regex: query.course, $options: "i" };
    }

    //filter using enroll year
    // if (query.enrollYear) {
    //   const startDate = `${query.enrollYear}-01-01`;
    //   const endDate = `${query.enrollYear}-12-01`;
    //   filter.courseEnroll = {
    //     $gte: new Date(startDate),
    //     $lt: new Date(endDate),
    //   };
    // }

    if (query.enrollYear) {
      const enrollYears = Array.isArray(query.enrollYear)
        ? query.enrollYear
        : [query.enrollYear];

      const enrollYearFilter = enrollYears.map((year) => {
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-01`;
        return {
          courseEnroll: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        };
      });

      filter.$or = enrollYearFilter;
    }

    //filter using current sem
    if (query.currentSemester) {
      const currentSem = Array.isArray(query.currentSemester)
        ? query.currentSemester
        : [query.currentSemester];
      filter.currentSemester = {
        $in: currentSem.map((sem) => new RegExp(sem, "i")),
      };
      // filter.currentSemester = { $regex: query.currentSemester, $options: "i" };
    }

    //filterd students
    const students = await Student.find(filter);

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
