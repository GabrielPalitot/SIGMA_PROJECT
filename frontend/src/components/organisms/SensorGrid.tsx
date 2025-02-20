import Grid from "@mui/material/Grid2";
import SensorCard from "../molecules/SensorCard";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacitySharpIcon from '@mui/icons-material/OpacitySharp';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';

const sensorData = [
  { title: "Chuva", value: "7.1 mm", icon: <ThunderstormOutlinedIcon color="info" /> },
  { title: "Temperatura", value: "29.8°C", icon: <ThermostatIcon color="warning" /> },
  { title: "Umidade do Ar", value: "59.8%", icon: <AirOutlinedIcon color="info" /> },
  { title: "Umidade do Solo", value: "36.8%", icon: <OpacitySharpIcon color="info" /> },
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
            // display: "flex",
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
