import axios from "axios";
import type { Audit } from "../types/audit";

const API_URL = "http://localhost:3001/audits";

export const auditApi = {
  getAudits: async () => {
    const response = await axios.get<Audit[]>(API_URL);
    return response.data;
  },
  createAudit: async (newAudit: Omit<Audit, "id">) => {
    const response = await axios.post<Audit>(API_URL, newAudit);
    return response.data;
  },
  updateAudit: async (audit: Audit) => {
    const response = await axios.put<Audit>(`${API_URL}/${audit.id}`, audit);
    return response.data;
  },
  deleteAudit: async (id: string | number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
};
