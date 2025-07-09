import React from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableUser";

export default function UserDashboard() {
  return (
    <div>
     <PageBreadcrumb pageTitle="Edit User" />
      <BasicTableOne />
    </div>
  );
}
