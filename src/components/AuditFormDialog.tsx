import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { addAudit, updateAudit } from "../store/auditSlice";
import type { Audit } from "../types/audit";

interface AuditFormDialogProps {
  open: boolean;
  onClose: () => void;
  editData: Audit | null;
}

export const AuditFormDialog: React.FC<AuditFormDialogProps> = ({
  open,
  onClose,
  editData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: editData?.name || "",
    risk: editData?.risk || "Low",
    status: editData?.status || "Pending",
    budget: editData?.budget || "",
    details: editData?.details || "",
  });

  const handleSubmit = async () => {
    if (!formData.name) return;
    const rawBudget = formData.budget.toString().trim();
    const formattedBudget = rawBudget
      ? rawBudget.startsWith("$")
        ? rawBudget
        : `$${rawBudget}`
      : "$0";

    if (editData) {
      await dispatch(
        updateAudit({
          ...formData,
          budget: formattedBudget,
          id: editData.id,
        } as Audit)
      );
    } else {
      await dispatch(addAudit({ ...formData, budget: formattedBudget }));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {editData ? "Edit Engagement" : "Initialize New Audit"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
          <TextField
            label="Audit Name"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              select
              label="Risk"
              fullWidth
              value={formData.risk}
              onChange={(e) =>
                setFormData({ ...formData, risk: e.target.value })
              }
            >
              {["Low", "Medium", "High"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              fullWidth
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              {["Pending", "In Progress", "Completed"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TextField
            label="Budget"
            fullWidth
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
          />
          <TextField
            label="Details"
            fullWidth
            multiline
            rows={3}
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.name}
        >
          {editData ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
