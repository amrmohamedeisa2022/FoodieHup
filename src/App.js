import React from "react";
import Routers from "./Routers";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routers />
    </>
  );
}
