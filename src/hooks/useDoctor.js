import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctors,
  fetchDoctorById,
  createDoctorAsync,
  updateDoctorAsync,
  deleteDoctorAsync,
} from "@/redux/Slices/DoctorsSlice";

export const useDoctor = () => {
  const dispatch = useDispatch();

  const { doctors, doctor, loading, error } = useSelector((state) => state.doctor);
  return {
    doctors,
    doctor,
    loading,
    error,
    fetchDoctors: () => dispatch(fetchDoctors()),
    fetchDoctorById: (id) => dispatch(fetchDoctorById(id)),
    createDoctor: (data) => dispatch(createDoctorAsync(data)),
    updateDoctor: ({ id, data }) => dispatch(updateDoctorAsync({ id, data })),
    deleteDoctor: (id) => dispatch(deleteDoctorAsync(id)),
  };
};

