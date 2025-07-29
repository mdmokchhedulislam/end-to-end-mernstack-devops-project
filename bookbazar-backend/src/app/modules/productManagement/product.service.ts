import { TProduct } from './product.interface';
import { Product } from './product.model';

const addBookDataIndoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllBookDataFromDB = async () => {
  const result = await Product.find({ isDeleted: false });
  return result;
};


const deletedBookIntoDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};
const updateBookIntoDB = async (id: string, bookInfo: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, { ...bookInfo});
  return result;
};
export const productServices = {
  addBookDataIndoDB,
  getAllBookDataFromDB,
  deletedBookIntoDB,
  updateBookIntoDB
};
