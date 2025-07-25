// components
import Navbar from "@/app/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {children}
      </main>
    </>
  );
}
