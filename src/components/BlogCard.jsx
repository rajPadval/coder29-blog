import { Link } from "react-router-dom";

const BlogCard = ({ thumbnail, title, tags, _id }) => {
  return (
    <Link
      to={`/blog/${_id}`}
      className="flex flex-col md:flex-row py-2  gap-3 justify-start items-center md:px-5 rounded-2xl shadow-md bg-white w-full "
    >
      <img
        src={thumbnail}
        alt=""
        className="md:w-[20vw] rounded-2xl md:rounded-3xl"
      />
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex gap-2 py-2 ">
          {tags?.map((tag, i) => {
            return (
              <span
                key={i}
                className="px-4 py-2 text-gray-600 text-xs md:text-sm bg-white  rounded-full font-semibold shadow-md"
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
            <h4 className="font-bold text-sm">Coder29</h4>
            <p className="font-bold text-sm">Jun 20, 2021</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
