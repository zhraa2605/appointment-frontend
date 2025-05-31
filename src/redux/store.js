import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import DoctorSlice from './Slices/DoctorsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: DoctorSlice
  },
});

