import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuth: false,
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action) {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
      state.loading = false;
    },
    login(state, action) {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isAuth = false;
      state.user = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { register, login, logout, setError, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;

