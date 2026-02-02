import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Chip,
    Box
  } from "@mui/material";
  import type { Audit } from "../types/audit";
  
  interface AuditDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    selectedAudit: Audit | null;
  }
  
  export const AuditDetailsDialog = ({ open, onClose, selectedAudit }: AuditDetailsDialogProps) => {
    
    const getStatusColor = (status: string): "success" | "warning" | "default" | "primary" => {
      switch (status) {
        case "Completed": return "success";
        case "In Progress": return "warning";
        case "Pending": return "default";
        default: return "primary";
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Audit Details: {selectedAudit?.name}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Current Status
            </Typography>
            <Chip
              label={selectedAudit?.status}
              color={getStatusColor(selectedAudit?.status || "")}
              sx={{ mt: 0.5 }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "action.selected",
              borderRadius: 2,
            }}
          >
            {selectedAudit?.details}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };