import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import BlogContext from "./context/BlogContext";
import { useState } from "react";

export default function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <>
      <BlogContext.Provider
        value={{
          userAuthenticated,
          setUserAuthenticated,
          userName,
          setUserName,
          userImage,
          setUserImage,
          userId,
          setUserId,
        }}
      >
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/*"
              element={
                <div className="h-screen flex justify-center items-center">
                  <h1 className="text-center text-3xl">404 Not Found!</h1>
                </div>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </BlogContext.Provider>
    </>
  );
}
