

import { useState } from "react"
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../redux/features/auth/authApi"
import { toast } from "sonner"
import axios from "axios"
import { ScaleLoader } from "react-spinners"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm()

  const [registerUser] = useRegisterMutation()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const toastId = toast.loading("Please wait...");
    try {
      setLoading(true)
      const image = data.image[0]
      const newFormData = new FormData()
      newFormData.append("file", image) // Add the image file
      newFormData.append("upload_preset", "humayunkabir") // Your upload preset
      newFormData.append("cloud_name", "dn7oeugls") // Not necessary for the request

      const response = await axios.post("https://api.cloudinary.com/v1_1/dn7oeugls/image/upload", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      const imageUrl = response.data.url
      const userInfo = {
        ...data,
        imageUrl,
      }
      // console.log(data);
      const result = await registerUser(userInfo).unwrap()
      // console.log("result => ", result);
      if (result?.success) {
        toast.success("Registration Successfully..", {
          // id: toastId,
          duration: 2000,
        })
        reset()
        setLoading(false)
        navigate("/login")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log("error =>", error);
      toast.error(error.data.message, { duration: 2000 })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        {/* Background Pattern */}
      
        
        <div className="relative z-10 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <ScaleLoader color="#8b5cf6" />
            <p className="mt-4 text-white/70 text-lg font-medium">Creating your account...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4 py-8">
      {/* Background Pattern */}
      
      <div className="relative z-10 w-full max-w-md">
        {/* Registration Card */}
        <div className="relative group">
          <div className="absolute -inset-1  rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
          <div className="relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
              <p className="text-gray-400">Unlock access to a wide range of books with just a few details!</p>
            </div>

            {/* Registration Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      placeholder="Enter your name..."
                      className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                          : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                      }`}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Name is required
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
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
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Email is required
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
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
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-5 h-5" />
                      ) : (
                        <FaEye className="w-5 h-5" />
                      )}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Password is required
                    </p>
                  )}
                </div>

                {/* Image Upload Field */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Image</label>
                  {loading ? (
                    <div className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white/70 text-center">
                      Uploading, please wait...
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        {...register("image", { required: "Image is required" })}
                        type="file"
                        accept="image/*"
                        className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.image
                            ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                            : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                        }`}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  )}
                  {errors.image && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Image is required
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Register
                </span>
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-400 mt-8">
              Already have an account?{" "}
              <Link to={"/login"} className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Login
              </Link>
            </p>

           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
