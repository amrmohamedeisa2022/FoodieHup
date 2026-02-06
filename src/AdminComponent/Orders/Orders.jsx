import React, { useState } from "react";
import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import OrderTable from "./OrderTable";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "ALL" },
];

export const Orders = () => {
  const [filterValue, setFilterValue] = useState("ALL");

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="px-2">
      <Card
        sx={{
          p: 3,
          background: "#111",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
        }}
      >
        <Typography sx={{ pb: 2, fontWeight: "bold" }} variant="h6">
          Order Status
        </Typography>

        <FormControl>
          <RadioGroup onChange={handleFilter} row value={filterValue}>
            {orderStatus.map((item) => (
              <FormControlLabel
                key={item.label}
                value={item.value}
                control={
                  <Radio
                    sx={{
                      color: "rgba(255,255,255,0.4)",
                      "&.Mui-checked": { color: "#e11d48" },
                    }}
                  />
                }
                label={item.label}
                sx={{ color: "rgba(255,255,255,0.7)" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>

      <OrderTable filterValue={filterValue} />
    </div>
  );
};
