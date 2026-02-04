import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  WarningAmber,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { removeAudit } from "../store/auditSlice";
import type { Audit } from "../types/audit";

interface AuditTableProps {
  audits: Audit[];
  onRowClick: (audit: Audit) => void;
  onEditClick?: (audit: Audit) => void;
}

export const AuditTable: React.FC<AuditTableProps> = ({
  audits,
  onRowClick,
  onEditClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  
  const [deleteConfirmId, setDeleteConfirmId] = useState<
    string | number | null
  >(null);

  const handleDeleteClick = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    setDeleteConfirmId(id);  
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId !== null) {
      dispatch(removeAudit(deleteConfirmId as string | number));
      setDeleteConfirmId(null);
    }
  };

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
        }}
      >
        <Table size="small">
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Risk</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: "right" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audits.map((audit) => (
              <TableRow
                key={audit.id}
                hover
                onClick={() => onRowClick(audit)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell sx={{ py: 1.5 }}>{audit.name}</TableCell>
                <TableCell>
                  <Chip label={audit.status} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={audit.risk}
                    size="small"
                    color={
                      audit.risk === "High"
                        ? "error"
                        : audit.risk === "Medium"
                        ? "warning"
                        : "success"
                    }
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 0.5,
                    }}
                  >
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick?.(audit);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => handleDeleteClick(e, audit.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
      <Dialog
        open={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        disableRestoreFocus
        slotProps={{
          paper: {
            sx: { borderRadius: 3 },
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <WarningAmber color="error" /> Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this engagement? This action
              cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setDeleteConfirmId(null)} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};
