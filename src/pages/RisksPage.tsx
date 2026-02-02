import { Typography, Box, Grid, Paper, Stack } from "@mui/material";
import { RiskPieChart } from "../components/RiskPieChart";
import type { Audit } from "../types/audit";

interface RisksPageProps {
  audits: Audit[];
  isMounted: boolean;
  mode: "light" | "dark";
}

export const RisksPage = ({ audits, isMounted, mode }: RisksPageProps) => {
  const highRiskCount = audits.filter((a) => a.risk === "High").length;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Risk Analysis Report
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }} sx={{ minWidth: 0 }}>
          <RiskPieChart audits={audits} isMounted={isMounted} />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3}>
            <Paper
              sx={{
                p: 3,
                borderLeft: "5px solid #d32f2f",
                bgcolor: mode === "dark" ? "rgba(211, 47, 47, 0.1)" : "#fff5f5",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                color="error"
                sx={{ fontWeight: "bold" }}
              >
                Executive Action Required
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Currently, <strong>{highRiskCount}</strong> items are identified
                as high-risk. Immediate review and mitigation strategies are
                recommended.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                System Status
              </Typography>
              <Typography variant="body2" color="textSecondary">
                All monitoring systems are active. Risk assessment data is
                updated in real-time.
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
