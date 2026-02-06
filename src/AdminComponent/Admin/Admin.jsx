import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AdminSideBar } from "./AdminSideBar";

import { RestaurantDashboard } from "../Dashboard/Dashboard";
import { Orders } from "../Orders/Orders";
import { Menu } from "../Menu/Menu";
import { FoodCategory } from "../FoodCategory/FoodCategory";
import Ingrediants from "../Ingrediants/Ingrediants";

import { Events } from "./Events/Events";
import { Details } from "./Details/Details";
import { RestaurantDetails } from "./RestaurantDetails";

import CreateRestaurantForm from "../CreateRestaurantForm/CreateRestaurantForm";
import CreateMenuForm from "../Menu/CreateMenuForm";

import { useSelector } from "react-redux";

export const Admin = () => {
  const location = useLocation();
  const restaurant = useSelector((store) => store.restaurant);

  const hasRestaurant = !!restaurant?.usersRestaurant?.id;

  
  const isCreatePage = location.pathname === "/admin/restaurants/create";

  return (
    <div className="min-h-screen">
      <div className="lg:flex justify-between">
        
        {!isCreatePage && (
          <div>
            <AdminSideBar handleClose={() => {}} />
          </div>
        )}

      
        <div className={`${!isCreatePage ? "w-full lg:ml-[20vw]" : "w-full"} p-4`}>
          <Routes>
          
            <Route path="/restaurants/create" element={<CreateRestaurantForm />} />

           
            <Route
              path="/*"
              element={
                hasRestaurant ? (
                  <Routes>
                    <Route path="/restaurants" element={<RestaurantDashboard />} />
                    <Route path="/restaurants/orders" element={<Orders />} />
                    <Route path="/restaurants/menu" element={<Menu />} />
                    <Route path="/restaurants/add-menu" element={<CreateMenuForm />} />
                    <Route path="/restaurants/category" element={<FoodCategory />} />
                    <Route path="/restaurants/ingredients" element={<Ingrediants />} />
                    <Route path="/restaurants/event" element={<Events />} />
                    <Route path="/restaurants/details" element={<Details />} />
                    <Route
                      path="/restaurants/restaurant-details"
                      element={<RestaurantDetails />}
                    />
                    <Route path="*" element={<Navigate to="/admin/restaurants" replace />} />
                  </Routes>
                ) : (
                  <Navigate to="/admin/restaurants/create" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
