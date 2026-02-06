import React from "react";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleRestaurantStatus } from "../../../state/restaurant/restaurant.reducer";
import { useNavigate } from "react-router-dom";

export const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restaurant = useSelector((store) => store.restaurant);
  const data = restaurant?.usersRestaurant;

  if (!data?.id) {
    return (
      <div className="px-2">
        <Card
          sx={{
            background: "#111",
            color: "white",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 800, mb: 1 }}>
              No Restaurant Found
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.65)", mb: 2 }}>
              You need to create your restaurant first.
            </Typography>

            <Button
              onClick={() => navigate("/admin/restaurants/create")}
              variant="contained"
              sx={{
                background: "#e11d48",
                fontWeight: "bold",
                borderRadius: "10px",
                "&:hover": { background: "#be123c" },
              }}
            >
              Create Restaurant
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isOpen = !!data.open;

  return (
    <div className="px-2">
      <Card
        sx={{
          background: "#111",
          color: "white",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
                Restaurant Details
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.65)", mt: 0.3 }}>
                Manage your restaurant info & status
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  px: 1.3,
                  py: 0.7,
                  borderRadius: "999px",
                  fontSize: 12,
                  fontWeight: 800,
                  border: isOpen
                    ? "1px solid rgba(34,197,94,0.25)"
                    : "1px solid rgba(239,68,68,0.25)",
                  background: isOpen
                    ? "rgba(34,197,94,0.14)"
                    : "rgba(239,68,68,0.14)",
                  color: isOpen ? "#22c55e" : "#ef4444",
                }}
              >
                {isOpen ? "OPEN" : "CLOSED"}
              </Box>

              <Button
                onClick={() => dispatch(toggleRestaurantStatus())}
                variant="contained"
                sx={{
                  background: isOpen ? "#ef4444" : "#22c55e",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  "&:hover": {
                    background: isOpen ? "#dc2626" : "#16a34a",
                  },
                }}
              >
                {isOpen ? "Close Restaurant" : "Open Restaurant"}
              </Button>
            </Box>
          </Box>

          
          <Grid container spacing={2}>
            
            <Grid item xs={12} lg={6}>
              <InfoCard title="Basic Information">
                <InfoRow label="Name" value={data.name} />
                <InfoRow label="Description" value={data.description || "-"} />
                <InfoRow label="Cuisine Type" value={data.cuisineType || "-"} />
                <InfoRow label="Opening Hours" value={data.openingHours || "-"} />
              </InfoCard>

              <Box sx={{ mt: 2 }}>
                <InfoCard title="Address">
                  <InfoRow
                    label="Street"
                    value={data.address?.streetAddress || "-"}
                  />
                  <InfoRow label="City" value={data.address?.city || "-"} />
                  <InfoRow
                    label="State"
                    value={data.address?.stateProvince || "-"}
                  />
                  <InfoRow
                    label="Postal Code"
                    value={data.address?.postalCode || "-"}
                  />
                  <InfoRow label="Country" value={data.address?.country || "-"} />
                </InfoCard>
              </Box>
            </Grid>

          
            <Grid item xs={12} lg={6}>
              <InfoCard title="Contact Information">
                <InfoRow
                  label="Email"
                  value={data.contactInformation?.email || "-"}
                />
                <InfoRow
                  label="Mobile"
                  value={data.contactInformation?.mobile || "-"}
                />
                <InfoRow
                  label="Instagram"
                  value={data.contactInformation?.instagram || "-"}
                />
                <InfoRow
                  label="Twitter"
                  value={data.contactInformation?.twitter || "-"}
                />
              </InfoCard>

              <Box sx={{ mt: 2 }}>
                <InfoCard title="Images">
                  <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                    {(data.images || []).length === 0 ? (
                      <Typography sx={{ color: "rgba(255,255,255,0.65)" }}>
                        No images uploaded
                      </Typography>
                    ) : (
                      data.images.map((img, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            width: 110,
                            height: 80,
                            borderRadius: "12px",
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(255,255,255,0.03)",
                          }}
                        >
                          <img
                            src={img}
                            alt="restaurant"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/200x120";
                            }}
                          />
                        </Box>
                      ))
                    )}
                  </Box>
                </InfoCard>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};



function InfoCard({ title, children }) {
  return (
    <Box
      sx={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        p: 2,
      }}
    >
      <Typography sx={{ fontWeight: 900, mb: 1.4 }}>{title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

function InfoRow({ label, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          color: "rgba(255,255,255,0.92)",
          fontWeight: 600,
          fontSize: 13,
          textAlign: "right",
          maxWidth: "65%",
          wordBreak: "break-word",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
