import React, { useState } from "react";
import { useFormik } from "formik"; // ✅ مهم
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import { uploadImageToCloudinary } from "../util/UploadToCloudaniry";
import api from "../../api/api";

import { useDispatch } from "react-redux";
import { setUsersRestaurant } from "../../state/restaurant/restaurant.reducer";
import { useNavigate } from "react-router-dom";

/* ✅ initialValues لازم تكون معرفة */
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
        const res = await api.post("/api/admin/restaurants", payload);
        dispatch(setUsersRestaurant(res.data));
        navigate("/admin/restaurants");
      } catch (err) {
        console.error(err);
        alert("Failed to create restaurant");
      }
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadImage(true);
    try {
      const image = await uploadImageToCloudinary(file);
      formik.setFieldValue("images", [...formik.values.images, image]);
    } catch {
      alert("Image upload failed");
    } finally {
      setUploadImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updated = [...formik.values.images];
    updated.splice(index, 1);
    formik.setFieldValue("images", updated);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-[#111] border border-white/10 rounded-2xl p-6 md:p-10">
        <h1 className="text-white text-2xl font-bold mb-6">
          Create Restaurant
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Images */}
          <div className="flex flex-wrap gap-4">
            <input
              accept="image/*"
              id="fileInput"
              type="file"
              hidden
              onChange={handleImageChange}
            />

            <label htmlFor="fileInput" className="relative">
              <div className="w-20 h-20 border border-white/20 rounded-md flex items-center justify-center cursor-pointer">
                <AddPhotoAlternateIcon sx={{ color: "white" }} />
              </div>
              {uploadImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CircularProgress size={24} />
                </div>
              )}
            </label>

            {formik.values.images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt=""
                  className="w-20 h-20 object-cover rounded-md"
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(i)}
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "white",
                  }}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </div>
            ))}
          </div>

          {/* Fields */}
          <Grid container spacing={2}>
            {[
              ["name", "Name"],
              ["description", "Description"],
              ["cuisineType", "Cuisine Type"],
              ["openingHour", "Opening Hours"],
              ["streetAddress", "Street Address"],
              ["city", "City"],
              ["stateProvince", "State / Province"],
              ["PostalCode", "Postal Code"],
              ["country", "Country"],
              ["email", "Email"],
              ["mobile", "Mobile"],
              ["twitter", "Twitter"],
              ["instagram", "Instagram"],
            ].map(([name, label]) => (
              <Grid item xs={12} md={6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  sx={darkFieldStyle}
                  InputLabelProps={{
                    style: { color: '#cccccc' } // ✅ تأكيد لون label
                  }}
                  InputProps={{
                    style: { color: 'white' } // ✅ تأكيد لون input
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              background: "#e11d48",
              py: 1.5,
              borderRadius: "10px",
              fontWeight: "bold",
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

// ✅ التعديل الكامل لـ darkFieldStyle
const darkFieldStyle = {
  // لون input
  "& .MuiOutlinedInput-root": {
    background: "#0f0f0f",
    color: "white",
    borderRadius: "10px",
    "& input": {
      color: "white",
    },
    "& textarea": {
      color: "white",
    },
  },
  // لون label
  "& .MuiInputLabel-root": {
    color: "#cccccc",
    "&.Mui-focused": {
      color: "#e11d48",
    },
  },
  // لون border
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.2)",
  },
  // لون border عند التركيز
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e11d48",
  },
  // لون placeholder
  "& .MuiInputBase-input::placeholder": {
    color: "#888888",
    opacity: 1,
  },
};