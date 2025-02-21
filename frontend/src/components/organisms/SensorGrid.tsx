import Grid from "@mui/material/Grid2";
import SensorCard from "../molecules/SensorCard";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacitySharpIcon from "@mui/icons-material/OpacitySharp";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";

const sensorData = [
  {
    title: "Chuva",
    value: "7.1 mm",
    icon: <ThunderstormOutlinedIcon color="info" />,
    dataKey: "has_rain", // Adicionando a chave dos dados
  },
  {
    title: "Temperatura",
    value: "29.8°C",
    icon: <ThermostatIcon color="warning" />,
    dataKey: "temperature", // Adicionando a chave dos dados
  },
  {
    title: "Umidade do Ar",
    value: "59.8%",
    icon: <AirOutlinedIcon color="info" />,
    dataKey: "air_humidity", // Adicionando a chave dos dados
  },
  {
    title: "Umidade do Solo",
    value: "36.8%",
    icon: <OpacitySharpIcon color="info" />,
    dataKey: "solo_humidity", // Adicionando a chave dos dados
  },
];

interface SensorGridProps {
  selectedDevice: any;
}

export default function SensorGrid({ selectedDevice }: SensorGridProps) {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {sensorData.map((sensor, index) => (
        <Grid
          key={index}
          sx={{
            width: { xs: "100%", sm: "48%", md: "23%" },
            flexGrow: 1,
            minWidth: "200px",
            justifyContent: "center",
          }}
        >
          <SensorCard
            title={sensor.title}
            value={sensor.value}
            icon={sensor.icon}
            device={selectedDevice}
            dataKey={sensor.dataKey} // Passando a chave dos dados
          />
        </Grid>
      ))}
    </Grid>
  );
}