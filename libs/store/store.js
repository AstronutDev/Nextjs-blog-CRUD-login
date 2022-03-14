import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./session";
export default configureStore({
  reducer: {
    session: sessionSlice,
  },
});
