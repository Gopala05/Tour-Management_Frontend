import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    value: '',
    token: '',
    bookings: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const { setUserData, setToken, setBookings } = userDataSlice.actions;

export const selectUserData = (state: { userData: { value: any; }; }) => state.userData.value;
export const selectToken = (state: { userData: { token: any; }; }) => state.userData.token;
export const selectBookings = (state: { userData: { bookings: any; }; }) => state.userData.bookings;

export default userDataSlice.reducer;
