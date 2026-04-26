import Navbar from "@/src/components/mainLayout/common/Navbar";
import Footer from "../../components/mainLayout/common/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
