import React from "react";
import { Typography, Stack, Button, TextField, Box } from "@mui/material";
import { Download } from "@mui/icons-material";
import { AuditTable } from "../components/AuditTable";
import { useAuditFilters } from "../hooks/useAuditFilters";
import { downloadCSV } from "../utils/exportUtils";
import type { Audit } from "../types/audit";

interface AuditsPageProps {
  audits: Audit[];
  onRowClick: (audit: Audit) => void;
  onEditClick: (audit: Audit) => void;
}

export const AuditsPage: React.FC<AuditsPageProps> = ({
  audits,
  onRowClick,
  onEditClick,
}) => {
  const { search, setSearch, filteredAudits } = useAuditFilters(audits);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {" "}
          Audit Engagements{" "}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={() => downloadCSV(filteredAudits, "audits.csv")}
        >
          Export
        </Button>
      </Stack>

      <TextField
        label="Filter by name, status or risk..."
        size="small"
        fullWidth
        sx={{ mb: 4 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <AuditTable
        audits={filteredAudits}
        onRowClick={onRowClick}
        onEditClick={onEditClick}
      />
    </Box>
  );
};
