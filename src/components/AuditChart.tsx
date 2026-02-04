import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, useTheme, Typography } from "@mui/material";
import type { Theme } from "@mui/material";

interface AuditChartProps {
  isMounted: boolean;
  chartData: { name: string; value: number }[];
  mode: "light" | "dark";
  theme: Theme;
}

export const AuditChart: React.FC<AuditChartProps> = ({
  isMounted,
  chartData,
}) => {
  const theme = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const dataWithColors = chartData.map((item, index) => ({
    ...item,

    fill:
      index % 2 === 0
        ? theme.palette.primary.main
        : theme.palette.primary.light,
  }));

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
        Budget Allocation by Audit
      </Typography>

      {isMounted && ready && dataWithColors.length > 0 ? (
        <ResponsiveContainer width="99%" height={300}>
          <BarChart
            data={dataWithColors}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme.palette.divider}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: theme.palette.action.hover }}
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
              }}
            />

            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              barSize={40}
              fill="currentColor"
            />
          </BarChart>
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
          <Typography color="text.secondary">Loading chart...</Typography>
        </Box>
      )}
    </Box>
  );
};
