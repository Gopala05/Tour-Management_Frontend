import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    value: '',
    token: '',
  },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUserData, setToken } = userDataSlice.actions;

export const selectUserData = (state: { userData: { value: any; }; }) => state.userData.value;
export const selectToken = (state: { userData: { token: any; }; }) => state.userData.token;

export default userDataSlice.reducer;
