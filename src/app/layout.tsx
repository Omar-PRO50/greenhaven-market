import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "GreenHaven Market",
  description: "GreenHaven Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background">
        <div className="mx-auto max-w-[1700px]">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
