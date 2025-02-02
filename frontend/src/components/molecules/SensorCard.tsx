import { Card, CardContent, Typography } from "@mui/material";

interface SensorCardProps {
  title: string;
  value: string;
  icon: string;
}

export default function SensorCard({ title, value, icon }: SensorCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {icon} {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}
