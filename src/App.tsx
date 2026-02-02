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
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assessment,
  Warning,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { fetchAudits } from "./store/auditSlice";
import type { RootState, AppDispatch } from "./store";

import { DashboardPage } from "./pages/DashboardPage";
import { AuditsPage } from "./pages/AuditsPage";
import { RisksPage } from "./pages/RisksPage";
import { AuditDetailsDialog } from "./components/AuditDetailsDialog";
import type { Audit } from "./types/audit";

const drawerWidth = 240;

function AppContent() {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("appMode") as "light" | "dark") || "light"
  );
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);

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
        palette: {
          mode,
          primary: { main: "#1976d2" },
          background: {
            default: mode === "light" ? "#f4f6f8" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
        },
        shape: { borderRadius: 12 },
      }),
    [mode]
  );

  useEffect(() => {
    dispatch(fetchAudits());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("appMode", mode);
  }, [mode]);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Audits", icon: <Assessment />, path: "/audits" },
    { text: "Risk Reports", icon: <Warning />, path: "/risks" },
  ];

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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Business Audit Pro
            </Typography>
            <IconButton
              onClick={() => setMode((p) => (p === "light" ? "dark" : "light"))}
              color="inherit"
            >
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, borderRight: "none" },
          }}
        >
          <Toolbar />
          <List sx={{ px: 1, mt: 2 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  sx={{
                    cursor: "pointer",
                    bgcolor: isActive ? "action.selected" : "transparent",
                    color: isActive ? "primary.main" : "inherit",
                    mb: 1,
                    borderRadius: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{ color: isActive ? "primary.main" : "inherit" }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: isActive ? "bold" : "medium" }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <Toolbar />
          <Container maxWidth="lg">
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <DashboardPage
                      key={`dash-${mode}`}
                      audits={audits}
                      isMounted={true}
                      mode={mode}
                      theme={theme}
                      onRowClick={setSelectedAudit}
                    />
                  }
                />
                <Route
                  path="/audits"
                  element={
                    <AuditsPage audits={audits} onRowClick={setSelectedAudit} />
                  }
                />
                <Route
                  path="/risks"
                  element={
                    <RisksPage
                      key={`risks-${mode}`}
                      audits={audits}
                      isMounted={true}
                      mode={mode}
                    />
                  }
                />
              </Routes>
            )}

            <AuditDetailsDialog
              open={Boolean(selectedAudit)}
              onClose={() => setSelectedAudit(null)}
              selectedAudit={selectedAudit}
            />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Router>
      {" "}
      <AppContent />{" "}
    </Router>
  );
}
