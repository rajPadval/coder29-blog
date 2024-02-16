const BlogCard = () => {
  return (
    <div className="flex flex-col md:flex-row py-2  gap-3 justify-center items-center w-fit md:px-5 rounded-2xl shadow-md bg-white">
      <img src="/thumbnail.jpg" alt="" className="md:w-[20vw] rounded-2xl md:rounded-3xl" />
      <div>
        <h3 className="text-xl font-bold">Jio Saavn Clone</h3>
        <div className="flex gap-2 py-2 ">
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
    </div>
  );
};

export default BlogCard;
