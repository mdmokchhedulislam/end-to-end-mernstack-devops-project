import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBook } from "../../../pages/Dashboard/ProductManagement/AllProducts";

interface ICartState {
  products: TBook[];
}

const initialState: ICartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TBook>) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const indexToRemove = action.payload;
      state.products.splice(indexToRemove, 1);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
