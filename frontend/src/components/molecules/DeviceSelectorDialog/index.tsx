import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";

interface DeviceSelectorDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectDevice: (device: any) => void;
}

export default function DeviceSelectorDialog({
  open,
  onClose,
  onSelectDevice,
}: DeviceSelectorDialogProps) {
  const [devices, setDevices] = useState<any[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8500";
  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/iot-device/`)
        .then((response) => {
          setDevices(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dispositivos IoT", error);
        });
    }
  }, [open]);

  const handleConfirm = async () => {
    const selectedDevice = devices.find((d) => d.id_esp === selectedDeviceId);
    if (selectedDevice) {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setHours(endDate.getHours() - 6);

        const response = await axios.get(
          `${API_BASE_URL}/measurements/${selectedDeviceId}/timestamps`,
          {
            params: {
              timestampInit: startDate.toISOString(),
              timestampEnd: endDate.toISOString(),
            },
          },
        );

        const deviceData = {
          ...selectedDevice,
          data: response.data,
        };
        onSelectDevice(deviceData);
        onClose();
      } catch (error) {
        console.error("Erro ao buscar dados do dispositivo", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Selecionar Dispositivo</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2, minWidth: 300 }}>
          <FormControl fullWidth>
            <TextField
              value={selectedDeviceId}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              select
              label="Selecione o Dispositivo"
              variant="outlined"
              fullWidth
            >
              {devices.map((device) => (
                <MenuItem key={device.id_esp} value={device.id_esp}>
                  {`${device.id_esp} (${device.state} - ${device.city})`}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          disabled={!selectedDeviceId}
        >
          Selecionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
