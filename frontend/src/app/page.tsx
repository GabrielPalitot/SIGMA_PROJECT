"use client";

import { Typography, Box } from "@mui/material";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SensorGrid from "@/components/organisms/SensorGrid";
import Map from "@/components/organisms/Map";

export default function Dashboard() {
  return (
    <PanelGroup direction="horizontal">
      {/* Lado Esquerdo - Informações */}
      <Panel defaultSize={50} minSize={20} maxSize={80}>
        <Box
          sx={{
            padding: 3,
            overflowY: "auto",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <SensorGrid />
          </Box>
        </Box>
      </Panel>

      {/* Divisor Arrastável */}
      <PanelResizeHandle
        style={{
          width: "4px",
          backgroundColor: "#aaa",
          cursor: "ew-resize",
          transition: "background-color 0.2s",
        }}
      />

      {/* Lado Direito - Mapa */}
      <Panel defaultSize={50} minSize={20} maxSize={80}>
        <Box sx={{ height: "100vh" }}>
          <Map />
        </Box>
      </Panel>
    </PanelGroup>
  );
}
