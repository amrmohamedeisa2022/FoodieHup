import React, { useState } from "react";
import {
  Drawer,
  Divider,
  useMediaQuery,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import api from "../../api/api";

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

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isActive = (path) => location.pathname === `/admin${path}`;

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const confirmDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("quickeats_token");

      await api.delete("/api/users/deleteProfile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.clear();
      navigate("/signup");

    } catch (err) {
      console.log(err);
      alert("Failed to delete account");
    }
  };

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      setLogoutOpen(true);
      return;
    }

    navigate(`/admin${item.path}`);
    if (isSmallScreen && handleClose) handleClose();
  };

  return (
    <>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={true}
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            width: isSmallScreen ? "70vw" : "20vw",
            backgroundColor: "#0f0f0f",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      >
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", px: 2, py: 3 }}>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {menu.map((item) => {
              const active = item.title !== "Logout" && isActive(item.path);

              return (
                <Box
                  key={item.title}
                  onClick={() => handleNavigate(item)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1.5,
                    py: 1.2,
                    cursor: "pointer",
                    borderRadius: "12px",
                    color: item.title === "Logout" ? "#ef4444" : active ? "white" : "rgba(255,255,255,0.75)",
                    background: item.title === "Logout" ? "rgba(239,68,68,0.10)" : active ? "rgba(225,29,72,0.18)" : "transparent",
                    border: "1px solid rgba(255,255,255,0.08)"
                  }}
                >
                  {item.icon}
                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                    {item.title}
                  </Typography>
                </Box>
              );
            })}

            {/* Delete Account */}
            <Box
              onClick={() => setDeleteOpen(true)}
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.2,
                cursor: "pointer",
                borderRadius: "12px",
                color: "#ef4444",
                background: "rgba(239,68,68,0.10)",
                border: "1px solid rgba(239,68,68,0.20)",
              }}
            >
              <DeleteForeverIcon />
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                Delete Account
              </Typography>
            </Box>
          </Box>

        </Box>
      </Drawer>

      {/* Logout Dialog */}
      <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>Are you sure you want to logout?</DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          Are you sure you want to permanently delete your account?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDeleteAccount}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
