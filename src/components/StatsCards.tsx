import { Box, Card, CardContent, Typography,  Grid } from "@mui/material";

interface StatsCardsProps {
  stats: any[];
  mode: 'light' | 'dark';
}

export const StatsCards = ({ stats, mode }: StatsCardsProps) => (
  <Grid container spacing={3} sx={{ mb: 5 }}>
    {stats.map((stat, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
        <Card sx={{ height: "100%", borderRadius: 3, transition: "transform 0.3s", "&:hover": { transform: "translateY(-8px)" } }}>
          <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <Box sx={{ mb: 1, p: 1, borderRadius: "50%", backgroundColor: mode === 'light' ? "#f0f4ff" : "#333" }}>
              {stat.icon}
            </Box>
            <Typography color="textSecondary" variant="subtitle2" sx={{ fontWeight: "bold" }}>{stat.title}</Typography>
            <Typography variant="h5" sx={{ my: 1, fontWeight: "bold" }}>{stat.value}</Typography>
            <Typography variant="caption" sx={{ color: stat.trend.includes("+") ? "green" : "gray" }}>
              {stat.trend} from last month
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);