import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageSelector from "@/components/PageSelector";
import PageContainer from "@/components/PageContainer";
import ParticleBackground from "@/components/ParticleBackground";
import { wame, BotRental, Service, Group } from "@shared/types";

import appData from "@/data/appData.json";

const Home: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [botRentals, setBotRentals] = useState<BotRental[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from consolidated JSON file and map to ensure types match exactly
    const data = appData as {
      wame: string;
      botRentals: any[];
      services: any[];
      groups: any[];
    };
    
    setBotRentals(data.botRentals.map(bot => ({
      ...bot,
      url: data.wame,
      badge: {
        ...bot.badge,
        type: bot.badge.type as 'primary' | 'secondary'
      }
    })));
    
    setServices(data.services.map(service => ({
      ...service,
      url: data.wame,
      iconBackground: service.iconBackground as 'primary' | 'secondary'
    })));
    
    setGroups(data.groups.map(group => ({
      ...group,
      iconBackground: group.iconBackground as 'primary' | 'secondary'
    })));
    
    setIsLoading(false);
  }, []);

  const handlePageSelect = (pageId: string) => {
    setSelectedPage(pageId);
  };

  const handleBackToSelector = () => {
    setSelectedPage(null);
  };

  return (
    <ParticleBackground>
      <div className="container mx-auto px-6 md:px-12 py-8 relative">
        {!selectedPage ? (
          <PageSelector onPageSelect={handlePageSelect} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-16 pb-8"
          >
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
                {selectedPage === 'bots' 
                  ? 'Sewa Bot' 
                  : selectedPage === 'services' 
                  ? 'Jasa' 
                  : 'Link Grup'}
              </motion.h2>

              <div className="bg-dark-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-primary/10">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <PageContainer 
                    botRentals={botRentals}
                    services={services}
                    groups={groups}
                    initialPage={
                      selectedPage === 'bots' 
                        ? 1 
                        : selectedPage === 'services' 
                        ? 2 
                        : 3
                    }
                  />
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-8"
            >
              <button 
                onClick={handleBackToSelector}
                className="bg-dark-800/70 backdrop-blur-sm text-primary hover:text-white border border-primary/30 hover:bg-primary/20 transition-colors px-6 py-3 rounded-lg font-medium flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Page Selector
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ParticleBackground>
  );
};

export default Home;
