import { useSelector } from "react-redux";
import Card from "../../components/Card";
import { useEffect } from "react";

const WatchList = () => {
  const { allCars, watchList } = useSelector((state) => state.app);

  useEffect(() => {
    document.title = "Watch List";
  }, []);

  return (
    <div className="relative">
      <div className=" container px-5 pb-4">
        {/* <h1 className=" text-[38px] font-medium text-black text-center">
        Most popular cars cars
      </h1> */}

        <div className=" py-5 no-scrollbar">
          {watchList.length ? (
            <div className="grid grid-cols-4 gap-7 mt-4">
              {allCars?.map((car, index) => {
                if (watchList.includes(car._id))
                  return <Card key={index} car={car} />;
              })}
            </div>
          ) : (
            <div className="h-[50vh] w-full  flex justify-center items-center text-2xl">
              No Cars in your WatchList!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
