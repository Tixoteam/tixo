import React from 'react';
import { motion } from 'framer-motion';

interface CardContainerProps {
  children: React.ReactNode;
  title: string;
}

const CardContainer: React.FC<CardContainerProps> = ({ children, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-7xl mx-auto mb-16"
    >
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
      >
        {title}
      </motion.h2>

      <div className="bg-dark-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-primary/10">
        {children}
      </div>
    </motion.div>
  );
};

export default CardContainer;