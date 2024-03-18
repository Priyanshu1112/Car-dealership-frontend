import axiosInstance from "../../utils/Axios";
import { catchAsyncError } from "../../utils/CatchErrors";
import { setAccessToken } from "../../utils/Token";

export const asyncCreateCar = catchAsyncError((car) => async () => {
  const res = await axiosInstance.post("/car/create", car, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("create car---", res);
  if (res.status == 200) {
    if (res.newAccessToken) {
      setAccessToken(res.newAccessToken);
    }
  }
  return res.status;
});
