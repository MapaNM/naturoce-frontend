import { BiCart } from "react-icons/bi"
import { NavLink } from "react-router-dom"


export default function Header(){

    return(
      <header className="h-[100px] bg-primary flex justify-center items-center gap-10 relative">

        <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-1 border-2 border-white text-white font-bold rounded-lg"
            : "px-3 py-1 text-white hover:text-white"
        }
      >
        Home
      </NavLink>

         <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-1 border-2 border-white text-white font-bold rounded-lg"
            : "px-3 py-1 text-white hover:text-white"
        }
      >
        Products
      </NavLink>

        <NavLink
        to="/reviews"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-1 border-2 border-white text-white font-bold rounded-lg"
            : "px-3 py-1 text-white hover:text-white"
        }
      >
        Reviews
      </NavLink>

         <NavLink
        to="/about-us"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-1 border-2 border-white text-white font-bold rounded-lg"
            : "px-3 py-1 text-white hover:text-white"
        }
      >
        About
      </NavLink>

         <NavLink
        to="/contact-us"
        className={({ isActive }) =>
          isActive
            ? "px-3 py-1 border-2 border-white text-white font-bold rounded-lg"
            : "px-3 py-1 text-white hover:text-white"
        }
      >
        Contact
      </NavLink>

      <NavLink
        to="/cart"
        className="absolute right-[80px]">
       <BiCart className="text-white text-3xl ml-4"/>
      </NavLink>
      </header>
    )
}