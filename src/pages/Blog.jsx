import axios from "axios";
import { useCallback, useEffect, useState, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { getBlogs } from "../helpers/getBlogs";
import BlogCard from "../components/BlogCard";
import { MdAccountCircle } from "react-icons/md";
import toast from "react-hot-toast";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import BlogContext from "../context/BlogContext";
import { MdEdit, MdDelete } from "react-icons/md";
import { convertDate } from "../helpers/convetDate";
import { getBlogById } from "../helpers/getBlogById";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogComments, setBlogComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [editContent, setEditContent] = useState(false);
  const [postId, setPostId] = useState("");

  const {
    userAuthenticated,
    setUserAuthenticated,
    userName,
    setUserName,
    userImage,
    setUserImage,
    currentUserId,
    setCurrentUserId,
  } = useContext(BlogContext);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { displayName, photoURL, uid } = result.user;
        console.log("User is ", result.user);
        setUserName(displayName);
        setUserImage(photoURL);
        setCurrentUserId(uid);
        setUserAuthenticated(true);
        toast.success(`Welcome ${displayName} 👋`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const signOutWithGoogle = () => {
    auth.signOut().then(() => {
      setUserAuthenticated(false);
      setUserName("");
      setUserImage("");
      setCurrentUserId("");
      toast.success("Logged out successfully");
    });
  };

  const addComment = async () => {
    if (!userAuthenticated) {
      return toast.error("Please login to comment");
    }

    if (newComment.trim() === "" || newComment.split(" ").length < 3) {
      toast.error("Comment should be at least 3 words long");
      return;
    }
    const res = await axios.post(`http://localhost:5000/api/addComment/${id}`, {
      comment: newComment,
      userName,
      userImage,
      userId: currentUserId,
    });
    const data = await res.data;
    toast.success(data.message);
    getComments(id);
    setNewComment("");
  };

  const getComments = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/getComments/${id}`);
    const data = await res.data;
    setBlogComments(data.comments);
  };

  const updateComment = async (commentId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/updateComment/${id}/${commentId}`,
        { comment: editedComment }
      );
      const data = await res.data;
      toast.success(data.message);
      getComments(id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/deleteComment/${id}/${commentId}`
      );
      const data = await res.data;
      toast.success(data.message);
      getComments(id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getBlogById(id)
      .then((data) => setBlog(data))
      .catch((err) => console.log(err.message));
    getComments(id);
  }, [id]);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  const editableContentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const div = document.getElementById("commentsDiv");
      const button = document.getElementById("saveButton");
      if (
        div &&
        !div.contains(e.target) &&
        e.target !== editableContentRef.current &&
        !(button && button.contains(e.target))
      ) {
        setEditContent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setEditContent]);

  return (
    <section>
      {/* Navigation */}
      <nav className=" p-5  border-b-2 flex gap-2 bg-purple-500">
        <Link
          to="/"
          className="font-semibold flex justify-center items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 ease-in-out"
        >
          <AiFillHome /> <span>Home</span>
        </Link>{" "}
        / <span className="text-white cursor-pointer">{blog.title}</span>
      </nav>

      {/* Blog */}
      <div className="flex mx-5 gap-3 md:gap-5 flex-col md:flex-row">
        <div className="w-full lg:w-[60vw] bg-white mx-auto p-5 rounded-lg my-10">
          <h1 className="text-4xl font-bold my-5">{blog.title}</h1>
          <img
            src={blog.thumbnail}
            alt=""
            className="w-full h-[40vh] object-cover rounded-2xl shadow-md "
          />
          <div className="flex gap-2 my-5">
            {blog.tags?.map((tag, i) => {
              return (
                <span
                  key={i}
                  className="px-4 py-2 text-gray-600 text-xs md:text-sm bg-white  rounded-full font-semibold shadow-md capitalize"
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <hr />
          <div className="my-5">
            <p
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="overflow-x-clip"
            ></p>
          </div>
          <div className="flex justify-start items-center gap-3 text-base">
            <img
              src="/logo.jpg"
              alt=""
              className="rounded-full w-[40px] h-[40px]"
            />
            <div>
              <h4 className="font-bold">{blog.author}</h4>
              <p className="font-bold">{convertDate(blog.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* sidebar  */}
        <div className="my-10">
          <h3 className="text-3xl font-semibold text-gray-600 ml-3 ">
            More Blogs
          </h3>
          {/* blogs content */}
          <div className=" grid grid-cols-1 gap-3 md:h-[80vh] md:overflow-y-scroll md:px-3 md:pb-2 scroll-hide my-3">
            {blogs?.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))}
          </div>

          {/* comment seciton */}
          <h3 className="text-3xl font-semibold text-gray-600 ml-3 mt-10">
            Comments
          </h3>

          {/* comments content */}
          <div>
            {/* adding comments */}
            <div className="flex justify-between items-start gap-3 my-5">
              {userAuthenticated ? (
                <img
                  src={userImage}
                  alt={`${userName}'s profile`}
                  className="w-[50px] rounded-full"
                />
              ) : (
                <MdAccountCircle className="text-5xl text-gray-600" />
              )}

              <div className="flex flex-col w-full gap-2">
                <textarea
                  name="message"
                  id="message"
                  // cols="30"
                  rows="2"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="md:w-[35vw] rounded-lg py-2  outline-none shadow-md text-base px-3"
                  placeholder="Write a comment"
                ></textarea>
                <div className="flex gap-3">
                  <button
                    className="text-white bg-purple-500 hover:bg-purple-400 px-5 py-1 text-base font-semibold transtion-all duration-300 ease-linear rounded-md w-fit"
                    onClick={addComment}
                  >
                    Add
                  </button>
                  <button
                    className="text-white bg-purple-500 hover:bg-purple-400 px-5 py-1 text-base font-semibold transtion-all duration-300 ease-linear rounded-md w-fit"
                    onClick={
                      !userAuthenticated ? signInWithGoogle : signOutWithGoogle
                    }
                  >
                    {!userAuthenticated ? "Sign In With Google" : "Sign Out"}
                  </button>
                </div>
              </div>
            </div>

            {/* listing comments */}
            <div>
              {blogComments?.map(
                ({ comment, userName, userImage, userId, _id }) => (
                  <div
                    id="commentsDiv"
                    className="flex flex-col md:flex-row justify-start items-start md:gap-3 my-3"
                    key={_id}
                  >
                    <img
                      className="rounded-full hidden md:block w-[50px] text-gray-600"
                      src={userImage}
                      // alt={`${userName}'s profile`}
                    />

                    <div className="bg-white w-full md:w-[35vw] rounded-lg py-2  text-sm md:text-base px-3 shadow-md ">
                      <div className="flex justify-between">
                        <span className="text-xs md:text-sm font-semibold ">
                          {currentUserId === userId ? "You" : userName}
                        </span>
                        {currentUserId === userId && (
                          <div className="flex gap-1">
                            <MdEdit
                              onClick={() => {
                                setEditContent(!editContent);
                                setPostId(_id);
                              }}
                              className="text-gray-500 hover:text-purple-500 hover:scale-105 transition-all ease-in-out cursor-pointer "
                            />
                            <MdDelete
                              onClick={() => deleteComment(_id)}
                              className="text-gray-500 hover:text-purple-500 hover:scale-105 transition-all ease-in-out cursor-pointer "
                            />
                          </div>
                        )}
                      </div>
                      <p
                        ref={editableContentRef}
                        className={` outline-none ${
                          editContent &&
                          postId === _id &&
                          currentUserId === userId &&
                          "bg-gray-100 shadow-inner pl-1 rounded-md my-2 transition-all duration-500 ease-in-out"
                        }`}
                        onInput={(e) => setEditedComment(e.target.textContent)}
                        contentEditable={editContent}
                      >
                        {comment}
                      </p>
                      {editContent &&
                        postId === _id &&
                        currentUserId === userId && (
                          <button
                            onClick={() => updateComment(_id)}
                            id="saveButton"
                            className="bg-purple-500 hover:bg-purple-600 px-3 py-1 text-white text-sm rounded-lg"
                          >
                            Save
                          </button>
                        )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
