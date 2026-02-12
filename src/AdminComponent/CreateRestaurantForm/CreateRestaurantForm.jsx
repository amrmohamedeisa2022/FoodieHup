import React, { useState } from "react";
import { useFormik } from "formik";
import { fetchAllRestaurants } from "../../state/restaurant/restaurant.action";


import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";

import { uploadImageToCloudinary } from "../util/UploadToCloudaniry";
import api from "../../api/api";

import { useDispatch } from "react-redux";
import { setUsersRestaurant } from "../../state/restaurant/restaurant.reducer";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  openingHour: "Mon-Sun : 9:00 AM - 12:00 PM",
  streetAddress: "",
  city: "",
  stateProvince: "",
  PostalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  images: [],
};

export default function CreateRestaurantForm() {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        openingHours: values.openingHour,

        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          postalCode: values.PostalCode,
          country: values.country,
        },

        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },

        images: values.images,
      };

      try {
        const token = localStorage.getItem("quickeats_token");


        const res = await api.post(
          "/api/admin/restaurants",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

       dispatch(setUsersRestaurant(res.data));
dispatch(fetchAllRestaurants());   // ⭐ مهم
navigate("/admin/restaurants", { replace: true });


      } catch (err) {
        console.log(err);
        alert("Create restaurant failed");
      }
    },
  });

  const handleImageChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploadImage(true);
  try {
    const uploadedUrl = await uploadImageToCloudinary(file);

    if (!uploadedUrl) {
      throw new Error("Upload failed");
    }

    formik.setFieldValue("images", [
      ...formik.values.images,
      uploadedUrl,
    ]);

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
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-[#111] border border-white/10 rounded-2xl p-6 md:p-10">
        <h1 className="text-white text-2xl font-bold mb-6">Create Restaurant</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">

          <div className="flex flex-wrap gap-4 items-center">
            <input
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
              type="file"
            />

            <label htmlFor="fileInput" className="relative">
              <div className="w-20 h-20 rounded-md border border-white/20 bg-[#0e0e0e] flex items-center justify-center cursor-pointer">
                <AddPhotoAlternateIcon sx={{ color: "white" }} />
              </div>

              {uploadImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CircularProgress size={30} />
                </div>
              )}
            </label>

            <div className="flex gap-3 flex-wrap">
              {formik.values.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt="uploaded"
                    className="w-20 h-20 rounded-md object-cover border border-white/20"
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "white",
                      "&:hover": { background: "#ddd" },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: "14px", color: "black" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Name" name="name" value={formik.values.name} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" value={formik.values.description} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Cuisine Type" name="cuisineType" value={formik.values.cuisineType} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Opening Hours" name="openingHour" value={formik.values.openingHour} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Street Address" name="streetAddress" value={formik.values.streetAddress} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="City" name="city" value={formik.values.city} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="State / Province" name="stateProvince" value={formik.values.stateProvince} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Postal Code" name="PostalCode" value={formik.values.PostalCode} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Country" name="country" value={formik.values.country} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email" name="email" value={formik.values.email} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Mobile" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Twitter" name="twitter" value={formik.values.twitter} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Instagram" name="instagram" value={formik.values.instagram} onChange={formik.handleChange} sx={darkFieldStyle}/>
            </Grid>
          </Grid>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              background: "#e11d48",
              color: "white",
              fontWeight: "bold",
              paddingY: "12px",
              borderRadius: "10px",
              "&:hover": { background: "#be123c" },
            }}
          >
            CREATE RESTAURANT
          </Button>
        </form>
      </div>
    </div>
  );
}

const darkFieldStyle = {
  "& .MuiOutlinedInput-root": {
    background: "#0f0f0f",
    color: "white",
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.2)",
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
    color: "rgba(255,255,255,0.7)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#e11d48",
  },
};
