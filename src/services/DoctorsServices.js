import {
  getDataWithCredentials,
  insertDataWithCredentials,
  updateDataWithCredentials,
  deleteDataWithCredentials,
} from "../utils/apiUtils"; 

// Get all doctors (requires credentials)
export const getAllDoctors = async () => {
  const url = "/api/doctors";
  return await getDataWithCredentials(url);
};

// Get a single doctor by ID (requires credentials)
export const getDoctorById = async (id) => {
  const url = `/api/doctors/${id}`;
  return await getDataWithCredentials(url);
};

// Delete a doctor (requires credentials)
export const deleteDoctor = async (id) => {
  const url = `/api/doctors/${id}`;
  return await deleteDataWithCredentials(url);
};

// Create a new doctor (requires credentials)
export const createDoctor = async (data) => {
  const url = "/api/doctors";
  return await insertDataWithCredentials(url, data);
};

// Update a doctor (requires credentials)
export const updateDoctor = async ({ id, data }) => {
  const url = `/api/doctors/${id}`;
  return await updateDataWithCredentials(url, data);
};
