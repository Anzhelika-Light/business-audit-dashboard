import React from "react";
import { Grid, Card, CardContent, Typography, Box, Stack } from "@mui/material";

interface StatItem {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

interface StatsCardsProps {
  stats: StatItem[];
  mode: "light" | "dark";
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "none",
              border: "1px solid",
              borderColor: "divider",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 4px 20px rgba(0,0,0,0.5)"
                    : "0 4px 20px rgba(0,0,0,0.05)",
              },
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ mb: 2 }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)",
                    display: "flex",
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "bold",
                    color: stat.trend.startsWith("+")
                      ? "success.main"
                      : "text.secondary",
                    bgcolor: stat.trend.startsWith("+")
                      ? "success.light"
                      : "transparent",
                    px: 1,
                    borderRadius: 1,
                    opacity: 0.8,
                  }}
                >
                  {stat.trend}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                {stat.title}
              </Typography>
              <Typography variant="h5" sx={{ mt: 0.5, fontWeight: "bold" }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
