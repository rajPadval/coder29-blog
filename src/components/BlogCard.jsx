import { Link, useLocation } from "react-router-dom";
import { convertDate } from "../helpers/convetDate";
import { MdOutlineMoreVert } from "react-icons/md";
import { useState } from "react";
import MoreOptions from "./MoreOptions";

const BlogCard = ({ thumbnail, title, tags, _id, createdAt, author }) => {
  const { pathname } = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Link
      to={`/blog/${_id}`}
      className="relative flex flex-col md:flex-row py-2  gap-3 justify-start items-center  md:px-5 rounded-2xl shadow-md bg-white w-full h-fit "
    >
      <img
        src={thumbnail}
        alt=""
        className="md:w-[20vw] rounded-2xl md:rounded-3xl"
      />
      <div className="px-3 md:px-0">
        <h3 className="text-xl font-bold">
          {title.length > 30 ? title.slice(0, 30) + "..." : title}
        </h3>
        <div className="flex gap-2 py-2 ">
          {tags?.map((tag, i) => {
            return (
              <span
                key={i}
                className="px-4 py-2 text-gray-600 text-xs md:text-sm bg-white  rounded-full font-semibold shadow-md capitalize"
              >
                {tag}
              </span>
            );
          })}
        </div>
        <hr className="my-2" />
        <div className=" flex justify-start items-center gap-3">
          <img
            src="/logo.jpg"
            alt=""
            className="rounded-full w-[30px] h-[30px]"
          />
          <div>
            <h4 className="font-bold text-sm">{author}</h4>
            <p className="font-bold text-sm">{convertDate(createdAt)}</p>
          </div>
        </div>
      </div>
      {pathname === "/admin" && (
        <MdOutlineMoreVert
          className="absolute top-5 right-5 z-10 text-2xl hover:text-purple-500 transition-all duration-300  ease-linear"
          onMouseEnter={() => setMenuVisible(!menuVisible)}
        />
      )}
      {menuVisible && <MoreOptions id={_id} />}
    </Link>
  );
};

export default BlogCard;
