
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BotRental } from "@shared/types";

interface BotRentalCardProps {
  bot: BotRental;
  delay: number;
}
const BotRentalCard: React.FC<BotRentalCardProps> = ({ bot, delay = 0 }) => {
  const teks = `Saya ingin sewa bot dengan paket\n*${bot.title}*\n\n*Harga*: ${bot.price} / ${bot.prceUnit}`
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
      className="group relative bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-primary/5 transition-all duration-300 hover:shadow-primary/10 hover:scale-[1.01] hover:-translate-y-1"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-primary/30 via-transpareto-secondaryary/30 animate-border-glow"></div>
      </div>

      {/* Badge */}
      <div className="absolute top-3 right-3 z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay * 0.1 + 0.3 }}
          className={`
            ${bot.badge.type === 'primary' ? 'bg-gradient-to-r from-primary/90 to-primary/70' : 'bg-gradient-to-r from-secondary/90 to-secondary/70'} 
            px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm text-white
          `}
        >
          {bot.badge.text}
        </motion.div>
      </div>

      {/* Image with zoom effect */}
      <div className="relative overflow-hidden h-52">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.6 : 0.3 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img 
          src={bot.image} 
          alt={bot.title} 
          className="w-full h-full object-cover z-0"
          animate={{ 
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.5 }}
        />

        <motion.div 
          className="absolute bottom-3 left-4 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay * 0.1 + 0.2 }}
        >
          <h3 className="font-inter font-bold text-xl text-white drop-shadow-md">{bot.title}</h3>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
      <p className="text-dark-90 text-sm mb-6 line-clamp-3">{bot.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-baseline">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold text-2xl -translate-x-3">Rp{bot.price}</span>
          <span className="text-dark-100 text-sm ml-1 -translate-x-3">/{bot.priceUnit}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(bot.url+teks, "_blank")}       
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-2 px-5 rounded-full shadow-lg transition-all duration-200 flex items-center"
          >
            <span>Sewa</span>
            <svg className="w-3 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            ? '0 0 20px rgba(63, 167, 255, 0.15), inset 0 0 20px rgba(63, 167, 255, 0.07)'
            : '0 0 0px rgba(63, 167, 255, 0), inset 0 0 0px rgba(63, 167, 255, 0)'
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default BotRentalCard;
