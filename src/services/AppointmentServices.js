import {
  getDataWithCredentials,
  insertDataWithCredentials,
  updateDataWithCredentials,
  deleteDataWithCredentials,
} from "../utils/apiUtils"; // renamed to utils not hooks

export const getAllAppointments = async (queryString = "") => {
  const url = `/api/appointments${queryString ? `?${queryString}` : ""}`;
  console.log("Fetching from URL:", url);

  return await getDataWithCredentials(url);
};


export const getAppointmentById = async (id) => {
  const url = `/api/appointments/${id}`;
  return await getDataWithCredentials(url);
};

export const getUserAppointments = async (userId) => {
  const url = `/api/appointments/user/${userId}`;
  return await getDataWithCredentials(url);
};

export const getDoctorAppointments = async (docorId) => {
  const url = `/api/appointments/doctor/${doctorId}`;

  return await getDataWithCredentials(url);
};

// export const getAppointmentByStatus = async (status) => {
//   const url = `/api/appointments/status/${status}`;
//   return await getDataWithCredentials(url);
// };

export const deleteAppointment = async (id) => {
  const url = `/api/appointments/${id}`;
  return await deleteDataWithCredentials(url);
};

export const createAppointment = async (data) => {
  const url = "/api/appointments/";
  console.log("Creating appointment with data:", data); // keep your debug log if you want
  return await insertDataWithCredentials(url, data);
};

export const updateAppointment = async (id, data) => {
  const url = `/api/appointments/${id}`;
  return await updateDataWithCredentials(url, data);
};
