import { createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../services/getUserInfo";

export const baseCurrencyThunk = createAsyncThunk(
  "fetch/currency",
  async (crd, thunkApi) => {
    const { baseName } = thunkApi.getState();
    if (baseName) {
      return thunkApi.rejectWithValue("already have baseName");
    }
    try {
      const data = await userInfo(crd);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("ERROR");
    }
  }
);
