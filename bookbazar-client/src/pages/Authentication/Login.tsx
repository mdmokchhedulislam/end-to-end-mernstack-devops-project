

import { useState } from "react"
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../redux/features/auth/authApi"
import { toast } from "sonner"
import { verifyToken } from "../../utils/verifyToken"
import { useAppDispatch } from "../../redux/hooks"
import { setUser, type TUser } from "../../redux/features/auth/authSlice"
import { Eye, EyeOff, LogIn, User, Shield, Loader2 } from "lucide-react"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    try {
      const result = await login(data).unwrap()
      const user = verifyToken(result.data.accessToken) as TUser

      if (result?.success) {
        toast.success("Login successful!", {
          description: `Welcome back, ${user.name}`,
          duration: 3000,
        })
      }

      dispatch(setUser({ user: user, token: result.data.accessToken }))
      navigate("/")
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.data?.message || "Please check your credentials and try again",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = async (type: "admin" | "user") => {
    setIsLoading(true)
    const data =
      type === "admin"
        ? { email: "humayun@gmail.com", password: "506034" }
        : { email: "humayun123@gmail.com", password: "506034" }

    try {
      const result = await login(data).unwrap()
      const user = verifyToken(result.data.accessToken) as TUser

      if (result?.success) {
        toast.success(`${type === "admin" ? "Admin" : "User"} login successful!`, {
          description: `Welcome back, ${user.name}`,
          duration: 3000,
        })
      }

      dispatch(setUser({ user: user, token: result.data.accessToken }))
      navigate("/")
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.data?.message || "Please check your credentials and try again",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="py-10 flex items-center justify-center bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] ">
      {/* Background Pattern */}
      
      
      <div className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <div className="relative group">
          <div className="absolute -inset-1  rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
          <div className="relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400">Log in to continue exploring our vast collection of books</p>
            </div>

            {/* Quick Login Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => quickLogin("admin")}
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm text-white font-medium rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <Shield className="w-4 h-4" />
                Admin Login
              </button>

              <button
                onClick={() => quickLogin("user")}
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm text-white font-medium rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <User className="w-4 h-4" />
                User Login
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-white/60 text-sm">or login with email</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="Enter your email..."
                    className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                        : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                    }`}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email.message as string || "Email is required"}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password..."
                    className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                        : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password.message as string || "Password is required"}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="w-5 h-5" />
                    Login
                  </span>
                )}
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-gray-400 mt-8">
              New here?{" "}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Create an account
              </Link>
            </p>

           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
