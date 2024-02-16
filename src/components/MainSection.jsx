const MainSection = () => {
  return (
    <section className=" py-20 bg-purple-500 min-h-[80vh] flex flex-col-reverse md:flex-row justify-between gap-5 items-center px-10">
      <div className=" flex flex-col gap-3">
        <h2 className="text-4xl md:text-7xl font-bold text-white ">
          Jio Saavn Clone
        </h2>
        <p className="text-lg md:text-3xl text-white font-sans lg:w-[50vw]">
          Made this with ReactJs, TailwindCss, Redux Toolkit and Jio saavn Api
        </p>
        <hr />
        <div className="flex gap-2">
          <span className="px-3 py-2 text-xs md:text-sm bg-white  rounded-full font-semibold">
            ReactJs
          </span>
          <span className="px-3 py-2 text-xs md:text-sm bg-white  rounded-full font-semibold">
            Redux
          </span>
          <span className="px-3 py-2 text-xs md:text-sm bg-white  rounded-full font-semibold">
            Tailwind
          </span>
        </div>
        <button className="px-8 py-2 text-xs nd:text-sm bg-white  rounded-full font-semibold w-fit mt-3">
          Read Now
        </button>
      </div>
      <div>
        <img
          src="/thumbnail.jpg"
          alt=""
          className="md:w-[40vw] rounded-3xl mt-14 md:mt-0 shadow-lg"
        />
      </div>
    </section>
  );
};

export default MainSection;
