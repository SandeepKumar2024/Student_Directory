import { Link } from "react-router-dom";
import "./studentProfile.scss";
import { useState } from "react";
import axios from "axios";

const StudentProfile = ({ item }) => {
  const id = item._id;
  console.log(id);
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const token = user.token;

  const [deletePopup, setDeletePopup] = useState(false);
  const [msg, setMsg] = useState("");
  // const token = Cookies.get("token");

  const handleDelete = async (e) => {
    e.preventDefault();

    const fetchStudent = async () => {
      const res = await axios.delete(
        `http://localhost:8800/user/delete/student/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(res.data);
      window.location.reload();
    };

    fetchStudent();

    setDeletePopup(false);
  };
  //

  return (
    <div className="stdProfile">
      <div className="Stdleft">
        <img
          src={`${
            item.img
              ? item.img
              : "https://img.lovepik.com/element/40128/7461.png_1200.png"
          }`}
          alt=""
        />
        <div className="info">
          <span>{item.name}</span>
          <p>
            {" "}
            B.Tech {item.course} {item.job}
          </p>
        </div>
      </div>
      <div className="Stdright">
        <Link className="linkEdit" to={`/editStd/${item._id}`}>
          <button className="edit">Edit</button>
        </Link>
        <button onClick={() => setDeletePopup(true)}>Delete</button>
        {deletePopup && (
          <div className="delete">
            <p>Are you sure want to delete the student ?</p>
            <div className="deleteBtns">
              <button className="cancel" onClick={() => setDeletePopup(false)}>
                Cancel
              </button>
              <button onClick={handleDelete}>Yes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
