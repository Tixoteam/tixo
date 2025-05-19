import React, { useState } from "react";
import { motion } from "framer-motion";
import { Group } from "@shared/types";

interface GroupLinkCardProps {
  group: Group;
  delay: number;
}

const GroupLinkCard: React.FC<GroupLinkCardProps> = ({ group, delay = 0 }) => {
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
      className="group relative bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-primary/5 p-6 flex items-center transition-all duration-300 hover:shadow-primary/10 hover:scale-[1.01] hover:-translate-y-1"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-primary/30 via-transparent to-secondary/30 animate-border-glow"></div>
      </div>

      {/* Content */}
      <div className="flex-grow relative z-10">
        <h3 className="font-inter font-bold text-lg mb-1 transition-colors duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary">
          {group.name}
        </h3>

        <p className="text-dark-100 text-sm mb-2">{group.description}</p>

        <div className="flex flex-wrap items-center text-sm text-dark-200">
          <motion.span 
            className="flex items-center mr-4"
            whileHover={{ scale: 1.05 }}
          >
            {group.memberCount} members
          </motion.span>

          <motion.span 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            {group.language}
          </motion.span>
        </div>
      </div>

      {/* Join button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => window.open(group.url, "_blank")}
        className={`
          py-2 px-5 rounded-full shadow-lg transition-all duration-200 flex items-center text-sm whitespace-nowrap
          ${group.iconBackground === 'primary'
            ? 'bg-gradient-to-r from-primary/80 to-primary/60 text-white hover:from-primary hover:to-primary/80'
            : 'bg-gradient-to-r from-secondary/80 to-secondary/60 text-white hover:from-secondary hover:to-secondary/80'
          }
        `}
      >
        <span>Join Group</span>
        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.button>

      {/* Hover glow effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? group.iconBackground === 'primary'
              ? '0 0 20px rgba(63, 167, 255, 0.1), inset 0 0 15px rgba(63, 167, 255, 0.05)'
              : '0 0 20px rgba(149, 76, 233, 0.1), inset 0 0 15px rgba(149, 76, 233, 0.05)'
            : '0 0 0px rgba(0, 0, 0, 0), inset 0 0 0px rgba(0, 0, 0, 0)'
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default GroupLinkCard;