import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createCategoryAction } from "../../state/restaurant/restaurant.action";

export default function CreateFoodCategoryForm({ onClose }) {
  const dispatch = useDispatch();
  const restaurant = useSelector((store) => store.restaurant);

  const [formData, setFormData] = useState({ categoryName: "" });

  const restaurantId = restaurant?.usersRestaurant?.id;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!restaurantId) {
      alert("Create restaurant first ❌");
      return;
    }

    if (!formData.categoryName.trim()) {
      alert("Please enter category name ❌");
      return;
    }

    const data = {
      name: formData.categoryName.trim(),
      restaurantId: { id: restaurantId },
    };

    dispatch(
      createCategoryAction({
        reqData: data,
        jwt: localStorage.getItem("jwt"),
      })
    );

    
    setFormData({ categoryName: "" });
    if (onClose) onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full">
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 2,
          color: "white",
        }}
      >
        Create Food Category
      </Typography>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="categoryName"
          name="categoryName"
          label="Food Category"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.categoryName}
          sx={darkFieldStyle}
        />

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            onClick={() => onClose && onClose()}
            sx={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              fontWeight: "bold",
              px: 3,
              borderRadius: "10px",
              "&:hover": { background: "rgba(255,255,255,0.15)" },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            type="submit"
            sx={{
              background: "#e11d48",
              color: "white",
              fontWeight: "bold",
              px: 3,
              borderRadius: "10px",
              "&:hover": { background: "#be123c" },
            }}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}


const darkFieldStyle = {
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
