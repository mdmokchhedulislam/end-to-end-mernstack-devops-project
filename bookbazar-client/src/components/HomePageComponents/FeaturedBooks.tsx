import { Link } from "react-router-dom";
import { useGetAllBookDataQuery } from "../../redux/features/productManagement/productApi";
import { ScaleLoader } from "react-spinners";
import { ArrowRight, BookOpen, Star } from "lucide-react";
type TBook = {
  authorEmail: string;
  authorName: string;
  category: string;
  description: string;
  imageUrl: string;
  isAvaillable: boolean;
  isDeleted: boolean;
  numberOfBooks: number;
  price: string;
  title: string;
  __v: number;
  _id: string;
};
const FeaturedBooks = () => {
  const { data, isLoading } = useGetAllBookDataQuery(undefined);
  // console.log(data);
  const booksData = data?.data;
  const availlableBooks = booksData?.filter(
    (book: TBook) => book.numberOfBooks > 0
  );

  //   console.log(booksData);
  const sliceBooks = availlableBooks?.slice(0, 8);
  //   console.log(sliceBooks);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <ScaleLoader color="#8B5CF6" height={50} width={6} />
        <p className="text-white mt-4 text-lg">
          Loading amazing books for you...
        </p>
      </div>
    );
  }

  return (
      <section className="py-15 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Featured Books
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Handpicked selections from our vast collection of amazing books
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {sliceBooks?.length ? (
              sliceBooks.map((item: TBook) => (
                <div
                  key={item._id}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Book Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        item?.imageUrl ||
                        "/placeholder.svg?height=256&width=256"
                      }
                      alt="Book Cover"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      ৳{item?.price}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                     
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 overflow-hidden">
                      <span className="block truncate">
                        {item?.title.length > 30
                          ? `${item?.title.slice(0, 30)}...`
                          : item?.title}
                      </span>
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 overflow-hidden">
                      <span
                        className="block"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.description.length > 100
                          ? `${item.description.slice(0, 100)}...`
                          : item.description}
                      </span>
                    </p>

                    <Link
                      to={`/product-details/${item._id}`}
                      className="w-full block text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-xl">
                  No books found at the moment.
                </p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/all-product"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              View All Books
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
  );
};

export default FeaturedBooks;
