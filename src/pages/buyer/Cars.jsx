import { useEffect, useState } from "react";
import { CarCapacity, CarTypes } from "../../../constants";
import Card from "../../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { asyncGetAllCars } from "../../store/actions/carActions";
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "../../utils/Toast";
import Pagination from "../../components/Pagination";

const Cars = () => {
  const [type, setType] = useState(() => CarTypes.map(() => false));
  const [capacity, setCapacity] = useState(() => CarCapacity.map(() => false));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allCars } = useSelector((state) => state.app);

  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [page, setPage] = useState(searchParams.get("page") || 1);

  useEffect(() => {
    const filteredTypes = CarTypes.filter((_, index) => type[index]);
    const filteredCapacities = CarCapacity.filter(
      (_, index) => capacity[index]
    );

    // console.log("Selected Types:", filteredTypes);
    // console.log("Selected Capacities:", filteredCapacities);

    let queryParams = `?page=${page}`;

    if (filteredTypes.length > 0) {
      queryParams += `&type=${filteredTypes.join(",")}`;
    }

    if (filteredCapacities.length > 0) {
      queryParams += `&capacities=${filteredCapacities.join(",")}`;
    }

    navigate(pathname + queryParams);

    dispatch(asyncGetAllCars(queryParams.slice(1)));
  }, [type, capacity]);

  const handleTypeCheckbox = (index) => {
    setType((prevTypes) => {
      const newTypes = [...prevTypes];
      newTypes[index] = !newTypes[index];
      return newTypes;
    });
  };

  const handleCapacityCheckbox = (index) => {
    setCapacity((prevTypes) => {
      const newTypes = [...prevTypes];
      newTypes[index] = !newTypes[index];
      return newTypes;
    });
  };

  useEffect(() => {
    navigate(`${pathname}?page=${page}`);

    dispatch(asyncGetAllCars(page)).then((res) => {
      if (res == 200) console.log("successfully fetched all cars");
      else notifyError(res.message);
    });
  }, [page]);

  return (
    <div className="relative">
      <div className=" container bg-gray-100 px-10 pb-4">
        {/* <h1 className=" text-[38px] font-medium text-black text-center">
        Most popular cars cars
      </h1> */}
        <div className="flex items-start justify-between gap-5">
          <div className=" bg-white w-[20%] h-screen flex flex-col px-6 py-4 mt-4 rounded-2xl">
            {/* TYPE */}
            <div className="flex flex-col">
              <span className="text-black  font-semibold text-xl mb-3">
                Type
              </span>
              {CarTypes.map((val, index) => {
                return (
                  <span
                    className="cursor-pointer flex gap-2 mb-3 text-base font-medium"
                    onClick={() => handleTypeCheckbox(index)}
                    key={index}
                  >
                    <input
                      type="checkbox"
                      onChange={() => handleTypeCheckbox(index)}
                      checked={type[index]}
                      className="cursor-pointer"
                    />
                    {val}
                  </span>
                );
              })}
            </div>
            {/* CAPACITY */}
            <div className="flex flex-col">
              <span className="  font-semibold text-xl text-black mt-5 mb-3 capitalize">
                Capacity
              </span>
              {CarCapacity.map((val, index) => {
                return (
                  <span
                    className="cursor-pointer flex gap-2 mb-3 text-base font-medium"
                    onClick={() => handleCapacityCheckbox(index)}
                    key={index}
                  >
                    <input
                      type="checkbox"
                      onChange={() => handleCapacityCheckbox(index)}
                      checked={capacity[index]}
                      className="cursor-pointer p-1"
                    />
                    {val}
                  </span>
                );
              })}
            </div>
            {/* PRICE */}
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm mt-5 mb-3">PRICE</span>
            </div>
          </div>

          <div
            id="car-container"
            className=" overflow-y-scroll h-screen pb-5 no-scrollbar"
          >
            <div className="grid grid-cols-3 gap-7 mt-4">
              {allCars?.map((car, index) => {
                if (car.sold) return;
                return <Card key={index} car={car} />;
              })}
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          items={allCars?.length}
          showItems={20}
        />
      </div>
    </div>
  );
};

export default Cars;
