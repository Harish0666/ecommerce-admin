import { createSlice } from "@reduxjs/toolkit";

const selectedKeySlice = createSlice({
  name: "selectedKey",
  initialState: {
    key: "1", // Default selected key
  },
  reducers: {
    setSelectedKey: (state, action) => {
      debugger;
      state.key = action.payload;
    },
  },
});

export const { setSelectedKey } = selectedKeySlice.actions;
export default selectedKeySlice.reducer;
