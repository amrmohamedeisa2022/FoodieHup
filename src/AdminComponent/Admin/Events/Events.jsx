import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useDispatch, useSelector } from "react-redux";
import { addEvent, deleteEvent } from "../../../state/events/events.reducer";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(520px, 92vw)",
  background: "#0f0f0f",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0px 20px 60px rgba(0,0,0,0.6)",
  borderRadius: "14px",
  padding: "18px",
  color: "white",
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: "",
  endsAt: "",
};

export const Events = () => {
  const dispatch = useDispatch();

  const events = useSelector((store) => store.events?.events || []);

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  const canSubmit = useMemo(() => {
    return (
      formValues.name.trim() &&
      formValues.location.trim() &&
      formValues.startedAt.trim() &&
      formValues.endsAt.trim()
    );
  }, [formValues]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormValues(initialValues);
  };

  const handleFormChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    dispatch(
      addEvent({
        id: Date.now(),
        ...formValues,
      })
    );

    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className="px-2">
      <Card
        sx={{
          background: "#111",
          color: "white",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <CardHeader
          title={
            <Typography sx={{ fontWeight: 800, color: "white" }}>
              Events
            </Typography>
          }
          action={
            <Button
              onClick={handleOpen}
              startIcon={<AddIcon />}
              variant="contained"
              sx={{
                background: "#e11d48",
                fontWeight: "bold",
                borderRadius: "10px",
                "&:hover": { background: "#be123c" },
              }}
            >
              Create Event
            </Button>
          }
          sx={{ px: 3, py: 2 }}
        />

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

        <Box sx={{ p: 3 }}>
          {events.length === 0 ? (
            <Typography sx={{ color: "rgba(255,255,255,0.65)" }}>
              No events yet.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {events.map((ev) => (
                <Grid key={ev.id} item xs={12} md={6} lg={4}>
                  <Box
                    sx={{
                      background: "#0f0f0f",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: 170,
                        background: "rgba(255,255,255,0.04)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <img
                        src={
                          ev.image?.trim()
                            ? ev.image
                            : "https://via.placeholder.com/600x300"
                        }
                        alt={ev.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/600x300";
                        }}
                      />
                    </Box>

                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "start",
                          justifyContent: "space-between",
                          gap: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{ fontWeight: 800, color: "white" }}
                          >
                            {ev.name}
                          </Typography>

                          <Typography
                            sx={{
                              mt: 0.5,
                              color: "rgba(255,255,255,0.65)",
                              fontSize: 13,
                            }}
                          >
                            📍 {ev.location}
                          </Typography>
                        </Box>

                        <IconButton
                          onClick={() => handleDelete(ev.id)}
                          sx={{
                            color: "#ef4444",
                            background: "rgba(239,68,68,0.10)",
                            borderRadius: "10px",
                            "&:hover": { background: "rgba(239,68,68,0.18)" },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ mt: 1.5 }}>
                        <Typography
                          sx={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}
                        >
                          Start:{" "}
                          <span style={{ color: "white" }}>{ev.startedAt}</span>
                        </Typography>
                        <Typography
                          sx={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}
                        >
                          End:{" "}
                          <span style={{ color: "white" }}>{ev.endsAt}</span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Card>

      
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 2 }}>
              Create Event
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="image"
                    label="Image URL (optional)"
                    value={formValues.image}
                    onChange={handleFormChange}
                    sx={fieldStyle}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="location"
                    label="Location"
                    value={formValues.location}
                    onChange={handleFormChange}
                    sx={fieldStyle}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Event Name"
                    value={formValues.name}
                    onChange={handleFormChange}
                    sx={fieldStyle}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="startedAt"
                    label="Start Date"
                    value={formValues.startedAt}
                    onChange={handleFormChange}
                    sx={fieldStyle}
                    placeholder="e.g. 2026-01-21 05:00 PM"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="endsAt"
                    label="End Date"
                    value={formValues.endsAt}
                    onChange={handleFormChange}
                    sx={fieldStyle}
                    placeholder="e.g. 2026-01-21 11:00 PM"
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    variant="contained"
                    sx={{
                      background: "#e11d48",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      "&:hover": { background: "#be123c" },
                      "&.Mui-disabled": {
                        background: "rgba(225,29,72,0.35)",
                        color: "rgba(255,255,255,0.6)",
                      },
                    }}
                  >
                    Save Event
                  </Button>

                  <Button
                    type="button"
                    onClick={handleClose}
                    sx={{
                      ml: 1.2,
                      color: "rgba(255,255,255,0.75)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px",
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    background: "#111",
    color: "white",
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.18)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.35)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e11d48",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.65)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#e11d48",
  },
};
