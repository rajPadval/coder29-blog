import JoditEditor from "jodit-react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "../helpers/uploadImage";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { MdDelete } from "react-icons/md";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState(0);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const createPost = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(title, thumbnail, content);

      // Define a function to track upload progress
      const onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
        // You can update your UI here with the upload progress
      };

      try {
        const uploadedImage = await uploadImage(thumbnail, onUploadProgress);
        if (!uploadedImage) {
          return toast.error("Error uploading image");
        }

        const res = await axios.post("http://localhost:5000/api/createBlog", {
          title,
          content,
          author: "Coder29",
          tags,
          thumbnail: uploadedImage.url,
          publicId: uploadedImage.publicId,
        });
        const data = await res.data;
        toast.success(data.message);
        setTitle("");
        setThumbnail(null);
        setContent("");
        setProgress(0); 
        setTags([]);
      } catch (error) {
        console.log("Error:", error.message);
      }
    },
    [title, thumbnail, content]
  );

  const handleThumbnailChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      alert("File size should be less than 1MB");
    } else {
      console.log(file);
      setThumbnail(file);
    }
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

  const editor = useRef(null);
  return (
    <div className=" md:w-[60vw] bg-white my-20 mx-auto p-4 rounded-2xl ">
      <LoadingBar progress={progress} />
      <h3 className="text-2xl text-gray-600 text-center">
        Let us create a blog post
      </h3>
      <form onSubmit={createPost} className="grid grid-cols-1 gap-3 my-6 ">
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
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title here.."
            className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100"
          />
        </div>
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

          <label htmlFor="tags" className="text-lg font-semibold text-gray-600">
            Selected Tags
          </label>
          <div className="bg-gray-100 rounded-2xl">
            {tags
              .map((tag, i) => (
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
        <div>
          <label
            htmlFor="editor"
            className="text-lg font-semibold text-gray-600"
          >
            Content
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>
        <button
          className="py-2 px-8 text-base bg-purple-500 hover:bg-purple-400 rounded-3xl text-white font-semibold w-fit"
          type="submit"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
