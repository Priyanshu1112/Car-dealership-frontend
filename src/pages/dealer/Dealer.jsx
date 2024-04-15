import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import Bargains from "../../pages/dealer/Bargains";
import DealHistory from "../../pages/dealer/DealHistory";
import MyCars from "../../pages/dealer/MyCars";
import DashboardLayout from "../../components/DashboardLayout";

import AddCar from "./AddCar";
import EditCar from "./EditCar";
import CarDetail from "./CarDetailDealer";
import { useMediaQuery } from "@mui/material";

const Dealer = () => {
  const isMobile = useMediaQuery("(min-width:768px)");

  return (
    <>
      {!isMobile ? (
        <div className="absolute top-0 left-0 h-screen text-center px-2 w-screen z-[100] bg-white flex justify-center items-center">
          Dealer Screen is better on screens &gt; 768px
        </div>
      ) : (
        <DashboardLayout>
          <div className="flex-1 ml-6">
            <Header />
            {/* <span
          className="flex text-red-500 cursor-pointer gap-2"
          onClick={() => dispatch(asyncLogOut())}
        >
          <LogOut /> Log out
        </span> */}
            <Routes>
              <Route
                index
                path="/"
                element={<Navigate to="deal-history" replace />}
              />
              <Route path="/deal-history" element={<DealHistory />} />
              <Route path="/bargains" element={<Bargains />} />
              <Route path="/my-cars" element={<MyCars />} />
              <Route path="/add-car" element={<AddCar />} />
              <Route path="/edit-car" element={<EditCar />} />
              <Route path="/car-detail" element={<CarDetail />} />
            </Routes>
          </div>
        </DashboardLayout>
      )}
    </>
  );
};

export default Dealer;
