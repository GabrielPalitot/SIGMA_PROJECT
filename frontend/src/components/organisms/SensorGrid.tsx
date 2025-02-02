import Grid from "@mui/material/Grid2";
import SensorCard from "../molecules/SensorCard";

const sensorData = [
  { title: "Rain", value: "7.1 mm", icon: "↓" },
  { title: "Temperature", value: "29.8°C", icon: "📊" },
  { title: "Air Humidity", value: "59.8%", icon: "☀️" },
  { title: "Soil Humidity", value: "36.8%", icon: "☀️" },
];

export default function SensorGrid() {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        display: "flex",
        flexWrap: "wrap", // Garante que os elementos quebrem corretamente
      }}
    >
      {sensorData.map((sensor, index) => (
        <Grid
          key={index}
          sx={{
            width: { xs: "100%", sm: "48%", md: "23%" }, // 🟢 Responsivo de verdade
            flexGrow: 1,
            minWidth: "200px", // 🔹 Garante que os cards não fiquem muito pequenos
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SensorCard
            title={sensor.title}
            value={sensor.value}
            icon={sensor.icon}
          />
        </Grid>
      ))}
    </Grid>
  );
}
