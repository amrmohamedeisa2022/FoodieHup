import React, { useState } from "react";
import { useFormik } from "formik";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
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
  images: [],
};

export default function CreateMenuForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restaurant = useSelector((store) => store.restaurant);

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
  name: values.name,
  description: values.description,
  price: Number(values.price) || 0,

  category: {
    id: values.category, // ✅ مهم
  },

  restaurantId: restaurantId,
  images: values.images,

  vegetarain: values.vegetarian,
  seassional: values.seasonal,
};

      console.log("SENDING MENU:", menu);

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

  const textFieldStyle = {
    InputLabelProps: { style: { color: "#aaa" } },
    InputProps: { style: { color: "white" } },
    sx: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgba(255,255,255,0.2)",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#ef4444",
        },
      },
    },
  };

  const selectStyle = {
    color: "white",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255,255,255,0.2)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ef4444",
    },
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

              {/* Image Upload */}
              <Grid item xs={12} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <input
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  type="file"
                />

                <label htmlFor="fileInput">
                  <Box sx={{
                    width: 95,
                    height: 95,
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "#111",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}>
                    <AddPhotoAlternateIcon sx={{ color: "white" }} />
                  </Box>
                </label>

                {uploadImage && <CircularProgress size={28} />}

                {formik.values.images.map((img, index) => (
                  <Box key={index} sx={{ position: "relative" }}>
                    <img src={img} alt="" style={{
                      width: 95,
                      height: 95,
                      borderRadius: 12,
                      objectFit: "cover",
                    }} />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        background: "white",
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 14, color: "black" }} />
                    </IconButton>
                  </Box>
                ))}
              </Grid>

              {/* Name */}
              <Grid item xs={12}>
                <TextField fullWidth name="name" label="Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  {...textFieldStyle}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField fullWidth name="description" label="Description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  {...textFieldStyle}
                />
              </Grid>

              {/* Price */}
              <Grid item xs={12} md={6}>
                <TextField fullWidth name="price" label="Price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  {...textFieldStyle}
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "#aaa" }}>Category</InputLabel>
                  <Select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    sx={selectStyle}
                  >
                    {(restaurant?.categories || []).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
  {item.name}
 </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Vegetarian */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "#aaa" }}>Vegetarian</InputLabel>
                  <Select
                    name="vegetarian"
                    value={formik.values.vegetarian}
                    onChange={formik.handleChange}
                    sx={selectStyle}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Seasonal */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "#aaa" }}>Seasonal</InputLabel>
                  <Select
                    name="seasonal"
                    value={formik.values.seasonal}
                    onChange={formik.handleChange}
                    sx={selectStyle}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Submit */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="error">
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