import { useEffect, useState } from "react";
import "./editStudent.scss";
import axios from "axios";
import { useParams, use } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const [intialData, setIntialData] = useState({});
  const [modifiedData, setModilfiedData] = useState({});
  const [message, setMessage] = useState(" ");
  //get token
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const token = user.token;

  //go back

  //set form data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phoneNumber: "",
    dob: "",
    course: "",
    batch: "",
    department: "",
    gpa: "",
    attendedance: "",
    currSemester: "",
    job: "",
    parentName: "",
    parentContact: "",
    address: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await axios.get(`http://localhost:8800/user/get/${id}`);
      setIntialData(res.data);
    };

    fetchStudent();
  }, [id]);

  //update the value of input

  useEffect(() => {
    setFormData({
      name: intialData.name || "",
      age: intialData.age || "",
      gender: intialData.gender || "",
      dob: intialData.dob || "",
      phoneNumber: intialData.phoneNumber || "",
      course: intialData.course || "",
      batch: intialData.batch || "",
      department: intialData.department || "",
      gpa: intialData.gpa || "",
      currSemester: intialData.currentSemester || "",
      job: intialData.job || "",
      parentContact: intialData.parentContact || "",
      parentName: intialData.parentName || "",
      attendedance: intialData.attendedance || "",
      address: intialData.address || "",
    });
  }, [intialData]);

  //on update on modified fields
  useEffect(() => {
    const modifiedObject = Object.keys(formData).filter(
      (key) => formData[key] !== intialData[key]
    );

    const modifiedObjects = {};

    modifiedObject.forEach((key) => {
      modifiedObjects[key] = formData[key];
    });

    setModilfiedData(modifiedObjects);
  }, [formData, intialData]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //submit the button
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8800/user/update/student/${id}`,
        modifiedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data);
      window.location.reload();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="editStd">
      <button className="back" onClick={() => window.history.back()}>
        Back
      </button>
      <form action="" onSubmit={handleSubmit}>
        <h2>Personal Information</h2>

        <div className="personalInfo">
          <div className="perLeft">
            <div className="inputPerson">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                value={formData.name}
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="inputPerson">
              <label htmlFor="">Gender</label>
              <input type="text" placeholder="name" />
            </div>
            <div className="inputPerson">
              <label htmlFor="">Age</label>
              <input
                type="number"
                placeholder="name"
                name="age"
                value={formData.age}
                id="age"
                onChange={handleChange}
              />
            </div>
            <div className="inputPerson">
              <label htmlFor="">Phone No</label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                id="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <div className="inputPerson">
              <label htmlFor="">DOB</label>
              <input
                type="date"
                placeholder="name"
                name="dob"
                value={formData.dob}
                id="dob"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="perRight">
            <div className="circle">
              <input type="file" accept="/image" />
            </div>
            <p>Upload Image</p>
          </div>
        </div>

        {/* Education info */}
        <h2>Education Information</h2>
        <div className="inpuLabel">
          <label htmlFor="">Course</label>
          <input
            type="text"
            placeholder="name"
            name="course"
            value={formData.course}
            id="course"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">Batch</label>
          <input
            type="text"
            placeholder="name"
            name="batch"
            value={formData.batch}
            id="batch"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">Department</label>
          <input
            type="text"
            placeholder="name"
            name="department"
            value={formData.department}
            id="department"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">GPA</label>
          <input
            type="number"
            placeholder="name"
            name="gpa"
            value={formData.gpa}
            id="gpa"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">Attendence</label>
          <input
            type="number"
            placeholder="Attendence"
            name="attendedance"
            value={formData.attendedance}
            id="attendedance"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">CurrSemester</label>
          <input
            type="number"
            placeholder="name"
            name="currSemester"
            value={formData.currSemester}
            id="currSemester"
            onChange={handleChange}
          />
        </div>

        <div className="inpuLabel">
          <label htmlFor="">Job</label>
          <input
            type="text"
            placeholder="name"
            name="job"
            value={formData.job}
            id="job"
            onChange={handleChange}
          />
        </div>

        {/* Parent info */}
        <h2>Parent Information</h2>

        <div className="inpuLabel">
          <label htmlFor="">Parent Name</label>
          <input
            type="text"
            placeholder="name"
            name="parentName"
            value={formData.parentName}
            id="parentName"
            onChange={handleChange}
          />
        </div>

        <div className="inpuLabel">
          <label htmlFor="">Parent Contact</label>
          <input
            type="number"
            placeholder="name"
            name="parentContact"
            value={formData.parentContact}
            id="parentContact"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">Address</label>
          <textarea
            type="text"
            placeholder="name"
            name="address"
            value={formData.address}
            id="address"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditStudent;
