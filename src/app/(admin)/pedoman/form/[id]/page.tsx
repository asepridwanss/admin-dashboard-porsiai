import FormWrapper from "@/components/wrapper/FormwrapperPedoman";

export default async function EditFormPage({ params }: { params: Promise<{ id: string }> }) {
  // Ensure the ID is a valid string
  const { id } = await params;
  return <FormWrapper id={id} />;
}