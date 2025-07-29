/* eslint-disable @typescript-eslint/no-unused-vars */




"use client"

import {
  useActiveAccountMutation,
  useChangeRoleMutation,
  useDeactivateAccountMutation,
  useGetAllUserDataQuery,
} from "../../redux/features/auth/authApi"
import { toast } from "sonner"
import { UserCheck, UserX, Shield, User, Mail, ChevronDown, Filter, Search, Settings } from "lucide-react"
import { useState } from "react"
import { Pagination } from "../../components/Shared/Pagination"
import { ScaleLoader } from "react-spinners"

type TUser = {
  createdAt: string
  email: string
  imageUrl: string
  isBlocked: boolean
  name: string
  role: string
  updatedAt: string
  __v: number
  _id: string
}

const itemsPerPage = 7

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Confirmation modals
  const [deactivateConfirmation, setDeactivateConfirmation] = useState<{
    show: boolean
    userId: string
    userName: string
  }>({
    show: false,
    userId: "",
    userName: "",
  })

  const [activateConfirmation, setActivateConfirmation] = useState<{
    show: boolean
    userId: string
    userName: string
  }>({
    show: false,
    userId: "",
    userName: "",
  })

  const [roleChangeConfirmation, setRoleChangeConfirmation] = useState<{
    show: boolean
    newRole: string
    userEmail: string
    userName: string
  }>({
    show: false,
    newRole: "",
    userEmail: "",
    userName: "",
  })

  const { data, isLoading } = useGetAllUserDataQuery(undefined, {
    pollingInterval: 2000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  const [deactivateAccount] = useDeactivateAccountMutation()
  const [activeAccount] = useActiveAccountMutation()
  const [changeRole] = useChangeRoleMutation()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <ScaleLoader color="#8b5cf6" />
        <p className="mt-4 text-white/70 text-sm">Loading users...</p>
      </div>
    )
  }

  const usersData = data?.data

  const userDataWithOutOneUserAndAdmin = usersData?.filter(
    (user: TUser) => user?.email !== "humayun@gmail.com" && user?.email !== "humayun123@gmail.com",
  )

  const filteredAndSortedUsers =
    userDataWithOutOneUserAndAdmin?.filter((user: TUser) => {
      // Search filter
      const search = searchTerm.toLowerCase()
      const matchesSearch = user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)

      // Role filter
      let matchesRole = true
      if (roleFilter === "admin") {
        matchesRole = user.role === "admin"
      } else if (roleFilter === "user") {
        matchesRole = user.role === "user"
      }

      return matchesSearch && matchesRole
    }) || []

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage)

  const handleDeactivateClick = (id: string, name: string) => {
    setDeactivateConfirmation({
      show: true,
      userId: id,
      userName: name,
    })
  }

  const handleConfirmDeactivate = async () => {
    try {
      const userInfo = {
        id: deactivateConfirmation.userId,
      }

      const result = await deactivateAccount(userInfo).unwrap()
      toast.success(result.message, {
        description: "User account has been deactivated",
        duration: 3000,
      })
      setDeactivateConfirmation({ show: false, userId: "", userName: "" })
    } catch (err) {
      toast.error("Failed to deactivate account", {
        description: "Please try again later",
        duration: 3000,
      })
      setDeactivateConfirmation({ show: false, userId: "", userName: "" })
    }
  }

  const handleActivateClick = (id: string, name: string) => {
    setActivateConfirmation({
      show: true,
      userId: id,
      userName: name,
    })
  }

  const handleConfirmActivate = async () => {
    try {
      const userInfo = {
        id: activateConfirmation.userId,
      }

      const result = await activeAccount(userInfo).unwrap()
      toast.success(result.message, {
        description: "User account has been activated",
        duration: 3000,
      })
      setActivateConfirmation({ show: false, userId: "", userName: "" })
    } catch (err) {
      toast.error("Failed to activate account", {
        description: "Please try again later",
        duration: 3000,
      })
      setActivateConfirmation({ show: false, userId: "", userName: "" })
    }
  }

  const handleRoleChangeClick = (selectedRole: string, selectedUserEmail: string, userName: string) => {
    setRoleChangeConfirmation({
      show: true,
      newRole: selectedRole,
      userEmail: selectedUserEmail,
      userName: userName,
    })
  }

  const handleConfirmRoleChange = async () => {
    try {
      const userRole = {
        role: roleChangeConfirmation.newRole,
        email: roleChangeConfirmation.userEmail,
      }
      const result = await changeRole(userRole).unwrap()
      toast.success(result.message, {
        description: `User role changed to ${roleChangeConfirmation.newRole}`,
        duration: 3000,
      })
      setRoleChangeConfirmation({ show: false, newRole: "", userEmail: "", userName: "" })
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Failed to change user role",
        duration: 3000,
      })
      setRoleChangeConfirmation({ show: false, newRole: "", userEmail: "", userName: "" })
    }
  }

  const getRoleBadge = (role: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"

    switch (role.toLowerCase()) {
      case "admin":
        return `${baseClasses} bg-purple-500/20 text-purple-300 border border-purple-500/30`
      case "user":
        return `${baseClasses} bg-blue-500/20 text-blue-300 border border-blue-500/30`
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-300 border border-gray-500/30`
    }
  }

  const getStatusBadge = (isBlocked: boolean) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"

    if (isBlocked) {
      return `${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`
    } else {
      return `${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
      {/* Background Pattern */}
    

      <div className="container p-4 mx-auto sm:p-6 text-white relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold leading-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            User Management
          </h2>
          <p className="mt-2 text-gray-300">Manage user accounts, roles, and permissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-purple-500/30 transition-colors duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {userDataWithOutOneUserAndAdmin?.length || 0}
                </div>
                <div className="text-sm text-gray-400">Total Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-green-500/30 transition-colors duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {userDataWithOutOneUserAndAdmin?.filter((user: TUser) => !user.isBlocked).length || 0}
                </div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-purple-500/30 transition-colors duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {userDataWithOutOneUserAndAdmin?.filter((user: TUser) => user.role === "admin").length || 0}
                </div>
                <div className="text-sm text-gray-400">Administrators</div>
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
                placeholder="Search by name or email..."
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
                {/* Role Filter */}
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Filter by Role</label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all" className="bg-gray-800">
                      All Users
                    </option>
                    <option value="admin" className="bg-gray-800">
                      Administrators
                    </option>
                    <option value="user" className="bg-gray-800">
                      Regular Users
                    </option>
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || roleFilter !== "all") && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-purple-300">Active filters:</span>
                  {searchTerm && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {roleFilter !== "all" && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                      Role: {roleFilter === "admin" ? "Administrators" : "Regular Users"}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setRoleFilter("all")
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
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>User</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Role</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Change Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedUsers?.map((item: TUser, idx: number) => (
                  <tr key={idx} className="hover:bg-white/5 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-purple-400/50 transition-colors duration-200">
                          <img
                            src={item.imageUrl || "/placeholder.svg?height=40&width=40"}
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-200">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 font-mono">{item.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getRoleBadge(item.role)}>
                        {item.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
                        {item.role === "user" && <User className="w-3 h-3 mr-1" />}
                        {item.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(item.isBlocked)}>
                        {item.isBlocked ? (
                          <>
                            <UserX className="w-3 h-3 mr-1" />
                            Blocked
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3 h-3 mr-1" />
                            Active
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleRoleChangeClick(e.target.value, item.email, item.name)
                              e.target.value = "" // Reset select
                            }
                          }}
                          defaultValue=""
                          className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-2 pr-8 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-white/15 transition-colors duration-200 cursor-pointer"
                        >
                          <option value="" disabled className="bg-[#1C1C32] text-gray-300">
                            Select Role
                          </option>
                          <option
                            value="user"
                            disabled={item.role === "user"}
                            className="bg-[#1C1C32] text-white"
                          >
                            User
                          </option>
                          <option
                            value="admin"
                            disabled={item.role === "admin"}
                            className="bg-[#1C1C32] text-white"
                          >
                            Admin
                          </option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {!item.isBlocked ? (
                        <button
                          onClick={() => handleDeactivateClick(item._id, item.name)}
                          className="inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                        >
                          <UserX className="w-3 h-3 mr-1" />
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivateClick(item._id, item.name)}
                          className="inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                        >
                          <UserCheck className="w-3 h-3 mr-1" />
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
          </div>

          {filteredAndSortedUsers?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                {searchTerm || roleFilter !== "all" ? "No users match your filters" : "No users found"}
              </div>
              <p className="text-gray-500 text-sm mt-2">
                {searchTerm || roleFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "User accounts will appear here when they register"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Deactivate Confirmation Modal */}
      {deactivateConfirmation.show && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300" />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
                <UserX className="w-8 h-8 text-red-400" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Deactivate User Account</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to deactivate{" "}
                  <span className="font-semibold text-red-300">"{deactivateConfirmation.userName}"</span>'s account? They
                  will not be able to access the system until reactivated.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeactivateConfirmation({ show: false, userId: "", userName: "" })}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-200 border border-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDeactivate}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Activate Confirmation Modal */}
      {activateConfirmation.show && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300" />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-green-400" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Activate User Account</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to activate{" "}
                  <span className="font-semibold text-green-300">"{activateConfirmation.userName}"</span>'s account? They
                  will regain access to the system.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setActivateConfirmation({ show: false, userId: "", userName: "" })}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-200 border border-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmActivate}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                  >
                    Activate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Role Change Confirmation Modal */}
      {roleChangeConfirmation.show && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300" />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4">
                <Settings className="w-8 h-8 text-purple-400" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Change User Role</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to change{" "}
                  <span className="font-semibold text-purple-300">"{roleChangeConfirmation.userName}"</span>'s role to{" "}
                  <span className="font-semibold text-purple-300">"{roleChangeConfirmation.newRole}"</span>? This will
                  affect their permissions and access level.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setRoleChangeConfirmation({ show: false, newRole: "", userEmail: "", userName: "" })}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-200 border border-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRoleChange}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                  >
                    Change Role
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

export default ManageUsers
