import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { getIngredientCategory } from "../../state/ingredients/ingredients.action";
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "#0f0f0f",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  boxShadow: 24,
  p: 2,
};

export default function IngredientCategoryTable() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!restaurant?.usersRestaurant?.id) return;

    dispatch(
      getIngredientCategory({
        id: restaurant.usersRestaurant.id,
        jwt,
      })
    );
  }, [dispatch, jwt, restaurant?.usersRestaurant?.id]);

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
              Ingredient Categories
            </Typography>
          }
          action={
            <IconButton
              onClick={() => setOpen(true)}
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
          sx={{ px: 3, py: 2 }}
        />

        <TableContainer
          component={Paper}
          sx={{
            background: "#111",
            boxShadow: "none",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Table aria-label="ingredient categories table">
            <TableHead>
              <TableRow>
                <TableCell sx={thStyle}>#</TableCell>
                <TableCell sx={thStyle} align="left">
                  Name
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(ingredients?.category || []).map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "& td": {
                      borderColor: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.9)",
                    },
                    "&:hover": {
                      background: "rgba(255,255,255,0.03)",
                    },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </TableCell>
                </TableRow>
              ))}

              {(!ingredients?.category || ingredients.category.length === 0) && (
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      No categories found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <CreateIngredientCategoryForm onDone={() => setOpen(false)} />
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
