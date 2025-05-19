import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-800/70 backdrop-blur-md py-4 px-6 md:px-12 sticky top-0 z-50 shadow-lg border-b border-primary/10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-primary text-2xl"><FaWhatsapp /></span>
            <span className="font-inter font-bold text-xl">WA Bot Rentals</span>
          </div>
        </Link>
        
        <div className="flex space-x-8">
          <Link href="/">
            <div className="text-white hover:text-primary transition-colors cursor-pointer">Home</div>
          </Link>
          <Link href="/#services">
            <div className="text-dark-100 hover:text-primary transition-colors cursor-pointer">Services</div>
          </Link>
          <Link href="/#groups">
            <div className="text-dark-100 hover:text-primary transition-colors cursor-pointer">Group Links</div>
          </Link>
          <Link href="/#contact">
            <div className="text-dark-100 hover:text-primary transition-colors cursor-pointer">Contact</div>
          </Link>
        </div>
        
        <div className="flex items-center">
          <Button className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
