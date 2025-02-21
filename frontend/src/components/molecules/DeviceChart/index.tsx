import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DeviceChartProps {
  data: any[];
}

export default function DeviceChart({ data }: DeviceChartProps) {
  const chartData = {
    labels: Array.isArray(data) ? data.map((d) => d.timestamp) : [],
    datasets: [
      {
        label: "Dados do Dispositivo",
        data: Array.isArray(data) ? data.map((d) => d.value) : [],
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", height: "600px" }}> {/* Aumentando a altura do gráfico */}
      <Line data={chartData} />
    </Box>
  );
}