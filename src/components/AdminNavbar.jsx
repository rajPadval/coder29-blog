import { useContext } from "react";
import BlogContext from "../context/BlogContext";

const AdminNavbar = () => {
  const { tab, setTab } = useContext(BlogContext);
  return (
    <nav className="bg-purple-500 p-4 mx-auto  flex justify-between items-center shadow-md">
      <a href="/" className="text-white text-2xl font-bold">
        Coder29
      </a>
      <ul className="flex space-x-4 text-white">
        <li
          className={`hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
            tab === "AllBlogs" ? "font-bold" : ""
          }`}
          onClick={() => setTab("AllBlogs")}
        >
          All Blogs
        </li>
        <li
          className={`hover:font-bold transition-all duration-300 ease-in-out cursor-pointer ${
            tab === "CreateBlog" ? "font-bold" : ""
          }`}
          onClick={() => setTab("CreateBlog")}
        >
          Create Blog
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
