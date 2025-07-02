// app/(admin)/pedoman/form/FormWrapper.tsx
"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import InputGroup from "@/components/form/form-elements/fromPedoman";

export default function FormWrapperPedoman({ id }: { id?: string }) {
  return (
    <div>
      <PageBreadcrumb pageTitle={id ? "Edit Pedoman" : "Tambah Pedoman"} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <InputGroup id={id || ""} />
        </div>
      </div>
    </div>
  );
}
