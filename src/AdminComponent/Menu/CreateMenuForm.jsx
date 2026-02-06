import React, { useState } from "react";
import { useFormik } from "formik";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { uploadImageToCloudinary } from "../util/UploadToCloudaniry";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { createMenuItem } from "../../state/menu/menu.action";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

export default function CreateMenuForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restaurant = useSelector((store) => store.restaurant);
  const ingredients = useSelector((store) => store.ingredients);

  const [uploadImage, setUploadImage] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const restaurantId = restaurant?.usersRestaurant?.id;

      if (!restaurantId) {
        alert("Create restaurant first ❌");
        return;
      }

      const menu = {
        ...values,
        price: Number(values.price) || 0,
        category: values.category ? { name: values.category } : { name: "Food" },
        restaurantId,
        available: true,
      };

      await dispatch(createMenuItem({ menu }));

      
      navigate("/admin/restaurants/menu");
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadImage(true);
    try {
      const image = await uploadImageToCloudinary(file);
      formik.setFieldValue("images", [...formik.values.images, image]);
    } catch (err) {
      console.log(err);
      alert("Image upload failed ❌");
    } finally {
      setUploadImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-10">
      
      <div className="w-full max-w-5xl">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            mb: 3,
            color: "white",
          }}
        >
          Add New Menu Item
        </Typography>

        
        <Box
          sx={{
            background: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: { xs: "18px", md: "28px" },
            maxWidth: "920px",
            mx: "auto",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <input
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  type="file"
                />

                <label htmlFor="fileInput" style={{ position: "relative" }}>
                  <Box
                    sx={{
                      width: 95,
                      height: 95,
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "#111",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ color: "white" }} />
                  </Box>

                  {uploadImage && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress size={28} />
                    </Box>
                  )}
                </label>

               
                <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap" }}>
                  {formik.values.images.map((img, index) => (
                    <Box key={index} sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        src={img}
                        alt="preview"
                        sx={{
                          width: 95,
                          height: 95,
                          borderRadius: "12px",
                          objectFit: "cover",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />

                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                          background: "white",
                          "&:hover": { background: "#ddd" },
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 14, color: "black" }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>

              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  sx={fieldStyle}
                />
              </Grid>

            
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={selectStyle}>
                  <InputLabel>Food Category</InputLabel>
                  <Select
                    value={formik.values.category}
                    label="Food Category"
                    onChange={formik.handleChange}
                    name="category"
                  >
                    {(restaurant?.categories || []).map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              
              <Grid item xs={12}>
                <FormControl fullWidth sx={selectStyle}>
                  <InputLabel>Ingredients</InputLabel>
                  <Select
                    multiple
                    name="ingredients"
                    value={formik.values.ingredients}
                    onChange={formik.handleChange}
                    input={<OutlinedInput label="Ingredients" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                        {selected.map((value, idx) => (
                          <Chip
                            key={idx}
                            label={value?.name || value}
                            size="small"
                            sx={{
                              background: "rgba(255,255,255,0.08)",
                              color: "white",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {(ingredients?.ingredients || []).map((item) => (
                      <MenuItem key={item.id} value={item}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={selectStyle}>
                  <InputLabel>Is Vegetarian</InputLabel>
                  <Select
                    value={formik.values.vegetarian}
                    label="Is Vegetarian"
                    onChange={formik.handleChange}
                    name="vegetarian"
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={selectStyle}>
                  <InputLabel>Is Seasonal</InputLabel>
                  <Select
                    value={formik.values.seasonal}
                    label="Is Seasonal"
                    onChange={formik.handleChange}
                    name="seasonal"
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: 1,
                    background: "#e11d48",
                    color: "white",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.4,
                    borderRadius: "10px",
                    "&:hover": { background: "#be123c" },
                  }}
                >
                  CREATE MENU ITEM
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </div>
  );
}


const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    background: "#111",
    color: "white",
    borderRadius: "10px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.16)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.30)" },
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

const selectStyle = {
  "& .MuiOutlinedInput-root": {
    background: "#111",
    color: "white",
    borderRadius: "10px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.16)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.30)" },
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
  "& .MuiSvgIcon-root": {
    color: "rgba(255,255,255,0.75)",
  },
};
