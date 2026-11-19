
import Footer from "@/components/ui/Home/Footer";
import Navbar from "@/components/ui/Home/Navbar";
import React from "react";
// Import your Navbar and Footer components here

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Navbar */}
      {/* <Navbar /> */}
      <Navbar></Navbar>

      <main className="min-h-screen flex-1">
        {children}
      </main>
      <Footer></Footer>
      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
