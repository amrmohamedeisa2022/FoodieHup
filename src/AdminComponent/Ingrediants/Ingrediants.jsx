import React from "react";
import { Grid } from "@mui/material";

import IngrediantsTable from "./IngrediantsTable";
import IngredientCategoryTable from "./IngredientCategoryTable";

export default function Ingrediants() {
  return (
    <div className="px-2">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <IngrediantsTable />
        </Grid>

        <Grid item xs={12} lg={4}>
          <IngredientCategoryTable />
        </Grid>
      </Grid>
    </div>
  );
}
