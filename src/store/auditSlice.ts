import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auditApi } from "../api/auditApi";
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
  return await auditApi.getAudits();
});

export const addAudit = createAsyncThunk(
  "audits/addAudit",
  async (newAudit: Omit<Audit, "id">) => {
    return await auditApi.createAudit(newAudit);
  }
);

export const updateAudit = createAsyncThunk(
  "audits/updateAudit",
  async (audit: Audit) => {
    return await auditApi.updateAudit(audit);
  }
);

export const removeAudit = createAsyncThunk(
  "audits/removeAudit",
  async (id: string | number) => {
    return await auditApi.deleteAudit(id);
  }
);

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
      .addCase(addAudit.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAudit.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeAudit.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (audit) => audit.id !== action.payload
        );
      });
  },
});

export default auditSlice.reducer;
