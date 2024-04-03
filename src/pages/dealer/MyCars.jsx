import { Trash, Pencil, LoaderCircle } from "lucide-react";
import Car_img from "/assets/image/car_img1.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notifyError } from "../../utils/Toast";
import { asyncGetDealerCars } from "../../store/actions/carActions";
import Pagination from "../../components/Pagination";
import { updateSelectedCar } from "../../store/reducers/appReducer";
import DeleteCarDealerDialog from "../../components/DeleteCarDealerDialog";

const MyCars = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("AllCars");

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [cars, setCars] = useState(false);

  const { myCars, user } = useSelector((state) => state.app);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(searchParams.get("page") || 1);

  useEffect(() => {
    if (activeTab == "ActiveCars") {
      setCars(myCars?.filter((car) => !car.sold));
    } else if (activeTab == "Ongoing") {
      setCars(myCars?.filter((car) => car?.bargain));
    } else if (activeTab == "SoldCars") {
      setCars(myCars?.filter((car) => car.sold));
    } else {
      setCars(myCars);
    }
  }, [activeTab]);

  useEffect(() => {
    if (user) {
      dispatch(asyncGetDealerCars(user._id, page)).then((res) => {
        if (res == 200) console.log("successfully fetched dealer cars");
        else notifyError(res.message);
      });
    }
  }, [user]);

  useEffect(() => {
    navigate(`${location.pathname}?page=${page}`);

    if (user) {
      dispatch(asyncGetDealerCars(user._id, page)).then((res) => {
        if (res == 200) console.log("successfully fetched dealer cars");
        else notifyError(res.message);
      });
    }
  }, [page]);

  return (
    <div className=" container flex flex-col py-4">
      <div className="mt-7 w-full justify-between flex items-center gap-7">
        <div>
          <button
            onClick={() => setActiveTab("AllCars")}
            className={` ${
              activeTab == "AllCars" ? "bg-white font-semibold shadow-2xl" : ""
            } p-4  rounded-t-xl transition-all`}
          >
            All Cars
          </button>
          <button
            onClick={() => setActiveTab("ActiveCars")}
            className={`${
              activeTab == "ActiveCars"
                ? "bg-white font-semibold shadow-lg"
                : ""
            } p-4  rounded-t-xl transition-all`}
          >
            Active Cars
          </button>
          <button
            onClick={() => setActiveTab("Ongoing")}
            className={` ${
              activeTab == "Ongoing" ? "bg-white font-semibold shadow-2xl" : ""
            } p-4  rounded-t-xl transition-all`}
          >
            Ongoing Deals
          </button>
          <button
            onClick={() => setActiveTab("SoldCars")}
            className={` ${
              activeTab == "SoldCars" ? "bg-white font-semibold shadow-2xl" : ""
            } p-4  rounded-t-xl transition-all`}
          >
            Sold Cars
          </button>
        </div>
        <Link
          to={`/dealer/add-Car`}
          className="rounded-md bg-black px-3 py-2 text-sm  font-semibold text-white shadow-lg hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Add new car
        </Link>
      </div>

      <div
        className={`bg-white p-5 rounded-xl shadow-2xl ${
          activeTab == "AllCars" ? "rounded-ss-none" : ""
        }`}
      >
        <ul
          id="car-container"
          className="flex flex-col  divide-y divide-gray-300 mt-3"
        >
          {cars ? (
            cars.length == 0 ? (
              <div className="text-center">No Cars</div>
            ) : (
              cars.map((car) => (
                <li
                  key={car._id}
                  onClick={() => {
                    dispatch(updateSelectedCar(car));
                    navigate("/dealer/car-detail");
                  }}
                  className="flex flex-col  sm:flex-row sm:justify-between px-6 py-2 hover:bg-gray-50 hover:scale-105 transition-all cursor-pointer"
                >
                  <div className="flex w-full space-x-2 sm:space-x-4 ">
                    <div className="h-20 w-20 flex items-center justify-center border rounded-lg bg-gray-100 overflow-hidden relative">
                      <img
                        className="h-full w-full flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                        src={car.image.main?.url || Car_img}
                        alt={car.name}
                      />
                      {car?.bargain &&
                        !car?.sold &&
                        (activeTab == "AllCars" ||
                          activeTab == "ActiveCars") && (
                          <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,100,0,.3)] text-white flex items-center justify-center">
                            Bargain
                          </div>
                        )}
                      {car?.sold && activeTab == "AllCars" && (
                        <div className="absolute w-full h-full top-0 left-0 bg-[rgba(150,0,0,.3)] text-white flex items-center justify-center">
                          Sold
                        </div>
                      )}
                    </div>
                    <div className="flex w-full flex-col justify-between pb-4">
                      <div className="flex w-full justify-between space-x-2 pb-2">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                            {car.name}
                          </h3>
                          <p className="text-sm">{car.model}</p>
                          <p className="text-sm">{car.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            ₹ {car.price.toLocaleString("en-In")}
                          </p>
                        </div>
                      </div>

                      {!car?.sold && (
                        <div className="flex divide-x text-sm">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(updateSelectedCar(car));
                              setDeleteOpen(true);
                            }}
                            className="flex items-center space-x-2 px-2 py-1 pl-0 hover:text-red-400"
                          >
                            <Trash size={16} />
                            <span>Remove</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(updateSelectedCar(car));
                              navigate("/dealer/edit-Car");
                            }}
                            className="flex items-center space-x-2 px-2 py-1 hover:text-blue-400"
                          >
                            <Pencil size={16} />
                            <span>Edit</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))
            )
          ) : (
            <div className="w-full h-40vh flex items-center justify-center">
              <LoaderCircle className="rotate" />
            </div>
          )}
        </ul>
      </div>
      <Pagination page={page} setPage={setPage} items={user?.cars.length} />
      {deleteOpen && (
        <div
          onClick={() => setDeleteOpen(false)}
          className="absolute z-[100] top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,.3)]"
          style={{ top: window.scrollY + "px" }}
        >
          <DeleteCarDealerDialog setDeleteOpen={setDeleteOpen} />
        </div>
      )}
    </div>
  );
};

export default MyCars;
