import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import ChartDialog from "@/components/molecules/chartDialog";

interface SensorCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  device: any;
  dataKey: string; // Adicionando uma prop para especificar a chave dos dados
}

export default function SensorCard({ title, value, icon, device, dataKey }: SensorCardProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Filtrando e ordenando os dados de acordo com a chave especificada
  const filteredData = (device?.data?.map((d: any) => ({
    timestamp: d.measurement_time,
    value: d[dataKey],
  })) || []).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return (
    <>
      <Card onClick={() => setDialogOpen(true)}>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="h6">{value}</Typography>
          {icon}
        </CardContent>
      </Card>
      <ChartDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        data={filteredData}
      />
    </>
  );
}