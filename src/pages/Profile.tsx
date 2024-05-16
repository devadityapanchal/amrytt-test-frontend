import React, { useState } from "react";
import ProfileTable from "../components/Table/ProfileTable";
import AddProfile from "../components/Modal/AddProfile";
import { Button, Grid } from "@mui/material";

const Profiles: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshData, setRefreshData] = useState<Date>(new Date());

  return (
    <>
      <AddProfile
        setRefreshData={setRefreshData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Grid container sm={11} justifyContent="flex-end">
        <Grid item xs={2} sm={2}>
          <Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            color="primary"
            fullWidth
          >
            Add Profile
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container m={2}>
        <Grid item xs={12} sm={11}>
          <ProfileTable refreshData={refreshData} />
        </Grid>
      </Grid>
    </>
  );
};

export default Profiles;
