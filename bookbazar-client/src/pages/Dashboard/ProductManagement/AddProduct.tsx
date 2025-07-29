/* eslint-disable @typescript-eslint/no-unused-vars */



import axios from "axios"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useAppSelector } from "../../../redux/hooks"
import { useCurrentUser } from "../../../redux/features/auth/authSlice"
import { ScaleLoader } from "react-spinners"
import { useAddBookMutation } from "../../../redux/features/productManagement/productApi"
import { toast } from "sonner"

interface BookFormData {
  title: string
  numberOfBooks: number
  description: string
  image: FileList
  price: string
  category: string
}

const AddProduct = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<BookFormData>()

  const user = useAppSelector(useCurrentUser)
  const [addBook] = useAddBookMutation()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<BookFormData> = async (data) => {
    try {
      setLoading(true)
      const image = data.image[0]
      const newFormData = new FormData()
      newFormData.append("file", image)
      newFormData.append("upload_preset", "humayunkabir")
      newFormData.append("cloud_name", "dn7oeugls")

      const response = await axios.post("https://api.cloudinary.com/v1_1/dn7oeugls/image/upload", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      const imageUrl = response.data.url
      const { description, numberOfBooks, price, title, category } = data
      const bookData = {
        description,
        numberOfBooks,
        price,
        title,
        imageUrl,
        authorName: user?.name,
        authorEmail: user?.email,
        isAvaillable: true,
        category,
      }

      const finalResult = await addBook(bookData).unwrap()

      if (finalResult.success) {
        toast.success("Book Data Added Successfully", { duration: 2000 })
      }

      reset()
      setLoading(false)
    } catch (error) {
      toast.error("something went wrong..", { duration: 2000 })
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <ScaleLoader color="#8b5cf6" />
        <p className="mt-4 text-white/70 text-sm">Uploading your book...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] py-8 px-4">
      {/* Background Pattern */}
     
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Add New Book</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Share your knowledge with the world by adding a new book to your collection
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white mb-3">
                Book Title <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  placeholder="Enter the book title..."
                  className={`w-full px-4 py-4 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.title
                      ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                      : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                  }`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.title && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Title is required
                </p>
              )}
            </div>

            {/* Number of Books & Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white mb-3">
                  Number of Books <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("numberOfBooks", {
                      required: "Number of Books is required",
                    })}
                    type="number"
                    placeholder="e.g., 50"
                    className={`w-full px-4 py-4 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.numberOfBooks
                        ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                        : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                    }`}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.numberOfBooks && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Number of Books is required
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white mb-3">
                  Book Cover Image <span className="text-red-400">*</span>
                </label>
                {loading ? (
                  <div className="w-full h-16 bg-white/10 border-2 border-dashed border-white/30 rounded-xl flex items-center justify-center">
                    <p className="text-white/70">Uploading, please wait...</p>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      {...register("image", { required: "Image is required" })}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className={`w-full h-16 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        errors.image
                          ? "border-red-500 bg-red-500/10 hover:bg-red-500/20"
                          : "border-white/30 bg-white/5 hover:border-purple-500/50 hover:bg-purple-500/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-white/70 text-sm">Choose image file</span>
                      </div>
                    </label>
                  </div>
                )}
                {errors.image && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Image is required
                  </p>
                )}
              </div>
            </div>

            {/* Book Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white mb-3">
                Book Category <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="bookCategory"
                  className={`w-full px-4 py-4 bg-white/10 border-2 rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 appearance-none ${
                    errors.category
                      ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                      : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                  }`}
                  {...register("category", { required: "Category is required" })}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-gray-800">
                    Select a category
                  </option>
                  <option value="fiction" className="bg-gray-800">
                    Fiction
                  </option>
                  <option value="academic" className="bg-gray-800">
                    Academic & Education
                  </option>
                  <option value="children" className="bg-gray-800">
                    Children's Books
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.category && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Category is required
                </p>
              )}
            </div>

            {/* Price Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white mb-3">
                Price <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-white/70 text-lg">৳</span>
                </div>
                <input
                  {...register("price", { required: "Price is required" })}
                  type="text"
                  placeholder="0.00"
                  className={`w-full pl-10 pr-4 py-4 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.price
                      ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                      : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                  }`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.price && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Price is required
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white mb-3">
                Description <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={5}
                  placeholder="Write a compelling description of your book..."
                  className={`w-full px-4 py-4 bg-white/10 border-2 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                    errors.description
                      ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                      : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                  }`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.description && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Description is required
                </p>
              )}
            </div>

            {/* Author Info Display */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-7 4a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Author Information
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="text-white font-medium">{user?.name || "Author Name"}</p>
                  <p className="text-white/60 text-sm">{user?.email || "author@example.com"}</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Book to Collection
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
