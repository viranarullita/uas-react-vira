import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Home, BookOpen, User, Bookmark, Info, Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("penggunaAktifId");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 px-3 py-2 rounded-lg transition ${
      isActive
        ? "text-orange-600 font-semibold" // cuma teksnya berubah
        : "text-gray-700 hover:text-orange-500"
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-600">
          CookRecipe
        </Link>

        {/* Tombol Hamburger (muncul di mobile & tablet, hilang di desktop) */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent lg:flex lg:items-center lg:gap-6 shadow-md lg:shadow-none`}
        >
          {/* Menu utama */}
          <div className="flex flex-col lg:flex-row lg:gap-4 p-4 lg:p-0">
            <NavLink
              to="/"
              end
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <Home size={18} /> Home
            </NavLink>
            <NavLink
              to="/all-recipes"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <BookOpen size={18} /> All Recipes
            </NavLink>
            <NavLink
              to="/my-recipes"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <User size={18} /> My Recipes
            </NavLink>
            <NavLink
              to="/favorites"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <Bookmark size={18} /> Favorites
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <Info size={18} /> About
            </NavLink>
          </div>

          {/* Tombol Logout */}
          <div className="p-4 lg:p-0 lg:ml-4">
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full lg:w-auto px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;