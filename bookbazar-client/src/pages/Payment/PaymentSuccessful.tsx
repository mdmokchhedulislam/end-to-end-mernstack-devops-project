import { Link } from "react-router-dom";
import image from "./Successfull.png";
import { Home, LayoutDashboard, ShoppingBag } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
const PaymentSuccessful = () => {
    const user = useAppSelector(useCurrentUser);
    console.log(user);
  
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <img src={image} alt="" className="h-[400px]" />
      </div>
      <div className="text-center mt-10">
         {/* Action Buttons */}
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link to={`/${user?.role}/dashboard`} >
              <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Go to Dashboard
              </button>
            </Link>

            <Link to="/all-product">
              <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Products
              </button>
            </Link>
          </div>

          {/* Back to Home Link */}
          <div className="mt-8 pb-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
            >
              <Home className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </div>
      </div>
    </div>
  );
};

export default PaymentSuccessful;

