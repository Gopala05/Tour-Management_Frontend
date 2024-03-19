import { createSlice } from '@reduxjs/toolkit';

export const adminDataSlice = createSlice({
  name: 'adminData',
  initialState: {
    value: '',
    token: '',
  },
  reducers: {
    setAdminData: (state, action) => {
      state.value = action.payload;
    },
    setAdminToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAdminData, setAdminToken } = adminDataSlice.actions;

export const selectAdminData = (state: { adminData: { value: any; }; }) => state.adminData.value;
export const selectAdminToken = (state: { adminData: { token: any; }; }) => state.adminData.token;

export default adminDataSlice.reducer;
