import { Link, useNavigate } from "react-router-dom";
import "./admin.scss";
import StudentProfile from "../Admin_Student/StudentCard/StudentProfile";
import { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../../../reducers/userReducers/authSlice";

const Admin = () => {
  const [students, setStudents] = useState({});
  const [error, setError] = useState("");
  const [searchVal, setSearchVal] = useState(" ");
  const userData = localStorage.getItem("user");
  const data = JSON.parse(userData);
  console.log(data.user.name);

  //logout
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const dataStd = Object.values(students);
  const allStudents = dataStd[1] ? dataStd[1] : [];
  console.log(searchVal);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await axios.get("http://localhost:8800");
      setStudents(res.data);
    };

    fetchStudent();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:8800?name=${searchVal}`);
      setStudents(res.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="admin">
      <div className="top">
        <h1>
          Admin <span>DashBoard</span>
        </h1>
        <p>
          Welcome <i>{data.user.name} !!</i>
        </p>
      </div>

      <div className="bottom">
        <div className="left">
          <ul>
            <div className="icon">
              <i class="fa-solid fa-house"></i>
              <Link className="link" to="/students">
                {" "}
                <li>Home</li>
              </Link>
            </div>

            <div className="icon">
              <i class="fa-solid fa-plus"></i>
              <Link className="link" to="/create">
                {" "}
                <li>Create Student</li>
              </Link>
            </div>
            <div className="icon">
              <i class="fa-solid fa-right-from-bracket"></i>

              <li onClick={handleLogout}>Logout</li>
            </div>
            <div className="icon">
              <i class="fa-solid fa-bug"></i>
              <li>Report</li>
            </div>
          </ul>
        </div>
        <div className="right">
          <div className="rTop">
            <input
              type="text"
              placeholder="Search student...."
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="bRight">
            {allStudents ? (
              allStudents.map((item) => <StudentProfile item={item} />)
            ) : (
              <p>No Result found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
