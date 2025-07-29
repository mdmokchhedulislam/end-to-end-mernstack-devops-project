import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddProduct from "../pages/Dashboard/ProductManagement/AddProduct";
import ManageProduct from "../pages/Dashboard/ProductManagement/ManageProduct";
import ManagingOrders from "../pages/Dashboard/ProductManagement/ManagingOrders";
import AllProducts from "../pages/Dashboard/ProductManagement/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import PaymentSuccessful from "../pages/Payment/PaymentSuccessful";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/ProductManagement/UserDashboard";
import ViewUserOrderHistory from "../pages/Dashboard/ViewUserOrderHistory";
import AboutUsPage from "../pages/AboutUsPage";
import UpdateProduct from "../pages/Dashboard/ProductManagement/UpdateProduct";
import AdminProtectedLayout from "../components/ProtectedLayouts/AdminProtectedLayout";
import UserProtectedLayout from "../components/ProtectedLayouts/UserProtectedLayout";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import ManageUsers from "../pages/UserManagement/ManageUsers";
import Home from "../pages/Home";
import ApprovedOrders from "../pages/Dashboard/ApprovedOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "/all-product",
        element: <AllProducts />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/payment-successful/:transectionId",
        element: <PaymentSuccessful />,
      },
      {
        path: "/payment-failed/:transectionId",
        element: <PaymentFailed />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <AboutUsPage />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtectedLayout>
        <Dashboard />
      </AdminProtectedLayout>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
       {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-product",
        element: <ManageProduct />,
      },
      {
        path: "manage-orders",
        element: <ManagingOrders />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
    ],
  },
  {
    path: "/user/dashboard",
    element: (
      <UserProtectedLayout>
        <Dashboard />
      </UserProtectedLayout>
    ),
   
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      
      {
        path: "view-order-history",
        element: <ViewUserOrderHistory />,
      },
      {
        path: "approved-orders",
        element: <ApprovedOrders />,
      },


      {
        path: "profile",
        element: <UserProfile />,
      },

    ],
  },
]);

export default router;
