import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDoctors ,
  getDoctorById , 
  deleteDoctor,
  createDoctor,
  updateDoctor

 } from "../../services/DoctorsServices"; // adjust path if needed

// Async thunk
export const fetchDoctors = createAsyncThunk(
  "doctors/fetchAll", getAllDoctors
  
);
export const fetchDoctorById = createAsyncThunk(
  "doctors/fetchById", getDoctorById
  );

export const deleteDoctorAsync = createAsyncThunk(
  "doctors/delete", deleteDoctor
  );
export const createDoctorAsync = createAsyncThunk(
    "doctors/create", createDoctor
    );
export const updateDoctorAsync = createAsyncThunk(
      "doctors/update", updateDoctor
      );

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: { data: [], pagination: {} },
    doctor:null ,
    loading: false,
    error: null,
  },
  reducers: {
    // add any non-async reducers here if needed later
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
          state.loading = false;
          state.doctors = action.payload;
          })
      .addCase(fetchDoctorById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
            })
            .addCase(deleteDoctorAsync.pending, (state) => {
              state.loading = true;
              state.error = null;
              })
              .addCase(deleteDoctorAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = action.payload;
                })
                .addCase(deleteDoctorAsync.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.payload || "Something went wrong";
                  })
                  .addCase(createDoctorAsync.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                    })
                    .addCase(createDoctorAsync.fulfilled, (state, action) => {
                      state.loading = false;
                      state.doctors = action.payload;
                      })
                      .addCase(createDoctorAsync.rejected, (state, action) => {
                        state.loading = false;
                        state.error = action.payload || "Something went wrong";
                        })
                        .addCase(updateDoctorAsync.pending, (state) => {
                          state.loading = true;
                          state.error = null;
                          })
                          .addCase(updateDoctorAsync.fulfilled, (state, action) => {
                            state.loading = false;
                            state.doctors = action.payload;
                            })
                            .addCase(updateDoctorAsync.rejected, (state, action) => {
                              state.loading = false;
                              state.error = action.payload || "Something went wrong";
      })
  },
});

export default doctorSlice.reducer;
