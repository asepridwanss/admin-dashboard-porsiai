
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative  bg-white z-1 dark:bg-gray-900 sm:p-0">

      {children}


    </div>
  );
}
