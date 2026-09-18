import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9146ff", contrastText: "#ffffff" },
    secondary: { main: "#3f3f46", contrastText: "#ffffff" },
    success: { main: "#16a34a" },
    error: { main: "#ef4444" },
    background: { default: "#0e0e10", paper: "#1f1f23" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif",
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { paddingInline: 20, paddingBlock: 10 } },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: true, enterTouchDelay: 0 },
    },
  },
});

export default theme;
