import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { createIngredientCategory } from "../../state/ingredients/ingredients.action";

export default function CreateIngredientCategoryForm({ onDone }) {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({ name: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!restaurant?.usersRestaurant?.id) return;

    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurant.id,
    };

    dispatch(createIngredientCategory({ data, jwt }));

    setFormData({ name: "" });
    if (onDone) onDone();
  };

  return (
    <div className="p-5">
      <h1 className="text-white text-center text-xl pb-8">
        Create Ingredient Category
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Category Name"
          variant="outlined"
          onChange={(e) => setFormData({ name: e.target.value })}
          value={formData.name}
          sx={{
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputBase-input": { color: "white" },
          }}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            background: "#e11d48",
            color: "white",
            fontWeight: "bold",
            "&:hover": { background: "#be123c" },
          }}
        >
          Create Category
        </Button>
      </form>
    </div>
  );
}