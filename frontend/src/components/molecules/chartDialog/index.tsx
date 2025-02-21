import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DeviceChart from "../DeviceChart";

interface ChartDialogProps {
  open: boolean;
  onClose: () => void;
  data: any[];
}

export default function ChartDialog({ open, onClose, data }: ChartDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Gráfico de Dados do Dispositivo</DialogTitle>
      <DialogContent>
        <DeviceChart data={data} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}