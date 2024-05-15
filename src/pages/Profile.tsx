import React from "react";
import ProfileTable from "../components/Table/ProfileTable";
import AddProfile from "../components/Modal/AddProfile";

const Profiles: React.FC = () => {
  return (
    <>
      <AddProfile isOpen={false} onClose={() => {}} />
      <ProfileTable />
    </>
  );
};

export default Profiles;
