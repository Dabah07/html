import Navbar from "@/components/fixed/Navbar";
import Footer from "@/components/fixed/Footer";
import Cart from "@/components/cart/Cart";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

export const metadata = {
  title: "Luxury Watches - Premium Timepieces",
  description: "Discover our exclusive collection of luxury watches from the world's finest brands",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
          <Cart />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
