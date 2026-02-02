import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Audit } from "../types/audit";

interface AuditState {
  items: Audit[];
  loading: boolean;
  error: string | null;
}

const initialState: AuditState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchAudits = createAsyncThunk("audits/fetchAudits", async () => {
  const response = await axios.get<Audit[]>("http://localhost:3001/audits");
  return response.data;
});

const auditSlice = createSlice({
  name: "audits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAudits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAudits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default auditSlice.reducer;
