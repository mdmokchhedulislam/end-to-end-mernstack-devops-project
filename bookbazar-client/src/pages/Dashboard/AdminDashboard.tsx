

"use client"

import { useState } from "react"
import {  useAppSelector } from "../../redux/hooks"
import { useCurrentUser } from "../../redux/features/auth/authSlice"
import { useGetAdminOrdersDataQuery } from "../../redux/features/OrderManagement/orderApi"
import { ScaleLoader } from "react-spinners"
import type { TOrder } from "../../types/TOrder"
import { useGetAllUserDataQuery } from "../../redux/features/auth/authApi"
import { Pagination } from "../../components/Shared/Pagination"

const itemsPerPage = 7

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1)



  const user = useAppSelector(useCurrentUser)

  const { data: usersData } = useGetAllUserDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const { data, isLoading } = useGetAdminOrdersDataQuery(user?.email, {
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

  const priceData = orderData?.map((item: TOrder) => Number(item.product.price))
  const totalPrice = priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0

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
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user?.name}</p>
            </div>

           
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Sales</h3>
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
                <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 mt-3 rounded-full w-1/2"></div>
              </div>
              <div className="bg-green-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
                <p className="text-2xl lg:text-3xl font-bold mt-2">{(usersData?.data?.length || 1) - 1}</p>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mt-3 rounded-full w-1/3"></div>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <p className="text-gray-400 text-sm mt-1">
                {currentMonth} {currentYear} • {orderData.length} total orders
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-400">Paid Orders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Transaction ID</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Book</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Customer</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Price</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders?.map((item: TOrder) => (
                  <tr key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-sm font-mono bg-white/10 px-2 py-1 rounded text-purple-300">
                        {item.transactionId.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.imageUrl || "/placeholder.svg?height=40&width=40"}
                          alt={item.product.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{item.product.title}</p>
                          <p className="text-xs text-gray-400">{item.product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-white">{item?.userInfo.name}</p>
                        <p className="text-xs text-gray-400">{item?.userInfo.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-bold text-green-400">৳{item?.product.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                        Paid
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-400 mb-2">No orders found</h3>
              <p className="text-gray-500">Orders will appear here when customers make purchases.</p>
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

export default AdminDashboard
