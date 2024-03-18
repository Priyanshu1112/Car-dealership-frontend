import { Link } from "react-router-dom";
import Logo from "./Logo";
import { NavItems } from "../../constants";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <div
      className="fixed top-0 left-0 w-full z-[100]"
      style={{
        backgroundColor: isScrolled ? "white" : "",
        boxShadow: isScrolled ? "0px 2px 0px rgba(0, 0, 0, .2)" : "",
        transition: ".3s all",
      }}
    >
      <nav
        ref={navRef}
        className="container 2xl:relative  py-10 flex items-center justify-between px-3 dark:bg-gray-500"
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
              to={`${info.path}`}
              key={index}
              className=" text-base font-medium text-[#484848]"
            >
              {info.title}
            </Link>
          ))}
        </div>
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
      </nav>
    </div>
  );
};

export default Navbar;
