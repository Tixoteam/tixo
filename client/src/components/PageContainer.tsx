import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BotRentalCard from "./BotRentalCard";
import ServiceCard from "./ServiceCard";
import GroupLinkCard from "./GroupLinkCard";
import { BotRental, Service, Group } from "@shared/types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PageContainerProps {
  botRentals: BotRental[];
  services: Service[];
  groups: Group[];
  initialPage?: number;
}

// 3D animated line component
const AnimatedLines: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Horizontal lines */}
      {[0, 1, 2, 3].map((index) => (
        <motion.div 
          key={`h-line-${index}`}
          className="absolute h-[1px] w-[40%] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          style={{ top: `${20 + (index * 20)}%`, left: '-20%' }}
          animate={{ 
            left: ['0%', '100%', '0%'],
            top: [`${20 + (index * 20)}%`, `${30 + (index * 15)}%`, `${20 + (index * 20)}%`]
          }}
          transition={{ 
            duration: 15 + (index * 3), 
            repeat: Infinity, 
            ease: "linear",
            delay: index * 2
          }}
        />
      ))}
      
      {/* Vertical lines */}
      {[0, 1, 2].map((index) => (
        <motion.div 
          key={`v-line-${index}`}
          className="absolute w-[1px] h-[40%] bg-gradient-to-b from-transparent via-secondary/30 to-transparent"
          style={{ left: `${25 + (index * 25)}%`, top: '-20%' }}
          animate={{ 
            top: ['0%', '100%', '0%'],
            left: [`${25 + (index * 25)}%`, `${35 + (index * 20)}%`, `${25 + (index * 25)}%`]
          }}
          transition={{ 
            duration: 20 + (index * 4), 
            repeat: Infinity, 
            ease: "linear",
            delay: index * 3
          }}
        />
      ))}

      {/* Diagonal sparkles */}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={`sparkle-${index}`}
          className="absolute w-1 h-1 rounded-full bg-primary/50"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            opacity: 0
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: index * 3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Border glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-2xl border border-primary/5"
        animate={{
          boxShadow: [
            '0 0 5px rgba(63, 167, 255, 0.1), inset 0 0 10px rgba(63, 167, 255, 0.05)',
            '0 0 15px rgba(63, 167, 255, 0.2), inset 0 0 20px rgba(63, 167, 255, 0.1)',
            '0 0 5px rgba(63, 167, 255, 0.1), inset 0 0 10px rgba(63, 167, 255, 0.05)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

const PageContainer: React.FC<PageContainerProps> = ({ 
  botRentals, 
  services, 
  groups, 
  initialPage = 1 
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const totalPages = 3;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update current page when initialPage prop changes
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    // Reset scroll position when changing pages
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const goToPage = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.98,
      rotateX: 5
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        duration: 0.7,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 0.98,
      rotateX: -5,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4
      }
    }
  };

  // Get page title based on current page
  const getPageTitle = () => {
    switch(currentPage) {
      case 1:
        return "WhatsApp Bot Rentals";
      case 2:
        return "Our Services";
      case 3:
        return "Group Links";
      default:
        return "WhatsApp Bot Rentals";
    }
  };

  return (
    <div className="relative space-y-6">
      {/* Title and Controls - Stack for mobile, side by side for desktop */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <motion.h2 
          className="font-inter font-bold text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary order-2 md:order-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          key={getPageTitle()} // Re-animate when title changes
          transition={{ duration: 0.3 }}
        >
          {getPageTitle()}
        </motion.h2>
        
        <div className="flex items-center space-x-3 order-1 md:order-2 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="bg-dark-800/70 backdrop-blur-sm text-white h-10 w-10 rounded-full flex items-center justify-center border border-primary/20 transition-all hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent group"
            aria-label="Previous Page"
          >
            <FaChevronLeft className="text-primary group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentPage === index + 1 
                    ? 'w-10 bg-gradient-to-r from-primary to-secondary' 
                    : 'w-2.5 bg-dark-500 hover:bg-dark-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="bg-dark-800/70 backdrop-blur-sm text-white h-10 w-10 rounded-full flex items-center justify-center border border-primary/20 transition-all hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent group"
            aria-label="Next Page"
          >
            <FaChevronRight className="text-primary group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Content Container with Animations */}
      <div 
        className="relative mb-16 bg-dark-800/40 backdrop-blur-md p-8 rounded-2xl border border-primary/10 shadow-2xl min-h-[500px] overflow-hidden"
        ref={contentRef}
      >
        <AnimatedLines />
        
        <AnimatePresence mode="wait">
          {currentPage === 1 && (
            <motion.section 
              key="bots-page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              className="relative z-10"
            >
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={pageVariants}
              >
                {botRentals.map((bot, index) => (
                  <motion.div key={bot.id} variants={itemVariants} custom={index}>
                    <BotRentalCard bot={bot} delay={0} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {currentPage === 2 && (
            <motion.section 
              key="services-page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              id="services"
              className="relative z-10"
            >
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={pageVariants}
              >
                {services.map((service, index) => (
                  <motion.div key={service.id} variants={itemVariants} custom={index}>
                    <ServiceCard service={service} delay={0} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {currentPage === 3 && (
            <motion.section 
              key="groups-page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              id="groups"
              className="relative z-10"
            >
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={pageVariants}
              >
                {groups.map((group, index) => (
                  <motion.div key={group.id} variants={itemVariants} custom={index}>
                    <GroupLinkCard group={group} delay={0} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PageContainer;
