import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}
