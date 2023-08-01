import axios from "axios";
import "./createStudent.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const CreateStudent = () => {
  //get token
  const userData = localStorage.getItem("user");
  const data = JSON.parse(userData);
  const token = data.token;
  const [input, setInput] = useState({
    name: "",
    email: "",
    rollno: "",
    age: "",
    phoneNumber: "",
    department: "",
    batch: "",
    course: "",
    gpa: "",
    attendence: "",
    dob: "",
    job: "",
    currentSem: "",
    address: "",
    img: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8800/user/create/users",
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createStudent">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "green",
          padding: "10px",
          color: "white",
        }}
      >
        CREATE NEW STUDENT
      </h2>
      <button className="back" onClick={() => window.history.back()}>
        Back
      </button>
      <div className="container">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Enter email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />

          <label htmlFor="">Roll No</label>
          <input
            type="number"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <label htmlFor="">Age</label>
          <input
            type="number"
            name="age"
            value={input.age}
            onChange={handleChange}
          />
          <label htmlFor="">Phone No</label>
          <input
            type="number"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={handleChange}
          />
          <label htmlFor="">Department</label>
          <input
            type="text"
            name="department"
            value={input.department}
            onChange={handleChange}
          />
          <label htmlFor="">Batch</label>
          <input
            type="text"
            placeholder="eg: 2020-2024"
            name="batch"
            value={input.batch}
            onChange={handleChange}
          />

          <label htmlFor="">Course</label>
          <input
            type="text"
            placeholder="eg BTech"
            name="course"
            value={input.course}
            onChange={handleChange}
          />
          <label htmlFor="">CGPA</label>
          <input
            type="number"
            name="gpa"
            value={input.gpa}
            onChange={handleChange}
          />
          <label htmlFor="">Attendence</label>
          <input
            type="number"
            name="attendence"
            value={input.attendence}
            onChange={handleChange}
          />
          <label htmlFor="">DOB</label>
          <input
            type="date"
            name="dob"
            value={input.dob}
            onChange={handleChange}
          />
          <label htmlFor="">JOB</label>
          <input
            type="text"
            name="job"
            value={input.job}
            onChange={handleChange}
          />
          <label htmlFor="">Current Sem</label>
          <input
            type="text"
            placeholder="eg 4"
            name="currentSem"
            value={input.currentSem}
            onChange={handleChange}
          />
          <label htmlFor="">Address</label>
          <textarea
            cols="10"
            rows="5"
            name="address"
            value={input.address}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
