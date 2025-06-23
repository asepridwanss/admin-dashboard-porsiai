import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import InputGroup from "@/components/form/form-elements/fromUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form | TailAdmin",
  description: "Halaman tambah/edit data",
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FormElements({ searchParams }: Props) {
  const { id } = await searchParams;
  return (
    <div>
      <PageBreadcrumb pageTitle={id ? `Edit User #${id}` : "Tambah User"} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <InputGroup id={id} />
        </div>
      </div>
    </div>
  );
}
