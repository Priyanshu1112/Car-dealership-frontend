import HomePage from "./pages/HomePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import SignInDealer from "./pages/auth/SignInDealer";
import SignInBuyer from "./pages/auth/SignInBuyer";
import SignUpDealer from "./pages/auth/SignUpDealer";
import SignUpBuyer from "./pages/auth/SignUpBuyer";
import Deals from "./pages/Deals";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
// import Dealer from "./pages/dealer/Dealer";
import { useEffect } from "react";
import Dealer from "./pages/dealer/Dealer";
import {
  notifyErrorPromise,
  notifyPendingPromise,
  notifySuccessPromise,
} from "./utils/Toast";
import { asyncCurrentUser } from "./store/actions/appActions";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, userType } = useSelector((state) => state.app);

  useEffect(() => {
    !isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    let id;
    if (
      !isAuthenticated &&
      (localStorage.getItem("accessToken") ||
        localStorage.getItem("refreshToken"))
    ) {
      id = notifyPendingPromise("Fetching Current User...");
      dispatch(asyncCurrentUser()).then((res) => {
        if (res.status == 200) {
          notifySuccessPromise(id, `${res.userType} fetched successfully!`);
        } else {
          console.log(res.message);
          notifyErrorPromise(id, res.message);
        }
      });
    }

    if (userType == "Admin") navigate("/admin");
    if (userType == "Dealer") navigate("/dealer");
    if (userType == "Buyer") navigate("/buyer");
    if (userType == null) navigate("/");
  }, [userType]);

  return (
    <div>
      {userType != "Dealer" && <Navbar />}
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/login-dealer" element={<SignInDealer />} />
        <Route path="/register-dealer" element={<SignUpDealer />} />
        <Route path="/sign-in" element={<SignInBuyer />} />
        <Route path="/sign-up" element={<SignUpBuyer />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/dealer/*" element={<Dealer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
