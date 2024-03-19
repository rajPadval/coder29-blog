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
    <div className=" gap-3 p-5 grid grid-cols-1  md:grid-cols-2">
      {blogs?.map((blog) => (
        <BlogCard key={blog._id} {...blog} />
      ))}
    </div>
  );
};

export default AllBlogs;
