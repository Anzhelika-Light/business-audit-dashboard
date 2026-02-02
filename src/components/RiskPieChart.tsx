import { Paper, Typography, Box, List, ListItem, ListItemText, Divider, Chip } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ErrorOutline } from "@mui/icons-material";
import type { Audit } from "../types/audit";

interface RiskPieChartProps {
  audits: Audit[];
  isMounted: boolean;
}

export const RiskPieChart = ({ audits,  isMounted }: RiskPieChartProps) => {
  const data = [
    { name: 'High', value: audits.filter(a => a.risk === 'High').length, color: '#d32f2f' },
    { name: 'Medium', value: audits.filter(a => a.risk === 'Medium').length, color: '#ed6c02' },
    { name: 'Low', value: audits.filter(a => a.risk === 'Low').length, color: '#2e7d32' },
  ].filter(item => item.value > 0);

  const highRiskAudits = audits.filter(a => a.risk === 'High');

  return (
    <Paper sx={{ p: 3, mb: 5, borderRadius: 3, display: 'flex', flexDirection: 'column', minHeight: 500 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Risk Distribution</Typography>
      
      <Box sx={{ width: "100%", minWidth: 0 }}>
        {isMounted ? (
          <ResponsiveContainer width="99%" aspect={1} debounce={1}>
            <PieChart>
              <Pie
                data={data}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography color="textSecondary">Loading...</Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#d32f2f', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <ErrorOutline fontSize="small" /> Critical Attention Required ({highRiskAudits.length})
        </Typography>
        <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
          {highRiskAudits.length > 0 ? (
            highRiskAudits.map((audit) => (
              <ListItem key={audit.id} sx={{ px: 0 }}>
                <ListItemText primary={audit.name} secondary={`Budget: ${audit.budget}`} />
                <Chip label="High" size="small" color="error" />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No high-risk issues.</Typography>
          )}
        </List>
      </Box>
    </Paper>
  );
};