import React from "react";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { FaHome } from "react-icons/fa";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Simple home button instead of navbar */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <div className="flex items-center space-x-2 bg-dark-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-primary/10 cursor-pointer hover:bg-primary/20 transition-colors">
            <FaHome className="text-primary text-xl" />
          </div>
        </Link>
      </div>
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
