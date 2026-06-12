import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeProviderWrapper = ({ children }) => {
  const themeMode = useSelector((state) => state.ui.theme);

  // Dynamically compute MUI theme on mode change
  const muiTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: '#7c3aed', // violet-600
          light: '#a78bfa',
          dark: '#5b21b6',
        },
        secondary: {
          main: '#4f46e5', // indigo-600
        },
        background: {
          default: themeMode === 'dark' ? '#0f172a' : '#f8fafc',
          paper: themeMode === 'dark' ? '#1e293b' : '#ffffff',
        },
        text: {
          primary: themeMode === 'dark' ? '#f8fafc' : '#0f172a',
          secondary: themeMode === 'dark' ? '#94a3b8' : '#475569',
        },
      },
      typography: {
        fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 500 },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '12px',
              padding: '8px 16px',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none', // Remove default dark mode overlay
            },
          },
        },
      },
    });
  }, [themeMode]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
