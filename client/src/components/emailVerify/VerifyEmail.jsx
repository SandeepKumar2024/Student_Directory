import { useState } from "react";
import "./emailVerify.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios
        .post("http://localhost:8800/user/auth/verifyemail", { email })
        .then((res) => {
          console.log(res.data);
          setResponse(res.status);
          navigate("/verifyOtp");
        })
        .catch((error) => {
          setError(error.response.data.message);
          console.log(error);
        });
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="verify">
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Email(*School email only)</label>
        <input
          type="text"
          placeholder="Enter your college email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">Verify</button>
        {error && (
          <p style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default VerifyEmail;
