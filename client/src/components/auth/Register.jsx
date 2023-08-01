import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [img, setImage] = useState(null);
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
    <div className="register">
      <form action="" onSubmit={handleSubmit}>
        <h2 style={{textAlign:"center"}}>REGISTER</h2>
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
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="****"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        {/* <input
          type="file"
          placeholder="Upload image"
          name="img"
          value={input.img}
          onChange={handleChange}
        /> */}
        <button type="submit">Register</button>
        <p style={{textAlign:"center"}}>Already have an Account ? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
