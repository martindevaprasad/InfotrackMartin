import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { experimentalStyled as styled } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyIcon from "@mui/icons-material/Key";
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";
import LogoutIcon from "@mui/icons-material/Logout";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  width: 210,
  height: 130,
  borderRadius: "17px"
}));

export const Cards = () => {
  const CardData = [
    {
      icon: CompareArrowsIcon,
      status: "Moving",
      color: "#348035"
    },
    {
      icon: CancelIcon,
      status: "Stopped",
      color: "#e62602"
    },
    {
      icon: KeyIcon,
      status: "Idle",
      color: "#f98828"
    },
    {
      icon: SignalWifiOffIcon,
      status: "Inactive",
      color: "#929292"
    },
    {
      icon: LogoutIcon,
      status: "Out of service",
      color: "#950d54"
    }
  ];

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 12 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {CardData.map((item, index) => (
          <Grid m={1} item xs={2} sm={2} md={2} lg={2} key={index}>
            <Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Card
                    sx={{
                      width: 60,
                      minHeight: 60,
                      backgroundColor: item.color,
                      position: "static",
                      marginLeft: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <CompareArrowsIcon
                      sx={{ color: "#fff", fontSize: "42px" }}
                    />
                  </Card>
                  <Typography
                    mt={1}
                    ml={1}
                    sx={{
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: item.color
                    }}
                  >
                    70%
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 500, color: "#4295C2" }}
                    m={1}
                  >
                    View details
                  </Typography>
                </div>
                <div>
                  <Typography
                    m={2}
                    sx={{
                      textAlign: "end",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: item.color
                    }}
                  >
                    {item.status}
                  </Typography>
                  <Typography
                    mt={2}
                    mr={2}
                    sx={{ textAlign: "end", fontSize: "24px", fontWeight: 500 }}
                  >
                    264
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "end",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#4295C2"
                    }}
                    m={1}
                  >
                    View on map
                  </Typography>
                </div>
              </div>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
