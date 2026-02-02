import { Typography, Box } from "@mui/material";
import { AuditTable } from "../components/AuditTable";
import type { Audit } from "../types/audit";

export const AuditsPage = ({
  audits,
  onRowClick,
}: {
  audits: Audit[];
  onRowClick: (a: Audit) => void;
}) => (
  <Box>
    <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
      Audit Database
    </Typography>
    <AuditTable audits={audits} onRowClick={onRowClick} />
  </Box>
);
