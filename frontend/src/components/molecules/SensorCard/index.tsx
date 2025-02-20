import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { lightBlue } from "@mui/material/colors";

export interface SensorCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function SensorCard({ title, value, icon }: SensorCardProps) {
  return (
    <Card sx={{ backgroundColor: lightBlue[100] }}>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h6">
          {icon} {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}
