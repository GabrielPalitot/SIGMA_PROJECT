"use client";

import { Box, Button } from "@mui/material";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SensorGrid from "@/components/organisms/SensorGrid";
import Map from "@/components/organisms/Map";
import { useState } from "react";
import DeviceSelectorDialog from "@/components/molecules/DeviceSelectorDialog";

export default function Dashboard() {
  const [selectedDevice, setSelectedDevice] = useState<any | null>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={50} minSize={20} maxSize={80}>
        <Box
          sx={{
            padding: 3,
            overflowY: "auto",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            {selectedDevice
              ? `Dispositivo Selecionado: ${selectedDevice.id_esp}`
              : "Selecionar Dispositivo"}
          </Button>
          
          <SensorGrid selectedDevice={selectedDevice} />
        </Box>
      </Panel>

      <PanelResizeHandle
        style={{
          width: "4px",
          backgroundColor: "#aaa",
          cursor: "ew-resize",
          transition: "background-color 0.2s",
        }}
      />

      <Panel defaultSize={50} minSize={20} maxSize={80}>
        <Box sx={{ height: "100vh" }}>
          <Map selectedDevice={selectedDevice} />
        </Box>
      </Panel>

      <DeviceSelectorDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelectDevice={(device) => setSelectedDevice(device)}
      />
    </PanelGroup>
  );
}