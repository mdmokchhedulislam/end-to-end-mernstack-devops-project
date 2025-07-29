// import { Link, useParams } from "react-router-dom";
// import { useGetAllBookDataQuery } from "../redux/features/productManagement/productApi";
// import { ScaleLoader } from "react-spinners";
// import { useAppSelector } from "../redux/hooks";
// import { useCurrentUser } from "../redux/features/auth/authSlice";
// import { addToCart } from "../redux/features/Cart/CartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";

// type TBook = {
//   authorEmail: string;
//   authorName: string;
//   category: string;
//   description: string;
//   imageUrl: string;
//   isAvaillable: boolean;
//   isDeleted: boolean;
//   numberOfBooks: number;
//   price: string;
//   title: string;
//   __v: number;
//   _id: string;
// };

// type RootState = {
//   cart: {
//     products: TBook[];
//   };
// };

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { data, isLoading } = useGetAllBookDataQuery(undefined);
//   const dispatch = useDispatch();

//   const bookData = data?.data?.find((item: TBook) => item._id === id);
//   const user = useAppSelector(useCurrentUser);
//   const cartItem = useSelector((state: RootState) => state.cart.products);

//   const currentQuantityInCart = cartItem.filter(
//     (item) => item._id === bookData?._id
//   ).length;

//   const isOutOfStock = (bookData?.numberOfBooks ?? 0) <= currentQuantityInCart;

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
//         <ScaleLoader color="#1ca944" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto">
//       <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white p-6">
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 mt-20">
//           <div className="w-full md:w-1/3">
//             <img
//               src={bookData?.imageUrl}
//               alt="Book Cover"
//               className="w-full h-[300px] rounded-lg shadow-lg"
//             />
//           </div>

//           <div className="w-full md:w-2/3">
//             <h1 className="text-3xl font-bold mb-4">{bookData?.title}</h1>
//             <h2 className="text-lg text-blue-400 mb-2">
//               By {bookData?.authorName}
//             </h2>
//             <p className="text-gray-300 mb-2">{bookData?.description}</p>
//             <p className="text-gray-400 mb-2">
//               <span className="font-semibold">Category :</span>{" "}
//               {bookData?.category}
//             </p>
//             <p className="text-gray-400 mb-6">
//               <span className="font-semibold">Number Of Books :</span>{" "}
//               {bookData?.numberOfBooks}
//             </p>

//             {user && user.email !== bookData?.authorEmail && (
//               <button
//                 onClick={() => {
//                   dispatch(addToCart(bookData));
//                   toast.success("Book added to cart!", {
//                     description: "Check your cart to proceed to checkout",
//                   });
//                 }}
//                 disabled={isOutOfStock}
//                 className={`px-4 py-2 text-sm font-medium transition rounded-lg focus:outline-none ${
//                   isOutOfStock
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500"
//                 }`}
//               >
//                 {isOutOfStock ? "Out of Stock" : "Add To Cart"}
//               </button>
//             )}

//             {user && user.email === bookData?.authorEmail && (
//               <button className="px-4 py-2 text-sm font-medium transition rounded-lg focus:outline-none text-white bg-gray-400 cursor-not-allowed">
//                 You can't add your own product
//               </button>
//             )}

//             {!user && (
//               <Link to="/login">
//                 <button className="px-4 py-2 text-sm font-medium transition rounded-lg focus:outline-none text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500">
//                   Add To Cart
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;




import { Link, useParams } from "react-router-dom"
import { useGetAllBookDataQuery } from "../redux/features/productManagement/productApi"
import { ScaleLoader } from "react-spinners"
import { useAppSelector } from "../redux/hooks"
import { useCurrentUser } from "../redux/features/auth/authSlice"
import { addToCart } from "../redux/features/Cart/CartSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

type TBook = {
  authorEmail: string
  authorName: string
  category: string
  description: string
  imageUrl: string
  isAvaillable: boolean
  isDeleted: boolean
  numberOfBooks: number
  price: string
  title: string
  __v: number
  _id: string
}

type RootState = {
  cart: {
    products: TBook[]
  }
}

const ProductDetails = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetAllBookDataQuery(undefined)
  const dispatch = useDispatch()

  const bookData = data?.data?.find((item: TBook) => item._id === id)
  const user = useAppSelector(useCurrentUser)
  const cartItem = useSelector((state: RootState) => state.cart.products)

  const currentQuantityInCart = cartItem.filter((item) => item._id === bookData?._id).length

  const isOutOfStock = (bookData?.numberOfBooks ?? 0) <= currentQuantityInCart

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <div className="text-center">
          <ScaleLoader color="#1ca944" />
          <p className="text-white/70 mt-4 text-sm">Loading book details...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
      {/* Background Pattern */}
      
      
      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <Link to="/" className="hover:text-white/80 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/books" className="hover:text-white/80 transition-colors">
                Books
              </Link>
              <span>/</span>
              <span className="text-white/80">{bookData?.title}</span>
            </div>
          </nav>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <img
                    src={bookData?.imageUrl || "/placeholder.svg"}
                    alt={bookData?.title}
                    className="w-full h-[400px] lg:h-[500px] object-cover rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
              
              {/* Stock Indicator */}
              <div className="flex items-center justify-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isOutOfStock 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    isOutOfStock ? 'bg-red-400' : 'bg-green-400'
                  }`}></div>
                  {isOutOfStock ? 'Out of Stock' : `${bookData?.numberOfBooks - currentQuantityInCart} Available`}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">
                  {bookData?.category}
                </div>
                
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                  {bookData?.title}
                </h1>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {bookData?.authorName?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-blue-300 font-medium">
                      {bookData?.authorName}
                    </p>
                    <p className="text-white/60 text-sm">Author</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-white/80 leading-relaxed">
                  {bookData?.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {bookData?.numberOfBooks}
                  </div>
                  <div className="text-white/60 text-sm">Total Books</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {currentQuantityInCart}
                  </div>
                  <div className="text-white/60 text-sm">In Your Cart</div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Price</p>
                    <p className="text-3xl font-bold text-white">
                      ${bookData?.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-sm mb-1">Availability</p>
                    <p className={`font-semibold ${
                      bookData?.isAvaillable ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {bookData?.isAvaillable ? 'Available' : 'Unavailable'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {user && user.email !== bookData?.authorEmail && (
                  <button
                    onClick={() => {
                      dispatch(addToCart(bookData));
                      toast.success("Book added to cart!", {
                        description: "Check your cart to proceed to checkout",
                      });
                    }}
                    disabled={isOutOfStock}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                      isOutOfStock
                        ? "bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-600/30"
                        : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-purple-500/30"
                    }`}
                  >
                    {isOutOfStock ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                        </svg>
                        Out of Stock
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                        </svg>
                        Add To Cart
                      </span>
                    )}
                  </button>
                )}

                {user && user.email === bookData?.authorEmail && (
                  <div className="w-full py-4 px-6 rounded-xl font-semibold text-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-center">
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      You can't add your own product
                    </span>
                  </div>
                )}

                {!user && (
                  <Link to="/login" className="block">
                    <button className="w-full py-4 px-6 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-purple-500/30">
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login to Add to Cart
                      </span>
                    </button>
                  </Link>
                )}

                {/* Additional Info */}
                <div className="flex items-center justify-center space-x-6 text-sm text-white/60 pt-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure Purchase
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    Digital Delivery
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Quality Guaranteed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProductDetails
