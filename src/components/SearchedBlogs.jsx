import { useContext } from "react";
import BlogContext from "../context/BlogContext";
import BlogCard from "./BlogCard";

const SearchedBlogs = () => {
  const { searchResults } = useContext(BlogContext);
  return (
    <div
      className={`fixed right-0 left-0 top-0 bottom-0 bg-black bg-opacity-80 backdrop-blur-xl grid grid-cols-1 md:grid-cols-2 gap-5 px-5 py-32  md:py-24 overflow-y-scroll scroll-hide transition-all ease-in-out duration-300 justify-center items-center z-20 ${
        searchResults.length === 0 ||
        searchResults === undefined ||
        searchResults === null
          ? "-translate-y-[2000px]"
          : "translate-y-0"
      }`}
    >
      {searchResults?.map((search) => (
        <BlogCard key={search._id} {...search} />
      ))}
    </div>
  );
};

export default SearchedBlogs;
