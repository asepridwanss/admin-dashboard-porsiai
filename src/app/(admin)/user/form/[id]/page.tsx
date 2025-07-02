import FormWrapper from "@/components/wrapper/FormwrapperUser";

export default async function EditFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FormWrapper id={id} />;
}