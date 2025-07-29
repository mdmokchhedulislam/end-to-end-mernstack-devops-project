
import type React from "react"
import { useState } from "react"
import { useCurrentUser } from "../../redux/features/auth/authSlice"
import { useAppSelector } from "../../redux/hooks"
import { useGetUserOrdersDataQuery } from "../../redux/features/OrderManagement/orderApi"
import { ScaleLoader } from "react-spinners"
import type { TOrder } from "../../types/TOrder"
import { X, Eye, User, ShoppingBag } from "lucide-react"
import { Pagination } from "../../components/Shared/Pagination"

const itemsPerPage = 5

const ApprovedOrders: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAuthor, setSelectedAuthor] = useState<TOrder | null>(null)

  const user = useAppSelector(useCurrentUser)
  const { data, isLoading } = useGetUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 2000,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <ScaleLoader color="#1ca944" />
      </div>
    )
  }

  // Filter only approved orders
  const approvedOrders = data?.data?.filter((order: TOrder) => order.orderStatus === "accepted") || []

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = approvedOrders.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(approvedOrders.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
      <div className="container p-4 mx-auto sm:p-6 text-white">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold leading-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Approved Orders
          </h2>
          <p className="mt-2 text-gray-300">Your successfully approved book orders</p>
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
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Price
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
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedOrders?.map((item: TOrder) => (
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
                      <div className="text-sm text-white">{item?.product?.authorName}</div>
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
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedAuthor(item)}
                        className="inline-flex items-center px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Author
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {approvedOrders?.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div className="text-gray-400 text-lg">No approved orders found</div>
              <p className="text-gray-500 text-sm mt-2">
                Your approved orders will appear here once they are processed
              </p>
            </div>
          )}
        </div>

        {/* Pagination - Always show if there are approved orders */}
        {approvedOrders?.length > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.max(1, totalPages)} // Ensure at least 1 page
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>

      {/* Author Details Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAuthor(null)}></div>
          <div className="relative bg-gradient-to-br from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white rounded-2xl w-full max-w-md p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Author Details
              </h3>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                onClick={() => setSelectedAuthor(null)}
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <label className="text-sm text-purple-300 font-medium">Author Name</label>
                  <p className="text-white mt-1 font-medium">{selectedAuthor?.product?.authorName}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-sm text-purple-300 font-medium">Email Address</label>
                <p className="text-white mt-1 font-mono text-sm">{selectedAuthor?.product?.authorEmail}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-sm text-purple-300 font-medium">Book Title</label>
                <p className="text-white mt-1 font-medium">{selectedAuthor?.product?.title}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-sm text-purple-300 font-medium">Category</label>
                <p className="text-white mt-1">{selectedAuthor?.product?.category}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedAuthor(null)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApprovedOrders
