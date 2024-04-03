import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { NavItems } from "../../constants";
import { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import Avatar from "/assets/image/Avatar.png";
import { CarTaxiFront, LogOut } from "lucide-react";
import { asyncLogOut } from "../store/actions/appActions";
import { Tooltip } from "@mui/material";
import { notifyError, notifySuccess } from "../utils/Toast";
=======
import { useSelector } from "react-redux";
import DarkMode from "/assets/icon/Inactive_darkmode.svg";
import Avatar from "/assets/image/Avatar.png";
import { Heart } from "lucide-react";
>>>>>>> 47614de6c4bec76bae4c9400e9352eb71e24962b

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avatarOpen, setAvatarOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.app);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (event.target.id == "avatar") {
          console.log("avatar");
          return;
        } else setAvatarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navHeight = navRef.current.offsetHeight;
        const scrollY = window.scrollY;
        const scrollThreshold = navHeight * 0.1;

        if (scrollY >= scrollThreshold) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    handleScroll(); // Call initially to check if the page is already scrolled
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { isAuthenticated, userType } = useSelector((state) => state.app);
  console.log(isAuthenticated);

  return (
    <div
<<<<<<< HEAD
      className={`${
        ["/", "/buyer"].includes(pathname) ? "fixed" : "sticky"
      } top-0 left-0 w-full z-[100]`}
=======
      className=" sticky top-0 left-0 w-full z-[100]"
>>>>>>> 47614de6c4bec76bae4c9400e9352eb71e24962b
      style={{
        backgroundColor: isScrolled ? "white" : "",
        boxShadow: isScrolled ? "0px 2px 0px rgba(0, 0, 0, .2)" : "",
        transition: ".3s all",
      }}
    >
      <nav
        ref={navRef}
<<<<<<< HEAD
        className={`container 2xl:relative ${
          isAuthenticated ? "py-5" : "py-10"
        } flex items-center justify-between px-3 dark:bg-gray-500`}
=======
        className="container 2xl:relative  py-5 flex items-center justify-between px-3 dark:bg-gray-500"
>>>>>>> 47614de6c4bec76bae4c9400e9352eb71e24962b
      >
        <Link to="/">
          <div className=" flex items-center gap-3">
            <Logo />

            <h1 className=" text-base text-[#1572D3] font-semibold">
              Buy Cars
            </h1>
          </div>
        </Link>

        <div className=" space-x-10">
          {NavItems.map((info, index) => (
            <Link
              to={`${info.path == "/cars" ? "/cars?page=1" : info.path}`}
              key={index}
              className={` text-base font-medium text-[#484848] ${
                isAuthenticated && info.title == "Become a dealer" && "hidden"
              }`}
            >
              {info.title}
            </Link>
          ))}
        </div>
        {isAuthenticated ? (
          <div className="flex gap-6 bg-white px-5 py-2 rounded-full items-center relative shadow-lg">
            <Tooltip title={"WatchList"} arrow>
              <CarTaxiFront
                onClick={() => {
                  navigate("/buyer/watch-list");
                }}
                size={26}
                className="text-gray-500 hover:text-red-700 cursor-pointer transition-all"
              />
            </Tooltip>
            <Link
              onClick={() => {
                setAvatarOpen(!avatarOpen);
              }}
            >
              <img
                id="avatar"
                src={Avatar}
                alt="Avatar"
                className=" object-cover"
              />
              {avatarOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-[105%] flex flex-col text-gray-600 rounded-lg gap-1 text-center right-0 bg-white   p-1 shadow-2xl"
                >
                  <Link
                    to={"/buyer/my-cars"}
                    className="transition-all rounded-lg py-3 px-4 hover:bg-gray-100"
                  >
                    {" "}
                    My Cars
                  </Link>
                  <hr />
                  <button
                    onClick={() => {
                      const res = dispatch(asyncLogOut());
                      console.log(res);
                      if (res == 200) notifySuccess("Logged out successfully!");
                      else notifyError("Error logging out!");
                    }}
                    className="flex px-4 py-3 gap-3 pt-3   items-center text-red-500 hover:bg-red-100  transition-all rounded-lg"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </div>
              )}
            </Link>
          </div>
        ) : (
          <div className=" space-x-4">
            <Link
              to={`/sign-in`}
              className="py-2 px-6 text-base font-medium text-black"
            >
              Sign In
            </Link>
            <Link
              to={`/sign-up`}
              className="py-2 px-6 text-base font-medium text-white bg-[#1572D3] rounded-lg"
            >
              Sign up
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
