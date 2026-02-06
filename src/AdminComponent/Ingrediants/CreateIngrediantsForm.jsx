import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { createIngredient } from "../../state/ingredients/ingredients.action";

export default function CreateIngredientForm({ onDone }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!restaurant?.usersRestaurant?.id) return;

    const data = {
      name: formData.name,
      categoryId: Number(formData.categoryId),
      restaurantId: restaurant.usersRestaurant.id,
    };

    dispatch(createIngredient({ data, jwt }));

    setFormData({ name: "", categoryId: "" });
    if (onDone) onDone();
  };

  return (
    <div className="p-5">
      <h1 className="text-white text-center text-xl pb-8">
        Create Ingredient
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Ingredient Name"
          variant="outlined"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

        <FormControl fullWidth>
          <InputLabel sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
            Category
          </InputLabel>
          <Select
            value={formData.categoryId}
            label="Category"
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            name="categoryId"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiSelect-select": { color: "white" },
              "& .MuiSvgIcon-root": { color: "white" },
            }}
          >
            {(ingredients?.category || []).map((item) => (
              <MenuItem 
                key={item.id} 
                value={item.id}
                sx={{ color: "black" }} // اللون داكن للقائمة المنسدلة
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
          Create Ingredient
        </Button>
      </form>
    </div>
  );
}