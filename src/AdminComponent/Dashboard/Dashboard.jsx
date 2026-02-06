import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper, Button, Divider } from "@mui/material";
import { toggleRestaurantStatus } from "../../state/restaurant/restaurant.reducer";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

export const RestaurantDashboard = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);

  const data = restaurant?.usersRestaurant;

  if (!data) {
    return (
      <div className="text-white p-6">
        <h2 className="text-xl font-bold mb-2">No Restaurant Found</h2>
        <p className="text-white/70">
          Please create your restaurant first.
        </p>
      </div>
    );
  }

  const statusText = data.open ? "Open" : "Closed";

  return (
    <div className="min-h-screen bg-[#111] text-white p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          {data.name || "Restaurant"}
        </h1>

        <Button
          variant="contained"
          onClick={() => dispatch(toggleRestaurantStatus())}
          sx={{
            background: data.open ? "#ec4899" : "#22c55e",
            fontWeight: "bold",
            "&:hover": {
              background: data.open ? "#db2777" : "#16a34a",
            },
          }}
        >
          {statusText}
        </Button>
      </div>

      <Grid container spacing={3}>
        {/* Restaurant Card */}
        <Grid item xs={12}>
          <Paper
            elevation={4}
            sx={{
              background: "#1b1b1b",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
            }}
          >
            <h2 className="text-2xl font-semibold mb-4">Restaurant</h2>
            <Divider sx={{ background: "rgba(255,255,255,0.12)", mb: 3 }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
              <div className="flex gap-3">
                <span className="min-w-[150px] text-white font-semibold">
                  Owner
                </span>
                <span>{data?.owner?.fullName || "Owner"}</span>
              </div>

              <div className="flex gap-3">
                <span className="min-w-[150px] text-white font-semibold">
                  Restaurant Name
                </span>
                <span>{data.name}</span>
              </div>

              <div className="flex gap-3">
                <span className="min-w-[150px] text-white font-semibold">
                  Cuisine Type
                </span>
                <span>{data.cuisineType || "Not Set"}</span>
              </div>

              <div className="flex gap-3">
                <span className="min-w-[150px] text-white font-semibold">
                  Opening Hours
                </span>
                <span>{data.openingHours || data.openingHour || "Not Set"}</span>
              </div>

              <div className="flex gap-3 items-center">
                <span className="min-w-[150px] text-white font-semibold">
                  Status
                </span>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-bold ${
                    data.open ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {statusText}
                </span>
              </div>
            </div>
          </Paper>
        </Grid>

        {/* Address */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              background: "#1b1b1b",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              height: "100%",
            }}
          >
            <h2 className="text-2xl font-semibold mb-4">Address</h2>
            <Divider sx={{ background: "rgba(255,255,255,0.12)", mb: 3 }} />

            <div className="space-y-3 text-white/80">
              <div className="flex gap-3">
                <span className="min-w-[130px] text-white font-semibold">
                  Country
                </span>
                <span>{data?.address?.country || "Not Set"}</span>
              </div>

              <div className="flex gap-3">
                <span className="min-w-[130px] text-white font-semibold">
                  City
                </span>
                <span>{data?.address?.city || "Not Set"}</span>
              </div>

              <div className="flex gap-3">
                <span className="min-w-[130px] text-white font-semibold">
                  Postal Code
                </span>
                <span>{data?.address?.postalCode || "Not Set"}</span>
              </div>

              <div className="flex gap-3">
                <span className="min-w-[130px] text-white font-semibold">
                  Street Address
                </span>
                <span>{data?.address?.streetAddress || "Not Set"}</span>
              </div>
            </div>
          </Paper>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              background: "#1b1b1b",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              height: "100%",
            }}
          >
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <Divider sx={{ background: "rgba(255,255,255,0.12)", mb: 3 }} />

            <div className="space-y-3 text-white/80">
              <div className="flex gap-3">
                <span className="min-w-[130px] text-white font-semibold">
                  Email
                </span>
                <span>{data?.contactInformation?.email || "Not Set"}</span>
              </div>

              <div className="flex gap-3">
                <span className="min-w-[130px] text-white font-semibold">
                  Mobile
                </span>
                <span>{data?.contactInformation?.mobile || "Not Set"}</span>
              </div>

              <div className="flex gap-3 items-center">
                <span className="min-w-[130px] text-white font-semibold">
                  Social
                </span>

                <div className="flex gap-3 text-white/70">
                  <InstagramIcon sx={{ cursor: "pointer" }} />
                  <TwitterIcon sx={{ cursor: "pointer" }} />
                  <LinkedInIcon sx={{ cursor: "pointer" }} />
                  <FacebookIcon sx={{ cursor: "pointer" }} />
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
