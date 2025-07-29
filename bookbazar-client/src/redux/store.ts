
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from "./features/auth/authSlice";
import cartReducer from './features/Cart/CartSlice'
import { baseApi } from './api/baseApi';
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

// 👉 সব রিডিউসার একসাথে
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

// 👉 persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], // এখানে cart যুক্ত কর
}

// 👉 persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

// টাইপস
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
