import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";

import { useSelector } from "react-redux";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(520px, 92vw)",
  bgcolor: "#0f0f0f",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: 24,
  borderRadius: "14px",
  p: 3,
  outline: "none",
};

export default function FoodCategoryTable() {
  const restaurant = useSelector((store) => store.restaurant);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const categories = restaurant?.categories || [];

  return (
    <Box>
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
            <Typography sx={{ fontWeight: "bold", color: "white" }}>
              Food Categories
            </Typography>
          }
          sx={{ px: 3, py: 2 }}
          action={
            <IconButton
              onClick={handleOpen}
              sx={{
                color: "white",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "10px",
                "&:hover": { background: "rgba(255,255,255,0.12)" },
              }}
            >
              <CreateIcon />
            </IconButton>
          }
        />

        <TableContainer
          component={Paper}
          sx={{
            background: "#111",
            boxShadow: "none",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={thStyle}>#</TableCell>
                <TableCell sx={thStyle}>Name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categories.map((item, index) => (
                <TableRow
                  key={item.id || item.name + index}
                  sx={{
                    "& td": {
                      borderColor: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.9)",
                    },
                    "&:hover": { background: "rgba(255,255,255,0.03)" },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                </TableRow>
              ))}

              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      No categories yet
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

     
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <CreateFoodCategoryForm onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}

const thStyle = {
  color: "rgba(255,255,255,0.65)",
  borderColor: "rgba(255,255,255,0.06)",
  fontWeight: 600,
  fontSize: "13px",
};
