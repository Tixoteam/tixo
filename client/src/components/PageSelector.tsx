import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Page {
  id: string;
  name: string;
}

interface PageSelectorProps {
  onPageSelect: (pageId: string) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({ onPageSelect }) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  
  const pages: Page[] = [
    { id: 'bots', name: 'WhatsApp Bot Rentals' },
    { id: 'services', name: 'Our Services' },
    { id: 'groups', name: 'Group Links' }
  ];

  const handleNextPage = () => {
    const nextIndex = (selectedPageIndex + 1) % pages.length;
    setSelectedPageIndex(nextIndex);
  };

  const handlePrevPage = () => {
    const prevIndex = (selectedPageIndex - 1 + pages.length) % pages.length;
    setSelectedPageIndex(prevIndex);
  };

  const handleGoToPage = () => {
    onPageSelect(pages[selectedPageIndex].id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto px-4 py-20 text-center z-20"
    >
      <motion.h1 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
      >
        Premium WhatsApp Bot Solutions
      </motion.h1>

      <motion.div 
        className="bg-dark-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-primary/20 mb-12"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Select a Page</h2>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Button 
            onClick={handlePrevPage}
            className="bg-dark-900 hover:bg-primary/20 text-white rounded-full w-12 h-12 flex items-center justify-center"
          >
            <i className="fas fa-chevron-left"></i>
          </Button>
          
          <div className="relative w-64 h-16 overflow-hidden">
            {pages.map((page, index) => (
              <motion.div 
                key={page.id}
                className="absolute inset-0 flex items-center justify-center font-semibold text-xl"
                initial={{ opacity: 0, x: index > selectedPageIndex ? 100 : -100 }}
                animate={{ 
                  opacity: index === selectedPageIndex ? 1 : 0,
                  x: index === selectedPageIndex ? 0 : (index > selectedPageIndex ? 100 : -100),
                  scale: index === selectedPageIndex ? 1 : 0.8
                }}
                transition={{ duration: 0.5 }}
              >
                {page.name}
              </motion.div>
            ))}
          </div>
          
          <Button 
            onClick={handleNextPage}
            className="bg-dark-900 hover:bg-primary/20 text-white rounded-full w-12 h-12 flex items-center justify-center"
          >
            <i className="fas fa-chevron-right"></i>
          </Button>
        </div>
        
        <Button 
          onClick={handleGoToPage}
          className="bg-gradient-to-r from-primary to-secondary text-dark-900 font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all hover:scale-105"
        >
          View Page <i className="fas fa-arrow-right ml-2"></i>
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-dark-100 text-sm"
      >
        Premium WhatsApp bot solutions for businesses of all sizes.
        <br />Automate, engage, and grow with our professional services.
      </motion.div>
    </motion.div>
  );
};

export default PageSelector;