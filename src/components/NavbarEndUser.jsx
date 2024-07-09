//redux
import { useDispatch, useSelector } from "react-redux";
//rrd
import { useState, useEffect } from "react";
//slice
import { logout } from "../app/userSlice";
import WeatherLoaction from "./WeatherLoaction";
import toast, { Toaster } from "react-hot-toast";

let localStrog = () => {
  return localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light";
};

function NavbarEndUser() {
  let { user } = useSelector((state) => state.user);
  let dispetch = useDispatch();
  let [theme, setTheme] = useState(localStrog());
  const darkMode = (e) => {
    if (e.target.checked) {
      setTheme("night");
      toast("Hello Darkness!", {
        icon: "🌙",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      setTheme("light");
      toast("Hello Lightness!", {
        icon: "✨",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#111",
        },
      });
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <div className="navbar-end gap-10 aligen-content">
      <WeatherLoaction />
      <div className="dropdown dropdown-bottom dropdown-end ">
        <div className="avatar" role="button" tabIndex={0}>
          <div className=" w-12 rounded-full ring ring-offset-2">
            <img src={user.photoURL} />
          </div>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[2] w-52 p-2 shadow mt-1 gap-1"
        >
          <li>
            <p className=" ">Name: {user.displayName}</p>
          </li>{" "}
          <li>
            <p className="">Email: {user.email}</p>
          </li>
          <li className=" w-full text-left ">
            <label onClick={darkMode} className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </li>
          <li>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                toast(`Bye Bye ${user.displayName} `, {
                  icon: "🦾",
                });
                dispetch(logout(user));
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarEndUser;
