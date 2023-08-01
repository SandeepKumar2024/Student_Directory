import { Link } from "react-router-dom";
import "./home.scss";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../reducers/userReducers/authSlice";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div className="home">
      <div className="top">
        {user ? (
          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1517702145080-e4a4d91435bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
            <p>{user.user.name}</p>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="login">
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
      <div className="bottom">
        <h1>WELCOME TO</h1>
        <h1>
          <i>ASSAM ENGINEERING COLLEGE</i>
        </h1>
        <h1>STUDENT DIRECTORY!</h1>
        {user && (
          <p>
            <Link to="/students">
              <i>Click here</i>
            </Link>
            to explore students
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
