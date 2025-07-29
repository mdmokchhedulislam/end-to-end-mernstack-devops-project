
import { User, Mail, Shield, AtSign } from "lucide-react"
import { useAppSelector } from "../../../redux/hooks"
import { useCurrentUser } from "../../../redux/features/auth/authSlice"

export default function UserProfile() {
  const user = useAppSelector(useCurrentUser)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
            User Profile
          </h1>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Manage your account settings and view your profile information
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header Card */}
          <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <img
                  src={user?.imageUrl || "/placeholder.svg"}
                  alt={user?.name}
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/20"
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{user?.name}</h2>
                <p className="text-purple-200 text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/30">
                  <Shield className="w-4 h-4 mr-2 text-purple-300" />
                  <span className="text-purple-200 font-medium">{user?.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Details */}
            <div className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-purple-400/30">
                  <User className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">Account Details</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-300 uppercase tracking-wide">Full Name</label>
                  <div className="text-white font-medium bg-white/5 rounded-lg p-3 border border-white/10">
                    {user?.name}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-300 uppercase tracking-wide">Email Address</label>
                  <div className="text-white font-medium bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-400" />
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-pink-600/30 to-pink-400/30">
                  <AtSign className="w-6 h-6 text-pink-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">Account Info</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-300 uppercase tracking-wide">Username</label>
                  <div className="text-white font-medium bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-2">
                    <AtSign className="w-4 h-4 text-purple-400" />
                    {"@" + user?.email?.split("@")[0]}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-300 uppercase tracking-wide">Role</label>
                  <div className="text-white font-medium bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    {user?.role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats or Additional Info */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl border border-white/10 p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Account Status</h3>
              <p className="text-purple-200 mb-4">Your account is active and verified</p>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
                <span className="text-green-300 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
