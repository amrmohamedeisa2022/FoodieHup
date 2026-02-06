import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

import { useDispatch, useSelector } from "react-redux";
import { toggleRestaurantStatus } from "../../redux/slices/restaurantSlice";

export const RestaurantDetails = () => {
  const restaurant = useSelector((store) => store.restaurant);
  const dispatch = useDispatch();

  const handleRestaurantStatus = () => {
    dispatch(toggleRestaurantStatus());
  };

  const instagramLink = restaurant?.usersRestaurant?.contactInformation?.instagram;
  const twitterLink = restaurant?.usersRestaurant?.contactInformation?.twitter;
  const linkedInLink = restaurant?.usersRestaurant?.contactInformation?.linkedin;
  const facebookLink = restaurant?.usersRestaurant?.contactInformation?.facebook;

  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className="py-5 flex justify-center items-center gap-5 flex-wrap">
        <h1 className="text-2xl lg:text-5xl text-center font-bold p-5">
          {restaurant?.usersRestaurant?.name}
        </h1>

        <Button
          color={!restaurant?.usersRestaurant?.open ? "primary" : "error"}
          variant="contained"
          onClick={handleRestaurantStatus}
          size="large"
        >
          {restaurant?.usersRestaurant?.open ? "Close" : "Open"}
        </Button>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Restaurant" />
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <Row label="Owner" value={restaurant?.usersRestaurant?.owner?.fullName} />
                <Row label="Restaurant Name" value={restaurant?.usersRestaurant?.name} />
                <Row label="Cuisine Type" value={restaurant?.usersRestaurant?.cuisineType} />
                <Row label="Opening Hours" value={restaurant?.usersRestaurant?.openingHours} />
                <Row
                  label="Status"
                  value={
                    restaurant?.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                        Open
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-400 text-gray-950">
                        Closed
                      </span>
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="Address" />
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <Row label="Country" value="-" />
                <Row label="City" value="-" />
                <Row label="Postal Code" value="-" />
                <Row label="Street Address" value="-" />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="Contact" />
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <Row
                  label="Email"
                  value={restaurant?.usersRestaurant?.contactInformation?.email}
                />
                <Row
                  label="Mobile"
                  value={restaurant?.usersRestaurant?.contactInformation?.mobile}
                />

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="w-48 font-semibold">Social</span>

                  {/* ✅ Instagram */}
                  {instagramLink && (
                    <a href={instagramLink} target="_blank" rel="noreferrer">
                      <InstagramIcon />
                    </a>
                  )}

                  {/* ✅ Twitter */}
                  {twitterLink && (
                    <a href={twitterLink} target="_blank" rel="noreferrer">
                      <TwitterIcon />
                    </a>
                  )}

                  {/* ✅ LinkedIn (لو موجود) */}
                  {linkedInLink && (
                    <a href={linkedInLink} target="_blank" rel="noreferrer">
                      <LinkedInIcon />
                    </a>
                  )}

                  {/* ✅ Facebook (لو موجود) */}
                  {facebookLink && (
                    <a href={facebookLink} target="_blank" rel="noreferrer">
                      <FacebookIcon />
                    </a>
                  )}

                  {/* ✅ لو مفيش أي لينكات */}
                  {!instagramLink && !twitterLink && !linkedInLink && !facebookLink && (
                    <span className="text-gray-500">No social links</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

function Row({ label, value }) {
  return (
    <div className="flex gap-3">
      <p className="w-48 font-semibold">{label}</p>
      <p>{value}</p>
    </div>
  );
}
