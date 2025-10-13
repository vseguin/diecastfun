import { createTheme } from "@mui/material/styles";

// Shared style constants
export const gradients = {
  primary: "linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)",
  subtle:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(163, 163, 163, 0.05) 100%)",
  subtleReverse:
    "linear-gradient(135deg, rgba(163, 163, 163, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%)",
  subtleHover:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(163, 163, 163, 0.08) 100%)",
  subtleHoverReverse:
    "linear-gradient(135deg, rgba(163, 163, 163, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%)",
};

export const overlays = {
  light: "rgba(255, 255, 255, 0.1)",
  lighter: "rgba(255, 255, 255, 0.15)",
  medium: "rgba(255, 255, 255, 0.2)",
  dark: "rgba(10, 10, 10, 0.5)",
  darker: "rgba(10, 10, 10, 0.8)",
};

export const borders = {
  default: `1px solid ${overlays.light}`,
  hover: `1px solid ${overlays.medium}`,
  subtle: `1px solid ${overlays.lighter}`,
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      light: "#f5f5f5",
      dark: "#e5e5e5",
    },
    secondary: {
      main: "#a3a3a3",
      light: "#d4d4d4",
      dark: "#737373",
    },
    background: {
      default: "#0a0a0a",
      paper: "#171717",
    },
    text: {
      primary: "#fafafa",
      secondary: "#a3a3a3",
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.005em",
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#171717",
          border: borders.default,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
            borderColor: overlays.medium,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: overlays.darker,
          backdropFilter: "blur(12px)",
          borderBottom: borders.default,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(23, 23, 23, 0.6)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(23, 23, 23, 0.8)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(23, 23, 23, 1)",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
  },
});
