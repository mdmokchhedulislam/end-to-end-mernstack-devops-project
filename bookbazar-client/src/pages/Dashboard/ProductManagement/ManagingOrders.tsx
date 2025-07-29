/* eslint-disable @typescript-eslint/no-unused-vars */



"use client"

import { useState } from "react"
import { ScaleLoader } from "react-spinners"
import { useCurrentUser } from "../../../redux/features/auth/authSlice"
import {
  useAcceptOrderMutation,
  useCencelOrderMutation,
  useDeleteOrderMutation,
  useGetAdminOrdersDataQuery,
} from "../../../redux/features/OrderManagement/orderApi"
import { useAppSelector } from "../../../redux/hooks"
import type { TOrder } from "../../../types/TOrder"
import { toast } from "sonner"
import { X, Eye, Check, XCircle, Trash2, Search, Filter, ChevronDown, AlertTriangle } from "lucide-react"
import { Pagination } from "../../../components/Shared/Pagination"
const itemsPerPage = 7

const ManagingOrders = () => {
  const user = useAppSelector(useCurrentUser)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priceSort, setPriceSort] = useState("none")
  const [showFilters, setShowFilters] = useState(false)

  // Confirmation modals
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ show: boolean; orderId: string; title: string }>({
    show: false,
    orderId: "",
    title: "",
  })
  const [cancelConfirmation, setcancelConfirmation] = useState<{ show: boolean; orderId: string; title: string }>({
    show: false,
    orderId: "",
    title: "",
  })

  const { data, isLoading } = useGetAdminOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 2000,
  })
  const [acceptOrder] = useAcceptOrderMutation()
  const [cencelOrder] = useCencelOrderMutation()
  const [deleteOrder] = useDeleteOrderMutation()

  // Modal state
  const [selectedBuyer, setSelectedBuyer] = useState<TOrder | null>(null)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <ScaleLoader color="#8b5cf6" />
        <p className="mt-4 text-white/70 text-sm">Loading orders...</p>
      </div>
    )
  }

  const orderData = data?.data

  // Filter and search logic
  const filteredAndSortedOrders =
    orderData
      ?.filter((order: TOrder) => {
        // Search filter
        const matchesSearch =
          order.product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.product.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.userInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.userInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.transactionId.toLowerCase().includes(searchTerm.toLowerCase())

        // Status filter
        const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter

        return matchesSearch && matchesStatus
      })
      ?.sort((a: TOrder, b: TOrder) => {
        // Price sorting
        if (priceSort === "low-to-high") {
          return Number.parseFloat(a.product.price) - Number.parseFloat(b.product.price)
        } else if (priceSort === "high-to-low") {
          return Number.parseFloat(b.product.price) - Number.parseFloat(a.product.price)
        }
        return 0
      }) || []

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReviews = filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage)

  const handleAcceptOrder = async (id: string) => {
    const bookInfo = {
      id: id,
    }

    try {
      const result = await acceptOrder(bookInfo).unwrap()
      toast.success(result.message, {
        description: "Order has been accepted successfully",
        duration: 3000,
      })
    } catch (error) {
      toast.error("Something Went Wrong", {
        description: "Failed to accept order. Please try again.",
        duration: 3000,
      })
    }
  }

  const handleCancelClick = (id: string, title: string) => {
    setcancelConfirmation({
      show: true,
      orderId: id,
      title: title,
    })
  }

  const handleConfirmCancel = async () => {
    const bookInfo = {
      id: cancelConfirmation.orderId,
    }

    try {
      const result = await cencelOrder(bookInfo).unwrap()
      toast.success(result.message, {
        description: "Order has been canceled successfully",
        duration: 3000,
      })
      setcancelConfirmation({ show: false, orderId: "", title: "" })
    } catch (error) {
      toast.error("Something Went Wrong", {
        description: "Failed to cancel order. Please try again.",
        duration: 3000,
      })
      setcancelConfirmation({ show: false, orderId: "", title: "" })
    }
  }

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteConfirmation({
      show: true,
      orderId: id,
      title: title,
    })
  }

  const handleConfirmDelete = async () => {
    const orderInfo = {
      id: deleteConfirmation.orderId,
    }

    try {
      const result = await deleteOrder(orderInfo).unwrap()
      toast.success(result.message, {
        description: "Order has been deleted successfully",
        duration: 3000,
      })
      setDeleteConfirmation({ show: false, orderId: "", title: "" })
    } catch (error) {
      toast.error("Something Went Wrong", {
        description: "Failed to delete order. Please try again.",
        duration: 3000,
      })
      setDeleteConfirmation({ show: false, orderId: "", title: "" })
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"

    switch (status.toLowerCase()) {
      case "pending":
        return `${baseClasses} bg-yellow-500/20 text-yellow-300 border border-yellow-500/30`
      case "accepted":
        return `${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`
      case "cenceled":
        return `${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-300 border border-gray-500/30`
    }
  }

  // Get order statistics
  const getOrderStats = () => {
    const total = orderData?.length || 0
    const pending = orderData?.filter((order: TOrder) => order.orderStatus === "pending").length || 0
    const accepted = orderData?.filter((order: TOrder) => order.orderStatus === "accepted").length || 0
    const cenceled = orderData?.filter((order: TOrder) => order.orderStatus === "cenceled").length || 0

    return { total, pending, accepted, cenceled }
  }

  const stats = getOrderStats()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
      {/* Background Pattern */}
      
      
      <div className="container p-4 mx-auto sm:p-6 text-white relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold leading-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Order Management
          </h2>
          <p className="mt-2 text-gray-300">Manage and track all incoming orders</p>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-purple-500/30 transition-colors duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-sm text-gray-400">Total Orders</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-yellow-500/30 transition-colors duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.pending}</div>
                <div className="text-sm text-gray-400">Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-green-500/30 transition-colors duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.accepted}</div>
                <div className="text-sm text-gray-400">Accepted</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-red-500/30 transition-colors duration-300 hover:shadow-lg hover:shadow-red-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.cenceled}</div>
                <div className="text-sm text-gray-400">Canceled</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title, author, customer, or transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-purple-500/20"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Filter by Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all" className="bg-gray-800">
                      All Status
                    </option>
                    <option value="pending" className="bg-gray-800">
                      Pending
                    </option>
                    <option value="accepted" className="bg-gray-800">
                      Accepted
                    </option>
                    <option value="cenceled" className="bg-gray-800">
                      Canceled
                    </option>
                  </select>
                </div>

                {/* Price Sort */}
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Sort by Price</label>
                  <select
                    value={priceSort}
                    onChange={(e) => setPriceSort(e.target.value)}
                    className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="none" className="bg-gray-800">
                      No Sorting
                    </option>
                    <option value="low-to-high" className="bg-gray-800">
                      Price: Low to High
                    </option>
                    <option value="high-to-low" className="bg-gray-800">
                      Price: High to Low
                    </option>
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || statusFilter !== "all" || priceSort !== "none") && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-purple-300">Active filters:</span>
                  {searchTerm && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {statusFilter !== "all" && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                      Status: {statusFilter}
                    </span>
                  )}
                  {priceSort !== "none" && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                      Sort: {priceSort === "low-to-high" ? "Price ↑" : "Price ↓"}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setPriceSort("none")
                    }}
                    className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs hover:bg-red-500/30 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Buyer Info
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedReviews?.map((item: TOrder) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 overflow-hidden rounded-xl border-2 border-white/20 group-hover:border-purple-400/50 transition-colors duration-200">
                          <img
                            src={item?.product?.imageUrl || "/placeholder.svg"}
                            alt={item?.product?.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-200">
                            {item?.product?.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{item?.product?.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-green-400">৳ {item?.product?.price}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white font-mono bg-white/10 px-2 py-1 rounded">
                        {item?.transactionId.slice(0, 10)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(item?.orderStatus)}>{item?.orderStatus}</span>
                    </td>
                    <td className="px-6 py-4">
                      {item?.orderStatus === "pending" ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAcceptOrder(item?._id)}
                            className="inline-flex items-center px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleCancelClick(item?._id, item?.product?.title)}
                            className="inline-flex items-center px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-400 bg-gray-600/20 rounded-lg border border-gray-600/30">
                            {item?.orderStatus}
                          </span>
                          <button
                            onClick={() => handleDeleteClick(item?._id, item?.product?.title)}
                            disabled={item.orderStatus === "accepted"}
                            className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 transform shadow-lg ${
                              item.orderStatus === "accepted"
                                ? "bg-gray-400 cursor-not-allowed text-white opacity-60"
                                : "text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 hover:scale-105 hover:shadow-red-500/25"
                            }`}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="inline-flex items-center px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                        onClick={() => setSelectedBuyer(item)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>

          {filteredAndSortedOrders?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                {searchTerm || statusFilter !== "all" ? "No orders match your filters" : "No orders found"}
              </div>
              <p className="text-gray-500 text-sm mt-2">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Orders will appear here when customers make purchases"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedBuyer(null)}></div>
          <div className="relative bg-gradient-to-br from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white rounded-2xl w-full max-w-md p-6 border border-white/20 shadow-2xl transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Buyer Details
              </h3>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                onClick={() => setSelectedBuyer(null)}
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-sm text-purple-300 font-medium">Customer Name</label>
                <p className="text-white mt-1 font-medium">{selectedBuyer?.userInfo.name}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-sm text-purple-300 font-medium">Email Address</label>
                <p className="text-white mt-1 font-mono text-sm">{selectedBuyer?.userInfo.email}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-sm text-purple-300 font-medium">Transaction ID</label>
                <p className="text-white mt-1 font-mono text-sm break-all">{selectedBuyer?.transactionId}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-sm text-purple-300 font-medium">Order Status</label>
                <div className="mt-2">
                  <span className={getStatusBadge(selectedBuyer?.orderStatus)}>{selectedBuyer?.orderStatus}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedBuyer(null)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-purple-500/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelConfirmation.show && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300" />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Cancel Order</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to cancel the order for{" "}
                  <span className="font-semibold text-red-300">"{cancelConfirmation.title}"</span>? This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setcancelConfirmation({ show: false, orderId: "", title: "" })}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-200 border border-white/20"
                  >
                    No, Keep Order
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                  >
                    Yes, Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.show && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300" />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Delete Order</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to permanently delete the order for{" "}
                  <span className="font-semibold text-red-300">"{deleteConfirmation.title}"</span>? This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirmation({ show: false, orderId: "", title: "" })}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-200 border border-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ManagingOrders
