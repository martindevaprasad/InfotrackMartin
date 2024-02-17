import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "./listItems";
import Chart from "./Chart";
import MyMap from "../Maps/MyMap";
import CustomPaginationActionsTable, { CustomTable } from "./Orders";
import { useSelector } from "react-redux";
import { Cards } from "./Cards";
import { Avatar, Tooltip } from "@mui/material";
import Charct from "../../assets/avatar.png";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const defaultTheme = createTheme();

export default function DashBoard() {
  const [open, setOpen] = React.useState(true);
  const tableData = useSelector((state) =>
    state.data.items.filter((item) => !item.isDeleted === true)
  );
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const markers = [{ lat: -34.397, lng: 150.644 }];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{
            backgroundColor: "#fff"
          }}
          position="absolute"
          open={open}
        >
          <Toolbar
            sx={{
              pr: "24px",
              display: "flex",
              ...(open && { justifyContent: "flex-end" })
            }}
          >
            <IconButton
              edge="start"
              color="default"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" })
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={Charct} />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: [1]
            }}
          >
            <Typography sx={{ fontSize: "32px", color: "#bd323e" }}>
              Info<span style={{ color: "#303c7b" }}>Track</span>
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto"
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h6" ml={4} mt={2}>
              Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item mb={2} xs={12} md={12} lg={12}>
                <Cards />
              </Grid>
            </Grid>
            <Typography variant="h6" ml={4} mt={2}>
              Track on Maps
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 280
                  }}
                >
                  <MyMap markers={markers} />
                </Paper>
              </Grid>
            </Grid>
            <Typography variant="h6" m={1}>
              Selected Record
            </Typography>
            <Grid container spacing={3}>
              <Grid mt={2} item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 280
                  }}
                >
                  <CustomTable data={tableData} highlightId={selectedRowId} />
                </Paper>
              </Grid>

              <Grid mt={2} item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 280
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              <Typography variant="h6" ml={4} mt={2}>
                Records
              </Typography>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <CustomPaginationActionsTable
                    selectedRowId={selectedRowId}
                    setSelectedRowId={setSelectedRowId}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
