import { useCallback, useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import CreateBlog from "../components/CreateBlog";
import axios from "axios";
import toast from "react-hot-toast";
import AllBlogs from "../components/AllBlogs";

const Admin = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      const data = await res.data;
      toast.success(data.message);
      setIsAuth(true);
    } catch (error) {
      console.log("Error : ", error.message);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get("http://localhost:5000/api/checkAuth", {
        withCredentials: true,
      });
      const data = await res.data;
      setIsAuth(data.success);
    } catch (err) {
      console.log("Error : ", err.message);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      {!isAuth ? (
        <div className="h-screen flex justify-center items-center">
          <form
            onSubmit={handleLogin}
            className="grid grid-cols-1 gap-3  bg-white w-[80vw] md:w-[20vw] p-3 rounded-lg"
          >
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-lg font-semibold text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Enter your username"
                className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-lg font-semibold text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="password"
                required
                placeholder="Enter your username"
                className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 rounded-2xl px-3 py-1 text-gray-100 font-semibold hover:bg-purple-600 transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <AdminNavbar />
          <CreateBlog />
          <AllBlogs />
        </div>
      )}
    </>
  );
};

export default Admin;
