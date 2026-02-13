import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Paper,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from "@mui/material";
import { setUsersRestaurant } from "../../state/restaurant/restaurant.reducer";
import api from "../../api/api";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

export const RestaurantDashboard = () => {

  const dispatch = useDispatch();
  const data = useSelector((store) => store.restaurant.usersRestaurant);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggleStatus = async () => {
    try {
      const token = localStorage.getItem("jwt");

      const res = await api.put(
        `/api/admin/restaurants/${data.id}/status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(setUsersRestaurant(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/api/admin/restaurants/${data.id}`);
      dispatch(setUsersRestaurant(null));
      window.location.href = "/admin/restaurants/create";
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const res = await api.get("/api/admin/restaurants/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setUsersRestaurant(res.data.data ?? res.data));
      } catch (err) {
        console.log(err);
      }
    };

    loadRestaurant();
  }, [dispatch]);

  if (!data) {
    return (
      <div className="text-white p-6">
        <h2 className="text-xl font-bold mb-2">No Restaurant Found</h2>
        <p className="text-white/70">Please create your restaurant first.</p>
      </div>
    );
  }

  const statusText = data.open ? "Open" : "Closed";

  return (
    <div className="min-h-screen bg-[#111] text-white p-4 lg:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">{data.name}</h1>

        <div className="flex gap-3">
          <Button
            variant="contained"
            onClick={handleToggleStatus}
            sx={{
              background: data.open ? "#ec4899" : "#22c55e",
              fontWeight: "bold",
            }}
          >
            {statusText}
          </Button>

          <Button
            variant="contained"
            onClick={() => setDeleteOpen(true)}
            sx={{
              background: "#ef4444",
              fontWeight: "bold",
              "&:hover": { background: "#dc2626" },
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Delete Modal */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Restaurant</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this restaurant?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={22} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {/* Restaurant Card */}
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ background:"#1b1b1b", padding:"20px", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.08)", color:"white" }}>
            <h2 className="text-2xl font-semibold mb-4">Restaurant</h2>
            <Divider sx={{ background:"rgba(255,255,255,0.12)", mb:3 }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
              <div className="flex gap-3"><span className="min-w-[150px] text-white font-semibold">Owner</span><span>{data?.owner?.fullName}</span></div>
              <div className="flex gap-3"><span className="min-w-[150px] text-white font-semibold">Restaurant Name</span><span>{data.name}</span></div>
              <div className="flex gap-3"><span className="min-w-[150px] text-white font-semibold">Cuisine Type</span><span>{data.cuisineType}</span></div>
              <div className="flex gap-3"><span className="min-w-[150px] text-white font-semibold">Opening Hours</span><span>{data.openingHours}</span></div>
              <div className="flex gap-3 items-center">
                <span className="min-w-[150px] text-white font-semibold">Status</span>
                <span className={`px-4 py-1 rounded-full text-sm font-bold ${data.open ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {statusText}
                </span>
              </div>
            </div>
          </Paper>
        </Grid>

        {/* Address */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ background:"#1b1b1b", padding:"20px", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.08)", color:"white" }}>
            <h2 className="text-2xl font-semibold mb-4">Address</h2>
            <Divider sx={{ background:"rgba(255,255,255,0.12)", mb:3 }} />
            <div className="space-y-3 text-white/80">
              <div className="flex gap-3"><span className="min-w-[130px] text-white font-semibold">Country</span><span>{data?.address?.country}</span></div>
              <div className="flex gap-3"><span className="min-w-[130px] text-white font-semibold">City</span><span>{data?.address?.city}</span></div>
              <div className="flex gap-3"><span className="min-w-[130px] text-white font-semibold">Postal Code</span><span>{data?.address?.postalCode}</span></div>
              <div className="flex gap-3"><span className="min-w-[130px] text-white font-semibold">Street Address</span><span>{data?.address?.streetAddress}</span></div>
            </div>
          </Paper>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ background:"#1b1b1b", padding:"20px", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.08)", color:"white" }}>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <Divider sx={{ background:"rgba(255,255,255,0.12)", mb:3 }} />
            <div className="space-y-3 text-white/80">
              <div className="flex gap-3"><span className="min-w-[130px] text-white font-semibold">Email</span><span>{data?.contactInformation?.email}</span></div>
              <div className="flex gap-3"><span className="min-w-[130px] text-white font-semibold">Mobile</span><span>{data?.contactInformation?.mobile}</span></div>
              <div className="flex gap-3 items-center">
                <span className="min-w-[130px] text-white font-semibold">Social</span>
                <div className="flex gap-3 text-white/70">
                  <InstagramIcon /><TwitterIcon /><LinkedInIcon /><FacebookIcon />
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>

      {/* Images */}
      <Grid item xs={12}>
        <Paper elevation={4} sx={{ background:"#1b1b1b", padding:"20px", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.08)", color:"white" }}>
          <h2 className="text-2xl font-semibold mb-4">Images</h2>
          <Divider sx={{ background:"rgba(255,255,255,0.12)", mb:3 }} />
          {!data?.images?.length ? (
            <p className="text-white/70">No images uploaded</p>
          ) : (
            <div className="flex gap-4 flex-wrap">
              {data.images.map((img, index) => (
                <img key={index} src={img} alt="restaurant" className="w-40 h-28 object-cover rounded-lg border border-white/10" />
              ))}
            </div>
          )}
        </Paper>
      </Grid>

    </div>
  );
};
