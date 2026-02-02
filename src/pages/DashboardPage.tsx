import {
  Typography,
  Stack,
  Button,
  TextField,
  Grid,
  type Theme,
} from "@mui/material";
import {
  Download,
  AttachMoney,
  TrendingUp,
  AssignmentLate,
  AccountBalanceWallet,
} from "@mui/icons-material";
import { StatsCards } from "../components/StatsCards";
import { AuditChart } from "../components/AuditChart";
import { RiskPieChart } from "../components/RiskPieChart";
import { AuditTable } from "../components/AuditTable";
import { useAuditFilters } from "../hooks/useAuditFilters";
import { downloadCSV } from "../utils/exportUtils";
import type { Audit } from "../types/audit";

interface DashboardPageProps {
  audits: Audit[];
  isMounted: boolean;
  mode: "light" | "dark";
  theme: Theme;
  onRowClick: (audit: Audit) => void;
}

export const DashboardPage = ({
  audits,
  isMounted,
  mode,
  theme,
  onRowClick,
}: DashboardPageProps) => {
  const { search, setSearch, filteredAudits, chartData } =
    useAuditFilters(audits);

  const stats = [
    {
      title: "Total Budget",
      value: "$44,100",
      icon: <AttachMoney color="primary" />,
      trend: "+12%",
    },
    {
      title: "Avg ROI",
      value: "245%",
      icon: <TrendingUp color="success" />,
      trend: "+5.4%",
    },
    {
      title: "High Risks",
      value: audits.filter((a: Audit) => a.risk === "High").length.toString(),
      icon: <AssignmentLate color="error" />,
      trend: "Active",
    },
    {
      title: "Efficiency",
      value: "92%",
      icon: <AccountBalanceWallet color="info" />,
      trend: "+2%",
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Executive Overview
        </Typography>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={() => downloadCSV(filteredAudits, "report.csv")}
        >
          Export
        </Button>
      </Stack>

      <StatsCards stats={stats} mode={mode} />

      <TextField
        label="Search"
        size="small"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }} sx={{ minWidth: 0 }}>
          <AuditChart
            isMounted={isMounted}
            chartData={chartData}
            mode={mode}
            theme={theme}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ minWidth: 0 }}>
          <RiskPieChart audits={filteredAudits} isMounted={isMounted} />
        </Grid>
      </Grid>

      <AuditTable audits={filteredAudits} onRowClick={onRowClick} />
    </>
  );
};
