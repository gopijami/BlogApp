
// store.js
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    blogReducer, // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // Add any other middleware or configuration options here
});

export default store;





