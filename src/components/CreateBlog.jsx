import JoditEditor from "jodit-react";
import { useCallback, useRef, useState } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");

  const createPost = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(title, thumbnail, content);
    },
    [title, thumbnail, content]
    
  );

  const editor = useRef(null);
  return (
    <div className=" md:w-[60vw] bg-white my-20 mx-auto p-4 rounded-2xl ">
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
            onChange={(e) => setThumbnail(e.target.files[0])}
            tabIndex={1}
            className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100"
          />
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
