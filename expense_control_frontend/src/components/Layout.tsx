import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from "@mui/material";
import { modalStyleSaveExternal, useStylesGlobal } from "../Styles";


const theme = createTheme({
    typography: {
      fontFamily: [
        '"Istok Web"',
      ].join(','),
      fontSize: 20,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: '"Istok Web"', // Apply font family to the entire body
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: '"Istok Web"', // Apply font family to all buttons
            textTransform: 'none', 
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              marginTop: 4
            },
            '&.MuiInputLabel-shrink': {
              marginTop: 4
            },
          },
        },
      },
    },
  })

const Layout = () => {
  const { classes } = useStylesGlobal();
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />   
        <Box 
          className={`${classes[`main_background_color`]} ${classes[`modal_color`]}`}
          sx={modalStyleSaveExternal}
        >
          <main className="App">
            <Outlet />
          </main>
        </Box>
      </ThemeProvider>
    )
}

export default Layout