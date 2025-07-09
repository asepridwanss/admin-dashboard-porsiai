// app/(admin)/pedoman/form/FormWrapper.tsx
"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import InputGroup from "@/components/form/form-elements/fromUser";

export default function FormWrapperUser({ id }: { id?: string }) {
  return (
    <div>
      <PageBreadcrumb pageTitle={id ? "Edit User" : "Tambah User"} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <InputGroup id={id || ""} />
        </div>
      </div>
    </div>
  );
}
