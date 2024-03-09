import ProfileCard from "@/app/components/profile/ProfileCard";
import React from "react";

const DetailChildPage = (params: any) => {
  return (
    <div>
      <ProfileCard justView parent idChild={params.params.childID} />
    </div>
  );
};

export default DetailChildPage;
