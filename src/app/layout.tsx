import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/context/cart-context";

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
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
