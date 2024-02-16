const AdminNavbar = () => {
  return (
    <nav className="bg-purple-500 p-4 mx-auto  flex justify-between items-center shadow-md">
      <a href="/" className="text-white text-2xl font-bold">
        Coder29
      </a>
      <ul className="flex space-x-4 text-white">
        <li className="hover:text-gray-200 cursor-pointer">All Blogs</li>
        <li className="hover:text-gray-200 cursor-pointer">Create Blog</li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
