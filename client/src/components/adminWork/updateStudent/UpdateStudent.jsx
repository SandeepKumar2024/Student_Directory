import axios from "axios";
import "./updateStudent.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const UpdateStudent = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    img: null,
  });
  const navigate = useNavigate();
  console.log(input);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/user/register", {
        input,
      });
      console.log(res.data);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="updateStudent">
      <h2 style={{ textAlign: "center" }}>UPDATE STUDENT PROFILE</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="left">
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
          {/* <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="****"
            name="password"
            value={input.password}
            onChange={handleChange}
          /> */}
          {/* <input
          type="file"
          placeholder="Upload image"
          name="img"
          value={input.img}
          onChange={handleChange}
        /> */}

          <label htmlFor="">Roll No</label>
          <input type="number" />
          <label htmlFor="">Age</label>
          <input type="number" />
          <label htmlFor="">Phone No</label>
          <input type="number" />
          <label htmlFor="">Department</label>
          <input type="text" />
          <label htmlFor="">Batch</label>
          <input type="text" placeholder="eg: 2020-2024" />
        </div>
        <div className="right">
          <label htmlFor="">Course</label>
          <input type="text" placeholder="eg BTech" />
          <label htmlFor="">CGPA</label>
          <input type="number" />
          <label htmlFor="">Attendence</label>
          <input type="number" />
          <label htmlFor="">DOB</label>
          <input type="date" />
          <label htmlFor="">JOB</label>
          <input type="text" />
          <label htmlFor="">Current Sem</label>
          <input type="text" placeholder="eg 4" />
          <label htmlFor="">Address</label>
          <textarea name="" id="" cols="10" rows="5"></textarea>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;
