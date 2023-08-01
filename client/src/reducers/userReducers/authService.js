import axios from "axios";

const login = async (userData) => {
  const res = await axios.post("http://localhost:8800/user/login", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

//logout
const logout = async () => {
  await axios.post("http://localhost:8800/user/logout");

  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
