import baseURL from "../Api";

// For public POST requests (no auth)
export const insertData = async (url, data) => {
  const res = await baseURL.post(url, data);
  return res.data;
};

// For authenticated POST requests (with cookie)
export const insertDataWithCredentials = async (url, data) => {
  const res = await baseURL.post(url, data, {
    withCredentials: true
  });
  return res.data;
};

// For public GET requests
export const getData = async (url, withCreds = false) => {
  const res = await baseURL.get(url, {
    withCredentials: withCreds
  });
  return res.data;
};

export const getDataWithCredentials = async (url,) => {
  const res = await baseURL.get(url, { 
    withCredentials: true,
  });
  console.log(res.data)
  return res.data;
};


// For authenticated PUT requests
export const updateDataWithCredentials = async (url, data) => {
  const res = await baseURL.put(url, data, {
    withCredentials: true
  });
  return res.data;
};

// For authenticated DELETE requests
export const deleteDataWithCredentials = async (url) => {
  const res = await baseURL.delete(url, {
    withCredentials: true
  });
  return res.data;
};
