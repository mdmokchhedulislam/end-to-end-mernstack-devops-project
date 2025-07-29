/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, useCurrentUser } from "../redux/features/auth/authSlice";
import type { TBook } from "../pages/Dashboard/ProductManagement/AllProducts";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { removeFromCart } from "../redux/features/Cart/CartSlice";
import { useAddOrderMutation } from "../redux/features/OrderManagement/orderApi";
import { useGetAllBookDataQuery } from "../redux/features/productManagement/productApi";
import { toast } from "sonner";
import ConfirmDeleteToast from "./Shared/ConfirmDeleteToast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const [addOrder] = useAddOrderMutation();

  const { data } = useGetAllBookDataQuery(undefined);

  const allBooks = data?.data;
  const availlableBooks = allBooks?.filter(
    (book: TBook) => book.numberOfBooks > 0
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const products: TBook[] = useSelector((state: any) => state.cart.products);

  const handleMakePayment = async (item: TBook, index: any) => {
    try {
      toast.loading("Processing your payment. Please wait...", {
        duration: 2000,
      });
      const productInfo = {
        productId: item._id,
        userInfo: {
          ...user,
        },
      };

      const result = await addOrder(productInfo).unwrap();

      window.location.replace(result.url);
      dispatch(removeFromCart(index));
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <>
      {/* Responsive Navbar */}
      <nav className="sticky top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            {/* Brand - Responsive */}
            <Link
              to="/"
              className="group flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-bold text-sm sm:text-lg lg:text-xl">
                    B
                  </span>
                </div>
               
              </div>
              <div className="min-w-0">
                <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent truncate block">
                  BookBazzar
                </span>
                <div className="text-xs text-gray-400 font-medium hidden sm:block lg:text-sm">
                  Your Reading Paradise
                </div>
              </div>
            </Link>

            {/* Desktop Menu - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              <div className="flex items-center space-x-1 bg-gray-800/80 backdrop-blur-sm rounded-full p-1 sm:p-2 border border-gray-600/50">
                <Link
                  to="/"
                  className="px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 text-sm sm:text-base text-white font-semibold rounded-full hover:bg-gradient-to-r hover:from-purple-500/40 hover:to-blue-500/40 transition-all duration-300 relative group"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </Link>
                <Link
                  to="/all-product"
                  className="px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 text-sm sm:text-base text-white font-semibold rounded-full hover:bg-gradient-to-r hover:from-purple-500/40 hover:to-blue-500/40 transition-all duration-300 relative group"
                >
                  <span className="relative z-10">Books</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </Link>
                <Link
                  to="/contact"
                  className="px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 text-sm sm:text-base text-white font-semibold rounded-full hover:bg-gradient-to-r hover:from-purple-500/40 hover:to-blue-500/40 transition-all duration-300 relative group"
                >
                  <span className="relative z-10">Contact Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </Link>
              </div>

              {!user && (
                <Link
                  to="/login"
                  className="ml-2 lg:ml-4 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-500/30"
                >
                  Login
                </Link>
              )}
            </div>

            {/* User Section - Desktop */}
            {user && (
              <div className="hidden lg:flex items-center space-x-2 lg:space-x-4">
                {/* Cart Button */}
                <button
                  onClick={toggleCartModal}
                  className="relative group"
                  aria-label="Shopping Cart"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gray-800/80 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-gray-600/50 flex items-center justify-center hover:bg-gray-700/80 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                    <FaShoppingCart className="text-sm sm:text-lg lg:text-xl text-white group-hover:text-purple-300" />
                  </div>
                  {products.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs sm:text-sm font-bold">
                        {products.length}
                      </span>
                    </div>
                  )}
                </button>

                {/* User Avatar */}
                <div className="relative">
                  <div
                    className="flex items-center space-x-2 lg:space-x-3 bg-gray-800/80 backdrop-blur-sm rounded-xl lg:rounded-2xl px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 border border-gray-600/50 cursor-pointer hover:bg-gray-700/80 transition-all duration-300 group"
                    onClick={toggleDropdown}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={user?.imageUrl || "/placeholder.svg"}
                        alt="User Avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl border-2 border-purple-500/50 group-hover:border-purple-400 transition-colors object-cover"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    </div>
                    <div className="hidden xl:block min-w-0">
                      <div className="text-white font-semibold group-hover:text-purple-300 transition-colors text-sm lg:text-base truncate">
                        {user?.name || "User"}
                      </div>
                      <div className="text-gray-400 text-xs lg:text-sm capitalize truncate">
                        {user?.role}
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 lg:w-5 lg:h-5 text-white transition-transform duration-300 flex-shrink-0 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Enhanced Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 lg:mt-4 w-80 bg-gray-800/95 backdrop-blur-xl border border-gray-600/50 rounded-2xl lg:rounded-3xl shadow-2xl z-20 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-600/50">
                          <img
                            src={user?.imageUrl || "/placeholder.svg"}
                            alt="User Avatar"
                            className="w-16 h-16 rounded-2xl border-2 border-purple-500/50 object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-white font-bold text-lg truncate">
                              {user?.name || "User"}
                            </div>
                            <div className="text-gray-400 text-sm truncate">
                              {user?.email}
                            </div>
                            <div className="inline-flex items-center px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 mt-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                              <span className="text-purple-400 text-xs font-medium capitalize">
                                {user?.role}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Link
                            to={`/${user.role}/dashboard`}
                            className="flex items-center gap-4 w-full px-4 py-4 text-white hover:bg-gray-700/50 rounded-xl transition-all duration-300 group"
                          >
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold group-hover:text-purple-300 transition-colors">
                                Dashboard
                              </div>
                              <div className="text-gray-400 text-sm">
                                Manage your account
                              </div>
                            </div>
                            <svg
                              className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-4 w-full px-4 py-4 text-white hover:bg-red-500/20 rounded-xl transition-all duration-300 group"
                          >
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                              <div className="font-semibold group-hover:text-red-300 transition-colors">
                                Logout
                              </div>
                              <div className="text-gray-400 text-sm">
                                Sign out of your account
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu Button and Cart */}
            <div className="flex items-center space-x-2 lg:hidden">
              {/* Mobile Cart Button */}
              {user && (
                <button
                  onClick={toggleCartModal}
                  className="relative group"
                  aria-label="Shopping Cart"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-600/50 flex items-center justify-center hover:bg-gray-700/80 transition-all duration-300">
                    <FaShoppingCart className="text-lg text-white" />
                  </div>
                  {products.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">
                        {products.length}
                      </span>
                    </div>
                  )}
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-600/50 text-white hover:bg-gray-700/80 transition-all duration-300 flex items-center justify-center"
                aria-label="Toggle Menu"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 sm:w-6 rounded-sm ${
                      isMenuOpen
                        ? "rotate-45 translate-y-1"
                        : "-translate-y-0.5"
                    }`}
                  ></span>
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 sm:w-6 rounded-sm my-0.5 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 sm:w-6 rounded-sm ${
                      isMenuOpen
                        ? "-rotate-45 -translate-y-1"
                        : "translate-y-0.5"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800/95 backdrop-blur-xl border-t border-gray-600/50">
            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 sm:px-4 sm:py-4 text-white font-semibold rounded-xl hover:bg-gray-700/50 transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="text-base sm:text-lg">Home</span>
              </Link>

              <Link
                to="/all-product"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 sm:px-4 sm:py-4 text-white font-semibold rounded-xl hover:bg-gray-700/50 transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-base sm:text-lg">All Products</span>
              </Link>

              <Link
                to="/about-us"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 sm:px-4 sm:py-4 text-white font-semibold rounded-xl hover:bg-gray-700/50 transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-base sm:text-lg">About Us</span>
              </Link>

              {!user && (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mx-2 sm:mx-4 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl sm:rounded-2xl text-center hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl text-base sm:text-lg"
                >
                  Login
                </Link>
              )}

              {user && (
                <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-gray-600/50">
                  <Link
                    to={`/${user.role}/dashboard`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 sm:px-4 sm:py-4 text-white font-semibold rounded-xl hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    <span className="text-base sm:text-lg">Dashboard</span>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-3 py-3 sm:px-4 sm:py-4 text-white font-semibold rounded-xl hover:bg-red-500/20 transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base sm:text-lg">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Modal */}
      {isCartModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center py-4">
          <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white rounded-lg shadow-xl w-full md:max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-600">
              <h2 className="text-2xl font-bold text-[#FFD700]">
                Shopping Cart
              </h2>
              <button
                onClick={toggleCartModal}
                className="text-2xl hover:text-[#FFD700] transition-colors duration-200"
                aria-label="Close Cart"
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] ">
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((item, index) => {
                    const isAvailable = availlableBooks?.some(
                      (book: TBook) => book._id === item._id
                    );

                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-3 bg-gradient-to-r from-[#2B1E36] to-[#3B2E46] rounded-lg"
                      >
                        <img
                          src={item?.imageUrl || "/placeholder.svg"}
                          alt={item.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">
                            {item.title}
                          </h3>
                          <p className="text-[#FFD700] font-bold">
                            ৳ {item.price}
                          </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          {/* Conditional Button */}
                          {isAvailable ? (
                            <button
                              onClick={() => handleMakePayment(item, index)}
                              className="text-black px-3 py-1 rounded font-semibold lg:text-3xl text-2xl"
                              title="Make Payment"
                            >
                              <FaShoppingCart className="text-blue-500" />
                            </button>
                          ) : (
                            <button
                              className="text-white px-3 py-1 rounded font-semibold lg:text-sm text-xs bg-gray-500 cursor-not-allowed"
                              title="Out of Stock"
                              disabled
                            >
                              Out of Stock
                            </button>
                          )}

                          {/* Delete Button */}
                          {/* <button
                            onClick={() => {
                              dispatch(removeFromCart(index))
                              toast.success("Book Remove Successfully..")
                            }}
                            className="text-red-400 transition-colors duration-200 flex justify-center lg:text-3xl text-2xl"
                          >
                            <MdDelete />
                          </button> */}
                          <button
                            onClick={() => setConfirmIndex(index)}
                            className="text-red-400 transition-colors duration-200 flex justify-center lg:text-3xl text-2xl"
                          >
                            <MdDelete />
                          </button>
                          {confirmIndex !== null && (
                            <ConfirmDeleteToast
                              onConfirm={() => {
                                dispatch(removeFromCart(confirmIndex));
                                setConfirmIndex(null);
                                toast.success("Book removed successfully.");
                              }}
                              onCancel={() => setConfirmIndex(null)}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {products.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-600">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-[#FFD700]">
                      $
                      {products
                        .reduce(
                          (total, item) =>
                            total + Number.parseFloat(item.price),
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
