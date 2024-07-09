import { SiHomeassistantcommunitystore } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { IoCreateOutline } from "react-icons/io5";

import { GrCart } from "react-icons/gr";

let links = [
  {
    link: "/",
    nav: "Home",
    icon: <SiHomeassistantcommunitystore />,
  },
  {
    link: "/about",
    nav: "About",
    icon: <RxAvatar />,
  },
  {
    link: "/create",
    nav: "Create",
    icon: <IoCreateOutline />,
  },
  {
    link: "/cart",
    nav: "Cart",
    icon: <GrCart />,
  },
];
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function NavbarLinks() {
  let { amout } = useSelector((state) => state.product);
  return (
    <>
      {links.map((link) => {
        return (
          <li key={link.nav}>
            <Link className=" relative" to={link.link}>
              {link.nav}

              {link.icon}
              {link.nav == "Cart" && (
                <span className=" absolute  text-black top-0 right-0 text-xs bg-info rounded-full px-1  ">
                  {amout}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default NavbarLinks;
