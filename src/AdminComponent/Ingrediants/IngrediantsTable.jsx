import React, { useEffect } from "react";
import {
  Box,
  Button,
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

import CreateIngredientForm from "./CreateIngrediantsForm";
import {
  getIngredientsOfRestaurant,
  updateStockIngredient,
} from "../../state/ingredients/ingredients.action";

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

export default function IngrediantsTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!restaurant?.usersRestaurant?.id) return;

    dispatch(
      getIngredientsOfRestaurant({
        jwt,
        id: restaurant.usersRestaurant.id,
      })
    );
  }, [dispatch, jwt, restaurant?.usersRestaurant?.id]);

  const handleUpdateStock = (id) => {
    dispatch(updateStockIngredient({ id, jwt }));
  };

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
              Ingredients
            </Typography>
          }
          sx={{ px: 3, py: 2 }}
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
                <TableCell sx={thStyle} align="right">
                  Name
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Category
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Availability
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(ingredients?.ingredients || []).map((item, index) => (
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

                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </TableCell>

                  <TableCell align="right">
                    {item.category?.name || "-"}
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      onClick={() => handleUpdateStock(item.id)}
                      sx={{
                        background: item.inStock
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(239,68,68,0.15)",
                        color: item.inStock ? "#22c55e" : "#ef4444",
                        border: item.inStock
                          ? "1px solid rgba(34,197,94,0.25)"
                          : "1px solid rgba(239,68,68,0.25)",
                        fontWeight: "bold",
                        borderRadius: "999px",
                        px: 2,
                        "&:hover": {
                          background: item.inStock
                            ? "rgba(34,197,94,0.22)"
                            : "rgba(239,68,68,0.22)",
                        },
                      }}
                    >
                      {item.inStock ? "in_stock" : "out_of_stock"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {(!ingredients?.ingredients ||
                ingredients.ingredients.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      No ingredients found
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
          <CreateIngredientForm onDone={() => setOpen(false)} />
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
