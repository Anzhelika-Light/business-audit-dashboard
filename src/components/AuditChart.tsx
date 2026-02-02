import { Paper, Typography, Box } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface AuditChartProps {
  isMounted: boolean;
  chartData: any[];
  mode: 'light' | 'dark';
  theme: any;
}

export const AuditChart = ({ isMounted, chartData, mode, theme }: AuditChartProps) => {
  return (
    <Paper sx={{ p: 3, mb: 5, borderRadius: 3, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "medium" }}>Budget Distribution</Typography>
      <Box sx={{ width: "100%", minWidth: 0 }}>
        {isMounted && chartData.length > 0 ? (
          <ResponsiveContainer width="99%" aspect={2} debounce={1}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mode === 'dark' ? "#444" : "#eee"} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10, fill: mode === 'dark' ? '#aaa' : '#666' }} 
                interval={0} 
                angle={-15} 
                textAnchor="end" 
              />
              <YAxis 
                tickFormatter={(v) => `$${v}`} 
                tick={{ fontSize: 12, fill: mode === 'dark' ? '#aaa' : '#666' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.palette.background.paper, 
                  borderRadius: "10px", 
                  border: "none" 
                }} 
              />
              <Bar dataKey="budget" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography color="textSecondary">Initializing chart area...</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};