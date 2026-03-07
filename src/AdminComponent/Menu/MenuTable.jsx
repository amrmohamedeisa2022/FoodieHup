import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
} from "../../state/menu/menu.action";

export default function MenuTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restaurant = useSelector((store) => store.restaurant);
  const menu = useSelector((store) => store.menu);

  
  useEffect(() => {
    const restaurantId = restaurant?.usersRestaurant?.id;
    if (!restaurantId) return;

    dispatch(getMenuItemsByRestaurantId({ restaurantId }));
  }, [dispatch, restaurant?.usersRestaurant?.id]);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId }));
  };

  const items = menu?.menuItems || [];

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
              All Menu Items
            </Typography>
          }
          sx={{ px: 3, py: 2 }}
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurants/add-menu")}
              aria-label="add menu"
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
                <TableCell sx={thStyle}>Image</TableCell>
                <TableCell sx={thStyle} align="right">
                  Title
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Ingredients
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Price
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Availability
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item) => (
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
                  <TableCell>
                    <Avatar
                      src={item.images?.[0] || ""}
                      sx={{
                        width: 40,
                        height: 40,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.06)",
                      }}
                    />
                  </TableCell>

                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </TableCell>

                  <TableCell align="right">
                    <div className="flex flex-wrap gap-1 justify-end">
                      {(item.ingredients || []).map((ingredient, idx) => (
                        <Chip
                          key={ingredient.id || ingredient.name || idx}
                          label={ingredient.name || ingredient}
                          size="small"
                          sx={{
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.85)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        />
                      ))}
                    </div>
                  </TableCell>

                  <TableCell align="right">£{item.price}</TableCell>

                  <TableCell align="right">
                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "600",
                        background: item.available
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(239,68,68,0.15)",
                        color: item.available ? "#22c55e" : "#ef4444",
                        border: item.available
                          ? "1px solid rgba(34,197,94,0.25)"
                          : "1px solid rgba(239,68,68,0.25)",
                      }}
                    >
                      {item.available ? "in_stock" : "out_of_stock"}
                    </span>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleDeleteFood(item.id)}
                      sx={{
                        color: "#ef4444",
                        background: "rgba(239,68,68,0.10)",
                        "&:hover": { background: "rgba(239,68,68,0.18)" },
                        borderRadius: "10px",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      No menu items found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

const thStyle = {
  color: "rgba(255,255,255,0.65)",
  borderColor: "rgba(255,255,255,0.06)",
  fontWeight: 600,
  fontSize: "13px",
};
