import { Link } from "react-router-dom";
import image from "./Failed.png";
const PaymentFailed = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <img src={image} alt="" className="h-[400px]" />
      </div>
      <div className="text-center mt-10">
        <Link
          to={"/"}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
