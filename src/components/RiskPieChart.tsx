import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import type { Audit } from "../types/audit";

interface RiskPieChartProps {
  audits: Audit[];
  isMounted: boolean;
}

export const RiskPieChart: React.FC<RiskPieChartProps> = ({
  audits,
  isMounted,
}) => {
  const theme = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    {
      name: "Low",
      value: audits.filter((a) => a.risk === "Low").length,
      fill: theme.palette.success.main,
    },
    {
      name: "Medium",
      value: audits.filter((a) => a.risk === "Medium").length,
      fill: theme.palette.warning.main,
    },
    {
      name: "High",
      value: audits.filter((a) => a.risk === "High").length,
      fill: theme.palette.error.main,
    },
  ].filter((item) => item.value > 0);

  return (
    <Box
      sx={{
        width: "100%",
        height: 350,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
        Risk Distribution
      </Typography>

      {isMounted && ready && data.length > 0 ? (
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
              stroke="none"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="text.secondary">
            {data.length === 0 && isMounted
              ? "No risk data"
              : "Loading risks..."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
