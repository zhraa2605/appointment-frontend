import {
  getDataWithCredentials,
  insertDataWithCredentials,
  updateDataWithCredentials,
  deleteDataWithCredentials,
} from "../utils/apiUtils";

// Get all notifications (optionally filter by user_id)
export const getNotifications = async (userId = null) => {
  let url = "/api/notifications";
  if (userId) url += `?user_id=${userId}`;
  return await getDataWithCredentials(url);
};

// Get a single notification
export const getNotificationById = async (id) => {
  return await getDataWithCredentials(`/api/notifications/${id}`);
};

// Create a notification
export const createNotification = async (data) => {
  return await insertDataWithCredentials("/api/notifications", data);
};

// Update a notification
export const updateNotification = async (id, data) => {
  return await updateDataWithCredentials(`/api/notifications/${id}`, data);
};

// Delete a notification
export const deleteNotification = async (id) => {
  return await deleteDataWithCredentials(`/api/notifications/${id}`);
};