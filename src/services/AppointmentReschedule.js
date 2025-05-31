import {
  getDataWithCredentials,
  insertDataWithCredentials,
  updateDataWithCredentials,
} from "../utils/apiUtils"; // renamed to utils not hooks

export const getallReshedules = async () => {
  const url = `/api/reshedule/`;

  return await getDataWithCredentials(url);
};


export const getReshedule = async (id) => {
  const url = `/api/reshedule/${id}`;
  return await getDataWithCredentials(url);
};


export const createReshedule = async (data) => {
  const url = "/api/reshedule/";
  return await insertDataWithCredentials(url, data);
};

export const updateReshedule = async (id, data) => {
  const url = `/api/reshedule/${id}`;
  return await updateDataWithCredentials(url, data);
};
