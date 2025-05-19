import React, { useState } from "react";
import { motion } from "framer-motion";
import { Service } from "@shared/types";

interface ServiceCardProps {
  service: Service;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: delay * 0.1 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-primary/5 h-full transition-all duration-300 hover:shadow-primary/10 hover:scale-[1.01] hover:-translate-y-1"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-primary/30 via-transparent to-secondary/30 animate-border-glow"></div>
      </div>
      
      <div className="p-6 relative z-10 h-full flex flex-col">
        {/* Icon container */}
        <div 
          className={`
            relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
            ${service.iconBackground === 'primary' 
              ? 'bg-gradient-to-br from-primary/20 to-primary/5' 
              : 'bg-gradient-to-br from-secondary/20 to-secondary/5'
            }
          `}
        >
          {/* Animated glow behind icon */}
          <motion.div 
            className={`
              absolute inset-0 rounded-xl 
              ${service.iconBackground === 'primary' ? 'bg-primary/5' : 'bg-secondary/5'}
            `}
            animate={{ 
              boxShadow: isHovered
                ? service.iconBackground === 'primary'
                  ? '0 0 15px rgba(63, 167, 255, 0.3), inset 0 0 10px rgba(63, 167, 255, 0.2)'
                  : '0 0 15px rgba(149, 76, 233, 0.3), inset 0 0 10px rgba(149, 76, 233, 0.2)'
                : '0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 rgba(0, 0, 0, 0)'
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Icon */}
          <i 
            className={`
              fas ${service.icon} text-2xl transition-transform duration-300 group-hover:scale-110
              ${service.iconBackground === 'primary' ? 'text-primary' : 'text-secondary'}
            `}
          ></i>
        </div>
        
        {/* Title with gradient hover effect */}
        <h3 className="font-inter font-bold text-xl mb-3 transition-colors duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-dark-100 text-sm mb-6 flex-grow">{service.description}</p>
        
        {/* Footer */}
        <div className="flex justify-between items-center mt-auto">
          <span className={`
            font-medium transition-all duration-300
            ${service.iconBackground === 'primary' 
              ? 'text-primary group-hover:text-primary/80' 
              : 'text-secondary group-hover:text-secondary/80'
            }
          `}>
            {service.priceText}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(service.url, "_blank")}
            className={`
              py-2 px-5 rounded-full shadow-lg transition-all duration-200 flex items-center border text-sm
              ${service.iconBackground === 'primary'
                ? 'border-primary/30 text-primary hover:bg-primary/10'
                : 'border-secondary/30 text-secondary hover:bg-secondary/10'
              }
            `}
          >
            <span>Learn More</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Hover glow effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? service.iconBackground === 'primary'
              ? '0 0 20px rgba(63, 167, 255, 0.1), inset 0 0 15px rgba(63, 167, 255, 0.05)'
              : '0 0 20px rgba(149, 76, 233, 0.1), inset 0 0 15px rgba(149, 76, 233, 0.05)'
            : '0 0 0px rgba(0, 0, 0, 0), inset 0 0 0px rgba(0, 0, 0, 0)'
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ServiceCard;
