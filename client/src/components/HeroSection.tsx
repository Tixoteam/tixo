import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="mb-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl overflow-hidden h-64 md:h-96"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-secondary/40 flex flex-col justify-center p-8 md:p-16">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-inter font-bold text-3xl md:text-5xl mb-4"
          >
            Premium WhatsApp Bot <br className="hidden md:block" />
            <span className="text-primary">Rental Services</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-dark-100 max-w-lg text-lg mb-8"
          >
            Enhance your business communications with our professional WhatsApp automation solutions
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button className="bg-primary hover:bg-primary/90 text-dark-900 font-bold py-3 px-8 rounded-lg transition-colors">
              Explore Bots
            </Button>
            <Button variant="outline" className="bg-transparent border border-white/30 hover:border-white text-white font-medium py-3 px-8 rounded-lg transition-colors">
              View Services
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
