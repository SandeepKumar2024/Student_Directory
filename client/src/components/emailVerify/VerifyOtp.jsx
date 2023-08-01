import { useState } from "react";
import "./emailVerify.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [respone, setResponse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(respone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "otp") {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios
        .post("http://localhost:8800/user/auth/verify", { otp })
        .then((res) => {
          console.log(res.data);
          setResponse(res.data.message);
          navigate("/login");
        })
        .catch((error) => {
          setError(error.response.data.message);
          // console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="verify">
      {respone ? (
        <p>{respone}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="ReEnter your email..."
            value={email}
            name="email"
            onChange={handleChange}
          /> */}
          <label htmlFor="">OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            name="otp"
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
          {error && (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default VerifyOtp;
