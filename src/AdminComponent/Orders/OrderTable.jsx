import React, { useEffect, useState, useMemo } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchRestaurantsOrder,
  handleUpdateOrderStatus,
} from "../../state/order/order.action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

export default function OrderTable({ filterValue }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { restaurant, restaurantOrder } = useSelector((store) => store);

  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  useEffect(() => {
    const restaurantId = restaurant?.usersRestaurant?.id;
    if (!restaurantId) return;

    dispatch(fetchRestaurantsOrder({ jwt, restaurantId }));
  }, [dispatch, jwt, restaurant?.usersRestaurant?.id]);

  const handleUpdateOrder = (status) => {
    if (!selectedOrderId) return;

    dispatch(
      handleUpdateOrderStatus({
        orderId: selectedOrderId,
        orderStatus: status,
        jwt,
      })
    );

    handleClose();
  };

  
  const filteredOrders = useMemo(() => {
    const orders = restaurantOrder?.orders || [];

    if (filterValue === "ALL") return orders;

    return orders.filter((o) => o.orderStatus === filterValue);
  }, [restaurantOrder?.orders, filterValue]);

  return (
    <Box mt={2}>
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
              All Orders
            </Typography>
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
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={thStyle}>ID</TableCell>
                <TableCell sx={thStyle} align="right">
                  Items
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Customer
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Price
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Name
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Ingredients
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Status
                </TableCell>
                <TableCell sx={thStyle} align="right">
                  Update
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredOrders.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "& td": {
                      borderColor: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.9)",
                      verticalAlign: "top",
                    },
                    "&:hover": {
                      background: "rgba(255,255,255,0.03)",
                    },
                  }}
                >
                  <TableCell>{item.id}</TableCell>

                  <TableCell align="right">
                    <AvatarGroup max={4}>
                      {(item.items || []).map((orderItem, idx) => (
                        <Avatar
                          key={idx}
                          src={orderItem.food?.images?.[0]}
                          sx={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell align="right">
                    {item.customer?.fullName || "-"}
                  </TableCell>

                  <TableCell align="right">${item.totalAmount}</TableCell>

                  <TableCell align="right">
                    {(item.items || []).map((orderItem, idx) => (
                      <div key={idx}>{orderItem.food?.name}</div>
                    ))}
                  </TableCell>

                  <TableCell align="right">
                    {(item.items || []).map((orderItem, idx) => (
                      <div key={idx}>
                        {(orderItem.ingredients || []).map((ing, i) => (
                          <span key={i}>
                            {ing?.name || ing}
                            {i !== orderItem.ingredients.length - 1 ? " - " : ""}
                          </span>
                        ))}
                      </div>
                    ))}
                  </TableCell>

                  <TableCell align="right">
                    <span style={statusBadge(item.orderStatus)}>
                      {item.orderStatus}
                    </span>
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      onClick={(e) => handleClick(e, item.id)}
                      sx={{
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(255,255,255,0.06)",
                        textTransform: "none",
                        borderRadius: "10px",
                        "&:hover": {
                          background: "rgba(255,255,255,0.12)",
                        },
                      }}
                    >
                      update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      No orders found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {orderStatus.map((status) => (
              <MenuItem key={status.value} onClick={() => handleUpdateOrder(status.value)}>
                {status.label}
              </MenuItem>
            ))}
          </Menu>
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

const statusBadge = (status) => {
  if (status === "PENDING")
    return {
      padding: "6px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
      background: "rgba(234,179,8,0.15)",
      color: "#eab308",
      border: "1px solid rgba(234,179,8,0.25)",
      display: "inline-block",
    };

  if (status === "COMPLETED" || status === "DELIVERED")
    return {
      padding: "6px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
      background: "rgba(34,197,94,0.15)",
      color: "#22c55e",
      border: "1px solid rgba(34,197,94,0.25)",
      display: "inline-block",
    };

  return {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.14)",
    display: "inline-block",
  };
};
