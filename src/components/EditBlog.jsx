import { Link, useNavigate, useParams } from "react-router-dom";
import { checkAuth } from "../helpers/checkAuth";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import BlogContext from "../context/BlogContext";
import { getBlogById } from "../helpers/getBlogById";
import { MdAdminPanelSettings, MdDelete } from "react-icons/md";
import JoditEditor from "jodit-react";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState(0);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const { setIsAuth, isAuth } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleThumbnailChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      alert("File size should be less than 1MB");
    } else {
      console.log(file);
      setThumbnail(file);
    }
  }, []);

  useEffect(() => {
    checkAuth().then((data) => {
      console.log(data);
      if (data === false) {
        navigate("/login");
      }
      getBlogById(id)
        .then((data) => setBlog(data))
        .catch((err) => console.log(err.message));
    });
  }, []);

  const addTag = useCallback(
    (tag) => {
      setTags((prev) => [...prev, tag]);
    },
    [tags, currentTag]
  );

  const removeTag = useCallback(
    (tag) => {
      setTags((prev) => prev.filter((t) => t !== tag));
    },
    [tags]
  );

  return (
    <div className="">
      {isAuth && (
        <div>
          <nav className=" p-5  border-b-2 flex gap-2 bg-purple-500">
            <Link
              to="/admin"
              className="font-semibold flex justify-center items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 ease-in-out"
            >
              <MdAdminPanelSettings /> <span>Admin</span>
            </Link>{" "}
            / <span className="text-white cursor-pointer">{blog?.title}</span>
          </nav>
          <div className="w-[60vw] bg-white p-5 mx-auto my-10 flex flex-col gap-3">
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-lg font-semibold text-gray-600"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={blog?.title}
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title here.."
                className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100"
              />
            </div>
            <img
              src={blog?.thumbnail}
              width={200}
              height={100}
              className="rounded-2xl"
            />
            <div className="flex flex-col">
              <label
                htmlFor="thumbnail"
                className="text-lg font-semibold text-gray-600"
              >
                Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                required
                onChange={handleThumbnailChange}
                tabIndex={1}
                className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100"
              />
            </div>
            <JoditEditor
              ref={editor}
              value={blog?.content}
              onChange={(newContent) => {}}
            />
            <div className="flex flex-col">
              <label
                htmlFor="thumbnail"
                className="text-lg font-semibold text-gray-600"
              >
                Tags
              </label>
              <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
                <input
                  className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100 w-full md:w-[85%]"
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="Enter the tag here.."
                  value={currentTag}
                  onChange={(e) => {
                    setCurrentTag(e.target.value);
                  }}
                />
                <button
                  className="py-2 px-8 text-base bg-purple-500 hover:bg-purple-400 rounded-3xl text-white font-semibold w-fit"
                  onClick={() => {
                    addTag(currentTag);
                    setCurrentTag("");
                  }}
                >
                  Add Tag
                </button>
              </div>

              <label
                htmlFor="tags"
                className="text-lg font-semibold text-gray-600"
              >
                Selected Tags
              </label>
              <div className="bg-gray-100 rounded-2xl">
                {blog.tags
                  ?.map((tag, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center  px-2  capitalize"
                    >
                      <span>{tag}</span>
                      <MdDelete
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </div>
                  ))
                  .reverse()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
