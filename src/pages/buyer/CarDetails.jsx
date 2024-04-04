import {
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Heart,
  LoaderCircle,
} from "lucide-react";
import Car_img from "/assets/image/car_img1.png";
import User_icon from "/assets/icon/user_icon.svg";
import Type_icon from "/assets/icon/type_icon.svg";
import Conditioner_icon from "/assets/icon/conditioner_icon.svg";
import Door_icon from "/assets/icon/door_icon.svg";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import AddReview from "../../components/AddReview";
import {
  asyncAddWatchList,
  asyncDeleteReview,
  asyncDeleteWatchList,
  asyncMakePayment,
  asyncVerifyPayment,
} from "../../store/actions/carActions";
import {
  notifyError,
  notifyErrorPromise,
  notifyInfo,
  notifyPendingPromise,
  notifySuccess,
  notifySuccessPromise,
} from "../../utils/Toast";
import { getSocket } from "../../utils/Socket";
import { addChat, updateSelectedChat } from "../../store/reducers/appReducer";
import useRazorpay from "react-razorpay";

const CarDetail = () => {
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, selectedCar, userType, isAuthenticated, allCars, watchList } =
    useSelector((state) => state.app);

  var socket = useRef(null);

  useEffect(() => {
    socket.current = getSocket();

    socket.current?.on("chat-created", (res) => {
      console.log(res);
      if (res.status == 200 || res.status == 201) {
        dispatch(addChat(res.chat));
        dispatch(updateSelectedChat(res.chat));
      } else {
        console.log(res);
        notifyError(res.message);
      }
    });
  }, []);

  const [activeImage, setActiveImage] = useState(0);
  const [index, setIndex] = useState(-1);

  let images = [
    selectedCar?.image?.main?.url || Car_img,
    selectedCar?.image?.secondary?.url || Car_img,
    selectedCar?.image?.tertiary?.url || Car_img,
  ];

  const handleLeft = () => {
    if (activeImage == 0) setActiveImage(2);
    else setActiveImage(activeImage - 1);
  };

  const handleRight = () => {
    if (activeImage == 2) setActiveImage(0);
    else setActiveImage(activeImage + 1);
  };

  const handleBargain = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      notifyInfo("Login to perform actions!");
      return navigate("/sign-in");
    }
    const data = {
      buyer_id: user._id,
      dealer_id: selectedCar.dealer_id._id,
      car_id: selectedCar._id,
      chat_name_buyer: `${selectedCar.name}(${selectedCar.model})`,
      chat_name_dealer: user.user_name,
    };
    const index = user.chat.findIndex(
      (chat) => chat.car_id._id == selectedCar._id
    );

    console.log({ index });

    if (index == -1) {
      return socket.emit("create-chat", data);
    }
    dispatch(updateSelectedChat(user.chat[index]));
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      notifyInfo("Login to perfrom actions!");
      return navigate("/sign-in");
    }
    const id = notifyPendingPromise("Opening Payment Page...");
    console.log("buy now");
    // const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
    const res = await dispatch(asyncMakePayment(selectedCar?._id, user?._id));
    console.log({ res });
    // const result = stripe.redirectToCheckout({ sessionId: res.data.id });
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "CARMAX", //your business name
      description: "Test Transaction",
      image: selectedCar?.image?.main?.url,
      order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        dispatch(asyncVerifyPayment(response, selectedCar?._id)).then((res) => {
          if (res == 200) navigate("/buyer/my-cars");
          else notifyError(res.message);
        });
        console.log({ response });
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: user?.user_name, //your customer's name
        email: user?.email,
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#1572D3",
      },
    };
    const razor = new Razorpay(options);
    razor.open();
    notifySuccessPromise(id, "Opened successfully!");
  };

  useEffect(() => {
    const scrollToTop = () => {
      const scrollStep = -window.scrollY / (500 / 30); // adjust duration as needed
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15); // scroll every 15 milliseconds
    };

    scrollToTop();

    const getIndex = selectedCar?.bargained?.findIndex(
      (bargain) => bargain.id === user?._id
    );

    console.log({ getIndex });

    setIndex(getIndex);
  }, [selectedCar]);

  const [buyPrice, setBuyPrice] = useState("");
  useEffect(() => {
    let buyIndex = selectedCar?.bargained?.findIndex(
      (bargain) => bargain.id === user?._id
    );

    const price =
      buyIndex != -1
        ? selectedCar?.bargained[buyIndex]?.price
        : selectedCar?.price;

    setBuyPrice(price);
  }, []);

  return (
    <>
      {selectedCar ? (
        <div id="container" className=" container">
          <div className="overflow-hidden mt-8">
            <div className="mb-9">
              <div className=" grid grid-cols-2 items-start gap-2">
                <div className="items-center justify-center h-full overflow-hidden md:mb-8 lg:mb-0 xl:flex">
                  <div className="w-full gap-2 xl:flex xl:flex-row-reverse">
                    <div className=" relative">
                      <div className="relative flex items-center justify-center">
                        <img
                          alt="active image"
                          src={images[activeImage]}
                          width={650}
                          height={590}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                        <ChevronLeft
                          onClick={handleLeft}
                          className="text-white bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)] rounded-full transition-all cursor-pointer "
                        />
                        <ChevronRight
                          onClick={handleRight}
                          className="text-white transition-all cursor-pointer rounded-full bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.7)]"
                        />
                      </div>
                    </div>
                    <div className=" flex flex-col gap-4">
                      {images.map((image, index) => (
                        <div
                          key={image}
                          className={`  flex cursor-pointer items-center  justify-center overflow-hidden rounded border-4 transition hover:opacity-75 ${
                            activeImage == index && "border-red-500"
                          }`}
                        >
                          <img
                            alt={`Product ${index}`}
                            onClick={() => setActiveImage(index)}
                            src={image}
                            decoding="async"
                            loading="lazy"
                            className=" h-full w-28 object-cover aspect-square rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col bg-white h-full rounded-xl px-6 pr-10">
                  <div className="flex items-start justify-between ">
                    <div className="pb-3">
                      <h2 className="text-[32px] font-semibold">
                        {selectedCar.name} {selectedCar.model}
                      </h2>
                      <p className="mt-1 text-sm font-normal flex items-center gap-2">
                        <Rating
                          readOnly
                          value={selectedCar?.rating || 0}
                          precision={0.1}
                        />
                        <span className=" text-[#596780]">
                          ({selectedCar?.rating})
                        </span>
                        <span className=" text-[#596780]">
                          {selectedCar?.review?.length || 0} Reviewer
                        </span>
                      </p>
                      <p className="mt-1 text-[#596780] text-sm font-normal capitalize">
                        Dealer : {selectedCar?.dealer_id.user_name}
                      </p>
                    </div>
                    <div className="p-2 bg-white shadow-md cursor-pointer rounded-full">
                      {!watchList?.includes(selectedCar?._id) ? (
                        <Heart
                          fill="#fff"
                          className=" text-gray-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isAuthenticated) {
                              notifyInfo("Login to perfrom actions!");
                              return navigate("/sign-in");
                            }
                            dispatch(asyncAddWatchList(selectedCar?._id)).then(
                              (res) => {
                                if (res == 200)
                                  notifySuccess("Added to watch list!");
                                else notifyError("Error adding to watch list!");
                              }
                            );
                          }}
                        />
                      ) : (
                        <Heart
                          fill="#ED3F3F"
                          className=" text-[#ED3F3F]"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              asyncDeleteWatchList(selectedCar?._id)
                            ).then((res) => {
                              if (res == 200)
                                notifySuccess("Deleted from watch list!");
                              else
                                notifyError("Error deleting from watch list!");
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <p className=" text-base text-[#596780] font-normal w-[70%] leading-7">
                    {selectedCar.description
                      ? selectedCar.description
                      : "No description!"}
                  </p>
                  <div className=" grid grid-cols-2 w-1/2 gap-x-10 pb-2 mt-2">
                    {[
                      {
                        icon: User_icon,
                        content: `${selectedCar.capacity} Passengers`,
                      },
                      {
                        icon: Type_icon,
                        content: selectedCar.transmission || "NA",
                      },
                      {
                        icon: Conditioner_icon,
                        content: selectedCar.air_conditioner ? "AC" : "Non Ac",
                      },
                      {
                        icon: Door_icon,
                        content: `${selectedCar.door || "NA"} Doors`,
                      },
                    ].map((info, index) => (
                      <div key={index} className="flex items-center gap-2 mt-3">
                        <img src={info.icon} alt="" />
                        {/* <span className=" text-sm font-normal text-[#959595] text-nowrap">
                      {info.title}
                    </span> */}
                        <span className=" text-sm font-normal text-[#959595] text-nowrap">
                          {info.content}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className=" flex items-center justify-between">
                    {!selectedCar?.sold && (
                      <div className="  mt-2 flex flex-col">
                        {index != -1 &&
                        selectedCar.bargained[index]?.price != -1 ? (
                          <div className="flex flex-col items-center">
                            <span className=" text-[22px] font-semibold">
                              ₹{" "}
                              {selectedCar.bargained[
                                index
                              ]?.price?.toLocaleString("en-In")}
                            </span>
                            <span className=" text-[14px] line-through ">
                              ₹ {selectedCar.price.toLocaleString("en-In")}
                            </span>
                          </div>
                        ) : (
                          <span className=" text-[22px] font-semibold">
                            ₹ {selectedCar.price.toLocaleString("en-In")}
                          </span>
                        )}
                      </div>
                    )}

                    {selectedCar?.buyer_id != user?._id ? (
                      <div className="flex gap-2">
                        {" "}
                        <button
                          onClick={handleBargain}
                          className="border border-black text-black w-fit px-10 py-2 transition-all hover:text-white hover:bg-black  rounded-lg mt-3"
                        >
                          Bargain
                        </button>
                        <button
                          onClick={handleBuyNow}
                          className="bg-[#1572D3] hover:bg-blue-500 transition-all w-fit px-10 py-2 text-white rounded-lg mt-3"
                        >
                          Buy Now
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-700 text-lg mt-5">
                        Bought At : ₹ {buyPrice?.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* REVIEW */}
          <div
            id="car-container"
            className="w-[90%]  max-h-[40vh] overflow-y-auto mx-auto mb-20 border bg-gray-100 text-gray-700 font-semibold text-lg rounded-lg p-3 pt-0"
          >
            <h3 className="sticky pt-1 top-0 bg-gray-100">Reviews</h3>
            {selectedCar?.review != 0 ? (
              selectedCar?.review.map((review) => {
                // console.log({ review });
                return (
                  <div
                    className="text-base mt-1 mb-2 bg-white rounded-lg p-2 font-normal"
                    key={review?._id}
                  >
                    <div className="flex items-center gap-1">
                      {" "}
                      <CircleUser size={16} />
                      <p className="capitalize flex-[.1]">
                        {review?.buyer_id?.user_name}
                      </p>
                      {review?.buyer_id?._id == user?._id && (
                        <p
                          onClick={() => {
                            const id =
                              notifyPendingPromise("Deleting Review...");
                            dispatch(asyncDeleteReview(review._id)).then(
                              (res) => {
                                if (res == 200)
                                  notifySuccessPromise(
                                    id,
                                    "Review deleted successfully!"
                                  );
                                else notifyErrorPromise(id, res.message);
                              }
                            );
                          }}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-50 hover:text-red-500 hover:scale-105 transition-all rounded-md cursor-pointer text-xs bg-gray-100 uppercase"
                        >
                          delete
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="my-1 flex-[0.1] ">⭐ {review.rating}</p>
                      <p
                        className={`text-sm flex-[0.9] ${
                          !review.comment && "text-gray-400"
                        }`}
                      >
                        {review.comment || "No comments"}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-400 text-center py-5">
                No Review
              </p>
            )}
          </div>

          {/*Add REVIEW */}
          <AddReview />

          {/* Recent Cars */}
          <div className=" container mt-20 mb-10">
            <div className=" flex items-center justify-between">
              <h1 className=" text-xl font-medium text-black">
                {userType != "Dealer" ? "Recent Car" : "My Cars"}
              </h1>
              <h1
                onClick={() => {
                  navigate("/cars");
                }}
                className="cursor-pointer text-base font-medium text-[#3563E9] hover:underline"
              >
                View All
              </h1>
            </div>
            <div className="grid grid-cols-4 gap-7 mt-4">
              {
                // (userType !== "Dealer"
                //   ? allCars.slice(0, 5)
                //   : myCars.slice(0, 4)
                // )
                allCars
                  ?.filter((car) => car.sold != true)
                  ?.slice(0, 5)
                  ?.map((car, index) => {
                    if (car?._id == selectedCar?._id) return;

                    let watchList = false;

                    if ((user?.watch_list || []).includes(car?._id))
                      watchList = true;

                    return (
                      <Card car={car} isWishlist={watchList} key={index} />
                    );
                  })
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full p-[10vmax] flex justify-center">
          <LoaderCircle className="rotate" />
        </div>
      )}
    </>
  );
};

export default CarDetail;