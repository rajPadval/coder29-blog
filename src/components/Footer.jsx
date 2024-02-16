import { FaYoutube, FaInstagram, FaLinkedinIn  } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-purple-500 text-white py-3 px-10 flex flex-col justify-center items-center">
      <span>Made with ♥ by Coder29</span>
      <div className="flex gap-3 text-lg">
        <Link
          to="https://www.youtube.com/@coder29"
          target="_blank"
          className="border p-2 rounded-full bg-white"
        >
          <FaYoutube className="hover:scale-125 transition-all duration-500 ease-in-out text-purple-500" />
        </Link>
        <Link
          to="https://www.instagram.com/coder29.yt/"
          target="_blank"
          className="border p-2 rounded-full bg-white"
        >
          <FaInstagram className="hover:scale-125 transition-all duration-500 ease-in-out text-purple-500" />
        </Link>
        <Link
          to="https://www.linkedin.com/in/raj-padval-10869125b/"
          target="_blank"
          className="border p-2 rounded-full bg-white"
        >
        <FaLinkedinIn  className="hover:scale-125 transition-all duration-500 ease-in-out text-purple-500" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
