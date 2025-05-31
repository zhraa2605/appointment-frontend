import {
  insertData,
  insertDataWithCredentials,
  getDataWithCredentials,
  deleteDataWithCredentials,
  updateDataWithCredentials,
} from "../utils/apiUtils"; 

// Login user (set cookie automatically from server)
export const loginUser = async (userData) => {
  const response = await insertData("/api/users/login", userData);
  return response;
};

// Register user (cookie is handled automatically)
export const registerUser = async (userData) => {
  const response = await insertData("/api/users/register", userData);
  return response;
};

// Add a new user (requires credentials)
export const addUser = async (userData) => {
  try {
    const response = await insertDataWithCredentials("/api/users/adduser", userData);
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error; 
  }
};

// Logout user (requires credentials)
export const logoutUser = async () => {
  await insertDataWithCredentials("/api/users/logout", {}); 
};

// Fetch all users (requires credentials)
export const fetchUsers = async () => {
  return await getDataWithCredentials("/api/users");
};

// Fetch a single user by ID (requires credentials)
export const fetchUserById = async (userId) => {
  return await getDataWithCredentials(`/api/users/${userId}`);
};

// Update a user (requires credentials)
export const updateUser = async ({ userId, userData }) => {
  return await updateDataWithCredentials(`/api/users/${userId}`, userData);
};

// Delete a user (requires credentials)
export const deleteUser = async (userId) => {
  return await deleteDataWithCredentials(`/api/users/${userId}`);
};
