import { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  IconButton,
  createTheme,
  ThemeProvider,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assessment,
  Warning,
  Brightness4,
  Brightness7,
  Add as AddIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAudits } from "./store/auditSlice";
import type { RootState, AppDispatch } from "./store/index";
import { DashboardPage } from "./pages/DashboardPage";
import { AuditsPage } from "./pages/AuditsPage";
import { RisksPage } from "./pages/RisksPage";
import { AuditDetailsDialog } from "./components/AuditDetailsDialog";
import { AuditFormDialog } from "./components/AuditFormDialog";
import type { Audit } from "./types/audit";

const drawerWidth = 240;

function AppContent() {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("appMode") as "light" | "dark") || "light"
  );
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [auditToEdit, setAuditToEdit] = useState<Audit | null>(null);

  const [formKey, setFormKey] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const {
    items: audits,
    loading,
    error,
  } = useSelector((state: RootState) => state.audits);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode, primary: { main: "#1976d2" } },
        shape: { borderRadius: 12 },
      }),
    [mode]
  );

  useEffect(() => {
    dispatch(fetchAudits());
    localStorage.setItem("appMode", mode);
  }, [mode, dispatch]);

  const handleOpenCreate = () => {
    setAuditToEdit(null);
    setFormKey((prev) => prev + 1);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (audit: Audit) => {
    setAuditToEdit(audit);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setAuditToEdit(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">AUDIT.CORE</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={handleOpenCreate}
              >
                New Audit
              </Button>
              <IconButton
                onClick={() =>
                  setMode((m) => (m === "light" ? "dark" : "light"))
                }
                color="inherit"
              >
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: { width: drawerWidth },
          }}
        >
          <Toolbar />
          <List sx={{ p: 2 }}>
            {[
              { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
              { text: "Audits", icon: <Assessment />, path: "/audits" },
              { text: "Risks", icon: <Warning />, path: "/risks" },
            ].map((item) => (
              <ListItem
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  cursor: "pointer",
                  bgcolor:
                    location.pathname === item.path
                      ? "action.selected"
                      : "transparent",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Container maxWidth="lg">
            {loading && audits.length === 0 ? (
              <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <DashboardPage
                      audits={audits}
                      onRowClick={setSelectedAudit}
                      onEditClick={handleOpenEdit}
                      isMounted={!loading}
                      mode={mode}
                      theme={theme}
                    />
                  }
                />
                <Route
                  path="/audits"
                  element={
                    <AuditsPage
                      audits={audits}
                      onRowClick={setSelectedAudit}
                      onEditClick={handleOpenEdit}
                    />
                  }
                />
                <Route
                  path="/risks"
                  element={
                    <RisksPage
                      audits={audits}
                      isMounted={!loading}
                      mode={mode}
                    />
                  }
                />
              </Routes>
            )}
          </Container>
        </Box>

        <AuditFormDialog
          key={auditToEdit ? `edit-${auditToEdit.id}` : `create-${formKey}`}
          open={isFormOpen}
          onClose={handleCloseForm}
          editData={auditToEdit}
        />

        <AuditDetailsDialog
          open={Boolean(selectedAudit)}
          onClose={() => setSelectedAudit(null)}
          selectedAudit={selectedAudit}
        />
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}
