import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI from "../../api/user";


export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async (formData, { dispatch,rejectWithValue }) => {
    try {
      let response = await UserAPI.login(formData);
      
      console.log(formData,'response in thunk');
      dispatch(setLoggedIn(true));


      return response.data;
    } catch (err) {
      console.log(err,'err');
      // return rejectWithValue(err.response?.data || err.message);
      return rejectWithValue((err.response && err.response.data) || err.message);
    }
  }
);

const initialState = {
  isRedux: false,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      console.log(state,'state')
      console.log(action,'action')

      state.isLoggedIn = true;
      state.user = action.payload.username;
    },
    logIn: (state, action) => {
      state.isRedux = true;
    },
    logOutAction: (state) => {
      state.isLoggedIn = false;
      state.user = false;
    },
  },
});

export const { logIn, logOutAction, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
