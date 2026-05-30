import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { NavLink } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    console.log("Logging in...");

    const data = await authService.login({
      email,
      password,
    });

    console.log("LOGIN SUCCESS:", data);

    localStorage.setItem("user", JSON.stringify(data));

    navigate("/profile");
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    alert(error.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-gray-900 mt-4">
              Don't have an account? &nbsp;&nbsp;
              <NavLink
                to="/register"
                className="text-sm link link-accent hover:underline
                mt-4 font-bold"
              >
                Register
              </NavLink>
            </p>
          </div>

          <input
            type="submit"
            className="bg-linear-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            value="Login"
          />
       
        </form>
      </div>
    </div>
  );
}

export default Login;
