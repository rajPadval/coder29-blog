import { useCallback, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import CreateBlog from "../components/CreateBlog";

const Admin = () => {
  const [isAuth, setIsAuth] = useState(true);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      {!isAuth ? (
        <div className="h-screen flex justify-center items-center">
          <form
            onSubmit={handleLogin}
            className="grid grid-cols-1 gap-3  bg-white w-[20vw] p-3 rounded-lg"
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
                required
                placeholder="Enter your username"
                className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100"
              />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <AdminNavbar />
          <CreateBlog />
        </div>
      )}
    </>
  );
};

export default Admin;
