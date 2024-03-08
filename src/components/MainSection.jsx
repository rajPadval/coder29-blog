import { useEffect, useState } from "react";
import { getBlogs } from "../helpers/getBlogs";
import { Link } from "react-router-dom";

const MainSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className=" py-20 bg-purple-500 min-h-[80vh] flex flex-col-reverse md:flex-row justify-between gap-5 items-center px-10">
      <div className=" flex flex-col gap-3">
        <h2 className="text-4xl md:text-7xl font-bold text-white ">
          {blogs[0]?.title}
        </h2>
        <p className="text-lg md:text-3xl text-white font-sans lg:w-[50vw]">
          This is the latest blog, we have posted. I hope you all will someting
          new from this blog.
        </p>
        <hr />
        <div className="flex gap-2">
          {blogs[0]?.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-2 text-xs md:text-sm bg-white  rounded-full font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={`/blog/${blogs[0]?._id}`}
          className="px-8 py-2 text-xs nd:text-sm bg-white  rounded-full font-semibold w-fit mt-3"
        >
          Read Now
        </Link>
      </div>
      <div>
        <img
          src={blogs[0]?.thumbnail}
          alt=""
          className="md:w-[40vw] rounded-3xl mt-14 md:mt-0 shadow-lg"
        />
      </div>
    </section>
  );
};

export default MainSection;
