import { configureStore } from '@reduxjs/toolkit';
import selectedKeyReducer from './selectedKeySlice';

const store = configureStore({
  reducer: {
    selectedKey: selectedKeyReducer,
  },
});

export default store;
