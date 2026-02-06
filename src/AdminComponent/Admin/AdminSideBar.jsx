import React from "react";
import { Drawer, Divider, useMediaQuery, Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

const menu = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/restaurants" },
  { title: "Orders", icon: <ShoppingBagIcon />, path: "/restaurants/orders" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/restaurants/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/restaurants/category" },
  { title: "Ingredients", icon: <FastfoodIcon />, path: "/restaurants/ingredients" },
  { title: "Events", icon: <EventIcon />, path: "/restaurants/event" },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/restaurants/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export const AdminSideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      localStorage.removeItem("jwt");
      localStorage.removeItem("quickeats_user");
      localStorage.removeItem("quickeats_restaurant");
      localStorage.removeItem("quickeats_menu_items"); 
      navigate("/");
      if (handleClose) handleClose();
      return;
    }

    navigate(`/admin${item.path}`);
    if (isSmallScreen && handleClose) handleClose();
  };

  const isActive = (path) => {
    const fullPath = `/admin${path}`;
    return location.pathname === fullPath;
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={true}
      anchor="left"
      sx={{
        zIndex: 1,
        "& .MuiDrawer-paper": {
          width: isSmallScreen ? "70vw" : "20vw",
          backgroundColor: "#0f0f0f",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: 3,
        }}
      >
        
        <Box sx={{ px: 1, mb: 2 }}>
          <Typography
            sx={{
              color: "white",
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: 0.5,
            }}
          >
            QuickEats Admin
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
            Manage your restaurant
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

      
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {menu.map((item, i) => {
            const active = item.title !== "Logout" && isActive(item.path);

            return (
              <React.Fragment key={item.title}>
                <Box
                  onClick={() => handleNavigate(item)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1.5,
                    py: 1.2,
                    cursor: "pointer",
                    borderRadius: "12px",
                    transition: "0.2s",
                    userSelect: "none",

                    color:
                      item.title === "Logout"
                        ? "#ef4444"
                        : active
                        ? "white"
                        : "rgba(255,255,255,0.75)",

                    background:
                      item.title === "Logout"
                        ? "rgba(239,68,68,0.10)"
                        : active
                        ? "rgba(225,29,72,0.18)"
                        : "transparent",

                    border:
                      item.title === "Logout"
                        ? "1px solid rgba(239,68,68,0.20)"
                        : active
                        ? "1px solid rgba(225,29,72,0.35)"
                        : "1px solid rgba(255,255,255,0.08)",

                    "&:hover": {
                      background:
                        item.title === "Logout"
                          ? "rgba(239,68,68,0.16)"
                          : "rgba(255,255,255,0.06)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {item.icon}
                  </Box>

                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                    {item.title}
                  </Typography>
                </Box>

                {/* Divider خفيف بعد اللوج اوت */}
                {i === menu.length - 2 && (
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 2 }} />
                )}
              </React.Fragment>
            );
          })}
        </Box>

       
        <Box sx={{ flex: 1 }} />

       
        <Box
          sx={{
            mt: 2,
            px: 1,
            py: 1.5,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>
            Status:
          </Typography>
          <Typography sx={{ color: "white", fontWeight: 800, fontSize: 13 }}>
            Admin Panel Ready ✅
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};
