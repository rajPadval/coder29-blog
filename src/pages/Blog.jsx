import axios from "axios";
import { useCallback, useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { getBlogs } from "../helpers/getBlogs";
import BlogCard from "../components/BlogCard";
import { MdAccountCircle } from "react-icons/md";
import toast from "react-hot-toast";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import BlogContext from "../context/BlogContext";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [newComment, setNewComment] = useState("");

  const {
    userAuthenticated,
    setUserAuthenticated,
    userName,
    setUserName,
    userImage,
    setUserImage,
    userId,
    setUserId,
  } = useContext(BlogContext);

  const getBlogById = useCallback(async (id) => {
    const res = await axios.get(`http://localhost:5000/api/getBlogById/${id}`);
    const data = await res.data;
    console.log(data.blog);
    setBlog(data.blog);
  }, []);

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
        setUserId(uid);
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
      setUserId("");
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
      userId,
    });
    const data = await res.data;
    toast.success(data.message);
    setNewComment("");
  };

  useEffect(() => {
    getBlogById(id);
  }, [id]);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

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
                  className="px-4 py-2 text-gray-600 text-xs md:text-sm bg-white  rounded-full font-semibold shadow-md"
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <hr />
          <div className="my-5">
            <p dangerouslySetInnerHTML={{ __html: blog.content }} className="overflow-x-clip"></p>
          </div>
          <div className="flex justify-start items-center gap-3 text-base">
            <img
              src="/logo.jpg"
              alt=""
              className="rounded-full w-[40px] h-[40px]"
            />
            <div>
              <h4 className="font-bold">Coder29</h4>
              <p className="font-bold">Jun 20, 2021</p>
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
              <MdAccountCircle className="text-5xl text-gray-600" />
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
              {blog.comments?.map(({ comment, userName, userImage }, i) => (
                <div
                  className="flex flex-col md:flex-row justify-center items-start md:items-center md:gap-3"
                  key={i}
                >
                  <img className="text-3xl md:text-5xl text-gray-600" src={userImage} alt={`${userName}'s profile`}/>
                  <div className="bg-white w-full md:w-[35vw] rounded-lg py-2 my-2 text-sm md:text-base px-3 shadow-md ">
                    <span className="text-xs md:text-sm font-semibold ">
                      {userName}
                    </span>
                    <p className=" outline-none">{comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
