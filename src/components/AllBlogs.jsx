import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { getBlogs } from "../helpers/getBlogs";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-screen flex flex-col gap-3 lg:h-[60vh] justify-center items-center p-5">
      {blogs?.map((blog) => (
        <BlogCard key={blog._id} {...blog} />
      ))}
    </div>
  );
};

export default AllBlogs;
