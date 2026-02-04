import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  type ChipProps,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import type { Audit } from "../types/audit";

interface AuditDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  selectedAudit: Audit | null;
}

export const AuditDetailsDialog: React.FC<AuditDetailsDialogProps> = ({
  open,
  onClose,
  selectedAudit,
}) => {
  if (!selectedAudit) return null;

  const getRiskColor = (risk: string): ChipProps["color"] => {
    switch (risk) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {selectedAudit.name}
          <Chip
            label={selectedAudit.risk}
            color={getRiskColor(selectedAudit.risk)}
            size="small"
          />
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Execution Status
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {selectedAudit.status}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Allocated Budget
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "primary.main" }}
            >
              {selectedAudit.budget}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "text.secondary",
                textTransform: "uppercase",
                fontSize: "0.75rem",
              }}
            >
              Project Context & Details
            </Typography>
            <Box
              sx={{
                p: 2.5,
                bgcolor: "action.hover",
                borderRadius: 2,
                borderLeft: "4px solid",
                borderColor: "primary.main",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.7,
                  color: "text.primary",
                }}
              >
                {selectedAudit.details ||
                  "No project documentation has been attached to this record."}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2.5 }}>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{
            py: 1.2,
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: "none",
          }}
        >
          Close Preview
        </Button>
      </DialogActions>
    </Dialog>
  );
};
