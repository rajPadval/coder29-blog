import { useEffect, useState } from "react";
import { getBlogs } from "../helpers/getBlogs";
import BlogCard from "./BlogCard";
// import InfiniteScroll from 'react-infinite-scroll-component';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my-20 mx-10  md:mx-auto w-fit flex flex-col md:flex-row gap-3 lg:gap-8 justify-center items-center ">
      <div className="py-3 flex mb-4 flex-col gap-3 w-fit  rounded-2xl shadow-md mx-auto bg-white">
        <h3 className="text-3xl font-bold mx-5">Jio Saavn Clone</h3>
        <img
          src="/thumbnail.jpg"
          alt=""
          className="md:w-[30vw] rounded-3xl  shadow-lg"
        />
        <div className="flex gap-2 mx-5 py-2">
          <span className="px-4 py-2 text-gray-600 text-xs md:text-sm bg-white  rounded-full font-semibold shadow-md">
            ReactJs
          </span>
          <span className="px-4 py-2 text-gray-600 text-xs md:text-sm bg-white  rounded-full font-semibold shadow-md">
            Redux
          </span>
          <span className="px-4 py-2 text-gray-600 text-xs md:text-sm bg-white  rounded-full font-semibold shadow-md">
            Tailwind
          </span>
        </div>
        <hr className="mx-5" />
        <div className="mx-5 flex justify-start items-center gap-3">
          <img
            src="/logo.jpg"
            alt=""
            className="rounded-full w-[40px] h-[40px]"
          />
          <div>
            <h4 className="font-bold">Coder29</h4>
            <p className="font-bold">Jun 20, 2021</p>
          </div>
        </div>
      </div>

      {/* Other section */}
      <div className="grid grid-cols-1 gap-3 md:h-[80vh] md:overflow-y-scroll md:px-3 md:pb-2 scroll-hide">
        {blogs?.map((blog) => (
          <BlogCard key={blog._id} {...blog} />
        ))}
        {blogs?.map((blog) => (
          <BlogCard key={blog._id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
