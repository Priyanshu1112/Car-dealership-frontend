import Car_img from "/assets/image/car_img1.png";
import User_icon from "/assets/icon/user_icon.svg";
import Type_icon from "/assets/icon/type_icon.svg";
import Conditioner_icon from "/assets/icon/conditioner_icon.svg";
import Door_icon from "/assets/icon/door_icon.svg";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Card = ({ isWishlist }) => {
  return (
    <>
      <Link to={'/car-detail'}> 
        <div className=" bg-white shadow-xl p-5 rounded-xl relative">
          <div className=" absolute top-2 right-3 bg-slate-100 shadow-xl p-1.5 rounded-full flex items-center justify-center cursor-pointer">
            <Heart
              size={16}
              className={`hover:text-red-300 ${
                isWishlist ? "text-red-300" : " text-black"
              }`}
              fill={`${isWishlist ? "#FCA5A5" : "white"}`}
            />
          </div>
          <div className=" flex items-center justify-center">
            <img src={Car_img} alt="" className="aspect-auto w-full h-full " />
          </div>
          <h1 className=" text-lg font-semibold text-black mt-2">
            Jaguar XE L P250
          </h1>
          <p className=" text-sm font-semibold mt-1 -ml-1">
            ⭐ 4.8{" "}
            <span className="text-[#808080] font-medium">(2.436 reviews) </span>
          </p>
          <div className=" grid grid-cols-2 gap-x-14 mt-3 border-b-[1px] border-[#E0E0E0] pb-2">
            {[
              {
                icon: User_icon,
                content: "4 Passagers",
              },
              {
                icon: Type_icon,
                content: "Auto",
              },
              {
                icon: Conditioner_icon,
                content: "Air Conditioning",
              },
              {
                icon: Door_icon,
                content: "4 Doors",
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
            <span className=" text-base font-semibold">₹ 5,00,000</span>
          </div>

          <button className="bg-[#1572D3] w-full py-2 text-white rounded-lg mt-3">
            Buy Now
          </button>
        </div>
      </Link>
    </>
  );
};

export default Card;
