import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#f0f1f5",
          200: "#e1e3e9",
          300: "#c2c6d2",
          400: "#a3a9bc",
          500: "#848ca5",
          600: "#656f8f",
          700: "#495273",
          800: "#2c3547",
          900: "#1a1f2b",
        },
        primary: {
          100: "#d3d5e0",
          200: "#a7acc1",
          300: "#7c82a2",
          400: "#2d3452", // Sidebar color in dark mode
          500: "#1a1f33", // Main background in dark mode
          600: "#151a2b",
          700: "#101422",
          800: "#0b0d19",
          900: "#05070f",
        },
        greenAccent: {
          100: "#dbf2e3",
          200: "#b7e6c7",
          300: "#92d9ab",
          400: "#6ecc8f",
          500: "#4ac073", // Primary accent color
          600: "#3b9a5c",
          700: "#2c7345",
          800: "#1e4d2e",
          900: "#0f2617",
        },
        redAccent: {
          100: "#fee7e7",
          200: "#fecfcf",
          300: "#fea3a3",
          400: "#fd7676",
          500: "#fc4a4a",
          600: "#ca3b3b",
          700: "#972c2c",
          800: "#651e1e",
          900: "#320f0f",
        },
        blueAccent: {
          100: "#e5eeff",
          200: "#ccdcff",
          300: "#99b8ff",
          400: "#6695ff",
          500: "#3371ff", // Secondary accent color
          600: "#295acc",
          700: "#1f4499",
          800: "#142d66",
          900: "#0a1733",
        },
      }
    : {
        grey: {
          100: "#1a1f2b",
          200: "#2c3547",
          300: "#495273",
          400: "#656f8f",
          500: "#848ca5",
          600: "#a3a9bc",
          700: "#c2c6d2",
          800: "#e1e3e9",
          900: "#f0f1f5",
        },
        primary: {
          100: "#05070f",
          200: "#0b0d19",
          300: "#101422",
          400: "#f2f0f0", // Light mode card background
          500: "#ffffff", // Light mode main background
          600: "#f0f2f7", // Light mode secondary background
          700: "#7c82a2",
          800: "#a7acc1",
          900: "#d3d5e0",
        },
        greenAccent: {
          100: "#0f2617",
          200: "#1e4d2e",
          300: "#2c7345",
          400: "#3b9a5c",
          500: "#4ac073", // Primary accent color
          600: "#6ecc8f",
          700: "#92d9ab",
          800: "#b7e6c7",
          900: "#dbf2e3",
        },
        redAccent: {
          100: "#320f0f",
          200: "#651e1e",
          300: "#972c2c",
          400: "#ca3b3b",
          500: "#fc4a4a",
          600: "#fd7676",
          700: "#fea3a3",
          800: "#fecfcf",
          900: "#fee7e7",
        },
        blueAccent: {
          100: "#0a1733",
          200: "#142d66",
          300: "#1f4499",
          400: "#295acc",
          500: "#3371ff", // Secondary accent color
          600: "#6695ff",
          700: "#99b8ff",
          800: "#ccdcff",
          900: "#e5eeff",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc", // Keeping the original background color
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
