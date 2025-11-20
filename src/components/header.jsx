import { useState } from "react";
import { BiCart, BiLogIn, BiLogOut, BiMenu } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "px-6 py-2 rounded-full text-white font-semibold bg-[#2e4024]/50"
      : "px-3 py-2 text-[#2e4024]/80 font-semibold hover:text-white hover:bg-white/10 rounded-full transition";

  return (
    <header className="w-full bg-[#2e4024]/50 font-serif shadow-md px-6 ">
      <div className="max-w-7xl mx-auto h-[80px]  flex items-center justify-between ">

        {/* Logo */}
        <NavLink to="/">
          <img src="./logo-new.png" alt="" className="w-[150px] h-[50px] object-cover" />
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex    items-center gap-6">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/products" className={navLinkStyle}>Products</NavLink>
          <NavLink to="/reviews" className={navLinkStyle}>Reviews</NavLink>
          <NavLink to="/about-us" className={navLinkStyle}>About</NavLink>
          <NavLink to="/contact-us" className={navLinkStyle}>Contact</NavLink>

          <NavLink to="/cart">
            <BiCart className="text-[#2e4024]/50 text-3xl hover:scale-110 hover:text-[#2e4024] transition" />
          </NavLink>

          <button
            onClick={handleLogout}
          >
            <BiLogOut className="text-3xl text-[#2e4024]/50 hover:scale-110 hover:text-[#2e4024] transition cursor-pointer"/>
          </button>
        </nav>

        {/* MOBILE — Logout + Hamburger */}
        <div className="flex items-center gap-4 md:hidden">

          {/* Mobile Logout */}
          <button
            onClick={handleLogout}
            className="text-[#2e4024]/50 hover:text-[#2e4024]  text-3xl"
          >
            <BiLogOut />
          </button>

          {/* Hamburger */}
          <button
            className="text-[#2e4024]/50 hover:text-[#2e4024] text-3xl md:hidden"
            onClick={() => setOpen(!open)}
          >
            <BiMenu />
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-[#3E5632] text-white w-full flex flex-col items-center pb-4 gap-3 absolute top-[80px] left-0 border-t border-white/20">

          <NavLink to="/" onClick={() => setOpen(false)}>
            <div className="py-2">Home</div>
          </NavLink>

          <NavLink to="/products" onClick={() => setOpen(false)}>
            <div className="py-2">Products</div>
          </NavLink>

          <NavLink to="/reviews" onClick={() => setOpen(false)}>
            <div className="py-2">Reviews</div>
          </NavLink>

          <NavLink to="/about-us" onClick={() => setOpen(false)}>
            <div className="py-2">About</div>
          </NavLink>

          <NavLink to="/contact-us" onClick={() => setOpen(false)}>
            <div className="py-2">Contact</div>
          </NavLink>

          <NavLink to="/cart" onClick={() => setOpen(false)}>
            <BiCart className="text-white text-3xl mt-2" />
          </NavLink>

        </div>
      )}
    </header>
  );
}
