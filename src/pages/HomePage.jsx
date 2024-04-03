import { useEffect, useRef } from "react";
import Hero_img from "/assets/image/hero_img.png";
import Choose_us_img from "/assets/image/choose_us_img.png";
import Arrow from "/assets/icon/arrow.svg";
import Wallet from "/assets/icon/wallet.svg";
import Car_logo1 from "/assets/image/car_logo1.png";
import Car_logo2 from "/assets/image/car_logo2.png";
import Car_logo3 from "/assets/image/car_logo3.png";
import Car_logo4 from "/assets/image/car_logo4.png";
import Car_logo5 from "/assets/image/car_logo5.png";
import Car_logo6 from "/assets/image/car_logo6.png";
import Quote_img from "/assets/image/quote_img1.png";
import Quote_img2 from "/assets/image/quote_img2.png";
import User_img from "/assets/image/user_img.png";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAllCars } from "../store/actions/carActions";
import { notifyError } from "../utils/Toast";

const HomePage = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const dispatch = useDispatch();

  const { isAuthenticated, allCars } = useSelector((state) => state.app);

  useEffect(() => {
    if (isAuthenticated)
      dispatch(asyncGetAllCars()).then((res) => {
        if (res != 200) notifyError(res.message);
      });
  }, [isAuthenticated]);

  useEffect(() => {
    const updateContainerHeight = () => {
      const imageHeight = imageRef.current.clientHeight;
      containerRef.current.style.height = `${imageHeight}px`;
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  const containerRef2 = useRef(null);
  const imageRef2 = useRef(null);

  useEffect(() => {
    const updateContainerHeight = () => {
      const imageHeight2 = imageRef2.current.clientHeight;
      containerRef2.current.style.height = `${imageHeight2}px`;
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  const containerRef3 = useRef(null);
  const imageRef3 = useRef(null);

  useEffect(() => {
    const updateContainerHeight = () => {
      const imageHeight3 = imageRef3.current.clientHeight;
      containerRef3.current.style.height = `${imageHeight3}px`;
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  return (
    <div className="relative">
      <div className="">
        <div
          ref={containerRef}
          className="container 2xl:relative flex items-center justify-start"
        >
          <div className="flex flex-col justify-center">
            <div className="relative -mt-40 2xl:mb-0">
              <div className=" relative w-fit">
                <h1 className=" text-[48px] font-semibold text-[#242424] leading-[50px]">
                  Find, book and <br /> buy a car{" "}
                  <span className="text-[#1572D3]">Easily</span>
                </h1>
                <img
                  src={Arrow}
                  alt="icon"
                  className=" absolute right-0 bottom-[-15px]"
                />
              </div>
              <p className="text-lg text-[#272727] font-medium leading-6 mt-7">
                Elevate your car buying experience with <br /> seamless
                solutions tailored just for you <br /> find, finance, and drive
                your dream car <br /> effortlessly
              </p>
            </div>
            <img
              ref={imageRef}
              src={Hero_img}
              alt="hero img"
              className="absolute right-0 top-0"
            />
          </div>
        </div>

        <div className="container flex items-center justify-center gap-10 overflow-x-auto my-20">
          {[
            Car_logo1,
            Car_logo2,
            Car_logo3,
            Car_logo4,
            Car_logo5,
            Car_logo6,
          ].map((e, index) => (
            <div key={index}>
              <img src={e} alt="" />
            </div>
          ))}
        </div>

        <div
          ref={containerRef2}
          id="why-you-choose"
          className="relative 2xl:container"
        >
          <div className="absolute left-0 top-0">
            <img src={Choose_us_img} alt="hero img" ref={imageRef2} />
          </div>
          <div className="container relative w-fit left-[20%] top-[10%]">
            <span className="py-3 px-6 bg-[#E8F1FB] text-[#1572D3] text-sm font-medium rounded-lg">
              WHY CHOOSE US
            </span>
            <h1 className="text-[38px] font-medium text-[#333333] leading-[45px] mt-8">
              We offer the best experience <br /> with our buying deals
            </h1>
            <div className="mt-5">
              {[0, 1, 2, 3].map((e, index) => (
                <div key={index} className="flex items-start gap-3 mb-6">
                  <div className="p-3 bg-[#ECF5FF] rounded-2xl">
                    <img src={Wallet} alt="" />
                  </div>
                  <div>
                    <h1 className="text-xl font-medium text-black">
                      Best price guaranteed
                    </h1>
                    <p className="text-base text-[#6D6D6D] font-normal mt-1">
                      Find a lower price? We&apos;ll refund you 100% of the
                      difference.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=" container mt-20">
          <h1 className=" text-[38px] font-medium text-black text-center">
            All Cars
          </h1>

          <div className="grid grid-cols-4 gap-7 mt-4 px-1">
            {allCars
              ?.filter((car) => !car.sold) // Filter out sold cars
              .slice(0, 4) // Take the first 10 cars
              .map((car, index) => (
                <Card key={index} car={car} />
              ))}
          </div>

          <div className=" flex items-center justify-center mt-12">
            <Link
              to={`/cars`}
              className=" border-[1px] border-[#E0E0E0] w-fit px-8 py-2 text-[#4E4E4E] rounded-lg mt-3"
            >
              Show all vehicles
            </Link>
          </div>
        </div>

        <div className="bg-[#F7FBFF] mt-10 pb-20">
          <div className="container pt-32 relative">
            <div className=" flex items-center justify-center flex-col">
              <span className="py-3 px-6 bg-[#E8F1FB] text-[#1572D3] text-sm font-medium rounded-lg">
                TESTIMONIALS
              </span>
              <h1 className=" text-[38px] font-medium text-black text-center">
                What people say about us?
              </h1>
              <div className="absolute left-10 top-20">
                <img src={Quote_img} alt="" />
              </div>
              <div className="absolute top-0 right-10 z-0">
                <img src={Quote_img2} alt="" />
              </div>
            </div>
            <div className="px-52">
              <div
                ref={containerRef3}
                className=" bg-white flex items-start rounded-3xl mt-20 relative z-10"
              >
                <div className="h-full">
                  <img
                    src={User_img}
                    alt=""
                    className="h-full"
                    ref={imageRef3}
                  />
                </div>
                <div className=" ml-7 w-[500px] flex flex-col justify-between h-full">
                  <div>
                    <h1 className=" text-[64px]">
                      5.0 <span className=" text-[24px]">stars</span>
                    </h1>
                    <p className=" text-lg text-[#282828] font-medium">
                      “I feel very secure when using services. Your customer
                      care team is very enthusiastic and the driver is always on
                      time.”
                    </p>
                  </div>
                  <div className=" flex items-start flex-col pb-6">
                    <span className=" text-[24px] font-medium text-black">
                      Charlie Johnson
                    </span>
                    <span className=" text-sm font-normal text-[#838383]">
                      From New York, US
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
