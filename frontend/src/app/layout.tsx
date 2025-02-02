import ThemeRegistry from "@/config/ThemeRegistry";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeRegistry>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Sensor Dashboard</Typography>
            </Toolbar>
          </AppBar>
          <main style={{ padding: "20px" }}>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
