import { useState } from "react";
import { CarCapacity, CarTypes } from "../../constants";
import Card from "../components/Card";

const Deals = () => {
  const [type, setType] = useState(() => CarTypes.map(() => false));
  const [capacity, setCapacity] = useState(() => CarCapacity.map(() => false));

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

  return (
    <div className="relative">
      <div className=" container px-10">
        {/* <h1 className=" text-[38px] font-medium text-black text-center">
        Most popular cars deals
      </h1> */}

        <div className="flex items-start justify-between gap-5">
          <div className=" sticky top-0 left-0 bg-white shadow-md w-[20%]  min-h-fit flex flex-col px-6 py-4 mt-4 rounded-2xl mb-20">
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

          <div className="">
            <div className="grid grid-cols-3 gap-7 mt-4">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, index) => (
                <Card key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
