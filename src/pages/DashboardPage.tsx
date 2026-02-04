import React from "react";
import {
  Typography,
  Stack,
  Button,
  TextField,
  Grid,
  type Theme,
  Box,
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
  onEditClick: (audit: Audit) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  audits,
  isMounted,
  mode,
  theme,
  onRowClick,
  onEditClick,
}) => {
  const { search, setSearch, filteredAudits, chartData } =
    useAuditFilters(audits);

  const formattedChartData = chartData.map(
    (item: { name: string; budget: number }) => ({
      name: item.name,
      value: item.budget,
    })
  );

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
      value: audits.filter((a) => a.risk === "High").length.toString(),
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
        label="Search audits..."
        size="small"
        fullWidth
        sx={{ mb: 3, mt: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              minWidth: 0,
            }}
          >
            <AuditChart
              isMounted={isMounted}
              chartData={formattedChartData}
              mode={mode}
              theme={theme}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
              minWidth: 0, 
            }}
          >
            <RiskPieChart audits={filteredAudits} isMounted={isMounted} />
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Recent Engagements
      </Typography>
      <AuditTable
        audits={filteredAudits}
        onRowClick={onRowClick}
        onEditClick={onEditClick}
      />
    </>
  );
};
