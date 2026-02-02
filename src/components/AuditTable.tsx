import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography } from "@mui/material";
import type { Audit } from "../types/audit";

interface AuditTableProps {
  audits: Audit[];
  onRowClick: (audit: Audit) => void;
}

export const AuditTable = ({ audits, onRowClick }: AuditTableProps) => {
  const getRiskColor = (risk: string) => {
    if (risk === "High") return "error";
    if (risk === "Medium") return "warning";
    return "success";
  };

  if (audits.length === 0) return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Typography color="textSecondary">No audits found.</Typography>
    </Paper>
  );

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead sx={{ bgcolor: "action.hover" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Risk</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Budget</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {audits.map((audit) => (
            <TableRow key={audit.id} hover onClick={() => onRowClick(audit)} sx={{ cursor: "pointer" }}>
              <TableCell>{audit.name}</TableCell>
              <TableCell><Chip label={audit.status} size="small" variant="outlined" /></TableCell>
              <TableCell><Chip label={audit.risk} color={getRiskColor(audit.risk)} size="small" /></TableCell>
              <TableCell>{audit.budget}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};