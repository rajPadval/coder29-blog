import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MoreOptions = ({ id }) => {
  const deleteBlog = async (id) => {
    const res = await axios.delete(
      `http://localhost:5000/api/deleteBlog/${id}`,
      { withCredentials: true }
    );
    const data = await res.data;
    if (data.success) {
      window.location.reload();
    }
    toast.success(data.message);
  };
  return (
    <ul className="absolute z-10 bg-white top-2 right-10 text-sm font-semibold shadow-lg rounded-md p-2 border">
      <Link
        to={`/admin/edit/${id}`}
        className="text-gray-600 hover:text-gray-800 transition-all duration-300 ease-in-out"
      >
        Edit
      </Link>
      <li
        onClick={() => deleteBlog(id)}
        className="text-gray-600 hover:text-gray-800 transition-all duration-300 ease-in-out"
      >
        Delete
      </li>
    </ul>
  );
};

export default MoreOptions;
