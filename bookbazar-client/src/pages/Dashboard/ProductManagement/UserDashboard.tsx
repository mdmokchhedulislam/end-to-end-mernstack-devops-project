
import { useState } from "react"
import { Link, } from "react-router-dom"
import { useAppSelector } from "../../../redux/hooks"
import {  useCurrentUser } from "../../../redux/features/auth/authSlice"
import { useGetUserOrdersDataQuery } from "../../../redux/features/OrderManagement/orderApi"
import { ScaleLoader } from "react-spinners"
import type { TOrder } from "../../../types/TOrder"
import { Pagination } from "../../../components/Shared/Pagination"

const itemsPerPage = 7

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const user = useAppSelector(useCurrentUser)



  const { data, isLoading } = useGetUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <ScaleLoader color="#1ca944" />
      </div>
    )
  }

  const orderData = data?.data || []
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = orderData.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(orderData.length / itemsPerPage)

  const priceData = orderData?.map((item: TOrder) => Number(item?.product?.price))
  const totalPrice = priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0

  // Calculate order statistics
  const acceptedOrders = orderData?.filter((order: TOrder) => order.orderStatus === "accepted").length || 0
  const pendingOrders = orderData?.filter((order: TOrder) => order.orderStatus === "pending").length || 0

  const date = new Date()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const currentMonth = monthNames[date.getMonth()]
  const currentYear = date.getFullYear()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white">
      <div className="container mx-auto p-4 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">My Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user?.name}</p>
            </div>

           
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Spent</h3>
                <p className="text-2xl lg:text-3xl font-bold mt-2">৳{totalPrice.toLocaleString()}</p>
                <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mt-3 rounded-full w-3/4"></div>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Orders</h3>
                <p className="text-2xl lg:text-3xl font-bold mt-2">{orderData.length}</p>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mt-3 rounded-full w-1/2"></div>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Completed</h3>
                <p className="text-2xl lg:text-3xl font-bold mt-2">{acceptedOrders}</p>
                <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 mt-3 rounded-full w-2/3"></div>
              </div>
              <div className="bg-green-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Pending</h3>
                <p className="text-2xl lg:text-3xl font-bold mt-2">{pendingOrders}</p>
                <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 mt-3 rounded-full w-1/4"></div>
              </div>
              <div className="bg-amber-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">My Orders</h2>
              <p className="text-gray-400 text-sm mt-1">
                {currentMonth} {currentYear} • {orderData.length} total orders
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-400">Completed: {acceptedOrders}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-gray-400">Pending: {pendingOrders}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Order ID</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Book</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Author</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Price</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders?.map((item: TOrder) => (
                  <tr key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-sm font-mono bg-white/10 px-2 py-1 rounded text-purple-300">
                        {item._id.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product?.imageUrl || "/placeholder.svg?height=40&width=40"}
                          alt={item.product?.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{item.product?.title}</p>
                          <p className="text-xs text-gray-400">{item.product?.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-white">{item.product?.authorName}</p>
                        <p className="text-xs text-gray-400">{item.product?.authorEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-bold text-green-400">৳{item.product?.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.orderStatus === "accepted"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            item.orderStatus === "accepted" ? "bg-green-400" : "bg-amber-400"
                          }`}
                        ></div>
                        {item.orderStatus === "accepted" ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedOrders.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-400 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-4">Start shopping to see your orders here.</p>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Start Shopping
              </Link>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
