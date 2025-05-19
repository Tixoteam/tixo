import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CallToAction: React.FC = () => {
  return (
    <section className="mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-primary/80"></div>
        <div className="relative p-8 md:p-16 text-center">
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-4">Ready to Transform Your Business?</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg mb-8">
            Start automating your WhatsApp communications today and experience the power of intelligent bots.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-dark-900 font-bold py-3 px-8 rounded-lg hover:bg-white/90 transition-colors">
              Get Started Now
            </Button>
            <Button variant="outline" className="bg-transparent border border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
