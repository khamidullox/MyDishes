//redux
import { useDispatch, useSelector } from "react-redux";
//rrd
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//slice
import { logout } from "../app/userSlice";
//componenets
import NavbarLinks from "./NavbarLinks";
import NavbarEndUser from "./NavbarEndUser";
let localStrog = () => {
  return localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "garden";
};
function Navbar() {
  return (
    <header className="navbar rounded-md shadow-md aligen-content max-w-full lg:px-20 px-0 mt-2">
      <div className="navbar-start aligen-content">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow relative"
          >
            <NavbarLinks />
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost font-bold text-2xl hidden md:flex"
        >
          Dishes
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-lg gap-5 relative">
          <NavbarLinks />
        </ul>
      </div>
      <NavbarEndUser />
    </header>
  );
}

export default Navbar;
