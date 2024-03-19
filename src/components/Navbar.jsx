import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BlogContext from "../context/BlogContext";
import BlogSection from "./BlogSection";
import SearchedBlogs from "./SearchedBlogs";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { setSearchResults, blogs, searchResults } = useContext(BlogContext);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      try {
        const results = blogs.filter((blog) => {
          const searchLower = search.toLowerCase();
          // Check if the title, author, or any tag in the blog matches the search query
          return (
            blog.title.toLowerCase().includes(searchLower) ||
            blog.author.toLowerCase().includes(searchLower) ||
            blog.tags.some((tag) => tag.toLowerCase().includes(searchLower))
          );
        });
        setSearchResults(results);
        console.log("Here are the search results:", results);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <>
      <nav className="shadow-md flex flex-col md:flex-row justify-between items-center px-3 py-4 rounded-b-2xl fixed top-0 right-0 left-0 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold mb-2 md:mb-0 text-white">
          Coder29's Blog
        </h1>
        <div className="flex justify-center items-center gap-2">
          <FaSearch className="text-lg text-white" />
          <input
            type="search"
            name="search"
            id="search"
            autoComplete="off"
            placeholder="Search Blogs Here.."
            className="outline-none border-b-2 border-gray-400 text-white focus:border-white bg-transparent transition-all px-2 py-1  md:w-[20vw]"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </nav>
      <SearchedBlogs />
    </>
  );
};

export default Navbar;
