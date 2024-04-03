import Car_img from "/assets/image/car_img1.png";
import User_icon from "/assets/icon/user_icon.svg";
import Type_icon from "/assets/icon/type_icon.svg";
import Conditioner_icon from "/assets/icon/conditioner_icon.svg";
import Door_icon from "/assets/icon/door_icon.svg";
import { Heart } from "lucide-react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedCar } from "../store/reducers/appReducer";
import { useNavigate } from "react-router-dom";
import {
  asyncAddWatchList,
  asyncDeleteWatchList,
} from "../store/actions/carActions";
import { notifyError, notifyInfo, notifySuccess } from "../utils/Toast";
import { useEffect, useState } from "react";

const Card = ({ car, buy = true }) => {
  const { isAuthenticated, userType, watchList } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allCars, user } = useSelector((state) => state.app);
  const [myCars, setMyCars] = useState([]);

  useEffect(() => {
    let cars = [];
    allCars?.map((car) => {
      if (car.sold && user?._id == car?.buyer_id) cars.push(car._id);
    });

    setMyCars(cars);
  }, [allCars]);

  useEffect(() => {
    // console.log(myCars, myCars.includes(car._id));
  }, [myCars]);

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      notifyInfo("Login to perfrom actions!");
      return navigate("/sign-in");
    }
    console.log("buy now");
  };

  return (
    <>
      {/* <Link to={"car-detail"}> */}
      <div
        className=" bg-white shadow-xl p-5 rounded-xl relative hover:cursor-pointer"
        onClick={() => {
          dispatch(updateSelectedCar(car));
          userType == "Dealer"
            ? navigate("/dealer/car-detail")
            : navigate(`/car-detail`);
        }}
      >
        {userType != "Dealer" && (
          <div className=" absolute top-2 right-3 bg-slate-100 shadow-xl p-1.5 rounded-full flex items-center justify-center cursor-pointer">
            {!myCars.includes(car._id) ? (
              watchList?.includes(car._id) ? (
                <Heart
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(asyncDeleteWatchList(car._id)).then((res) => {
                      if (res == 200) notifySuccess("Deleted from watch list!");
                      else notifyError("Error deleting from watch list!");
                    });
                    console.log("watchlist");
                  }}
                  size={16}
                  className={`hover:text-red-300 text-red-300 `}
                  fill={`#FCA5A5`}
                />
              ) : (
                <Heart
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isAuthenticated) {
                      notifyInfo("Login to perfrom actions!");
                      return navigate("/sign-in");
                    }
                    dispatch(asyncAddWatchList(car._id)).then((res) => {
                      if (res == 200) notifySuccess("Added to watch list!");
                      else notifyError("Error adding to watch list!");
                    });
                    console.log("not watchlist");
                  }}
                  size={16}
                  className={`hover:text-red-300  text-black`}
                  fill="white"
                />
              )
            ) : (
              ""
            )}
          </div>
        )}
        <div className=" flex items-center justify-center relative">
          <img
            src={car?.image?.main?.url || Car_img}
            alt="car image"
            className="aspect-auto w-full h-full "
          />
          {car?.sold && (
            <div className="w-full h-full absolute bg-[rgba(100,0,0,.3)] flex items-center justify-center text-white text-lg">
              SOLD
            </div>
          )}
        </div>
        <h1 className=" text-lg font-semibold text-black mt-2">
          {car?.name} {car?.model}
        </h1>
        <p className=" text-sm font-semibold mt-1 -ml-1">
          ⭐ {car?.rating}
          <span className="text-[#808080] font-medium">
            ({car?.review?.length || 0} reviews){" "}
          </span>
        </p>
        <div className=" grid grid-cols-2 gap-x-14 mt-3 border-b-[1px] border-[#E0E0E0] pb-2">
          {[
            {
              icon: User_icon,
              content: `${car?.capacity} Passengers`,
            },
            {
              icon: Type_icon,
              content: car?.transmission || "NA",
            },
            {
              icon: Conditioner_icon,
              content: car?.air_conditioner ? "AC" : "Non Ac",
            },
            {
              icon: Door_icon,
              content: `${car?.door || 0} Doors`,
            },
          ].map((info, index) => (
            <div key={index} className=" flex items-center gap-2 mb-3">
              <img src={info.icon} alt="" />
              <span className=" text-sm font-normal text-[#959595] text-nowrap">
                {info.content}
              </span>
            </div>
          ))}
        </div>

        <div className=" flex items-center justify-between mt-3">
          <span className=" text-sm text-[#595959] font-medium">Price</span>
          <span className=" text-base font-semibold">
            ₹ {car?.price.toLocaleString("en-IN")}
          </span>
        </div>

        {userType != "Dealer" && buy && (
          <button
            onClick={handleBuyNow}
            className="bg-[#1572D3] w-full py-2 text-white rounded-lg mt-3"
          >
            Buy Now
          </button>
        )}
      </div>
      {/* </Link> */}
    </>
  );
};

export default Card;
