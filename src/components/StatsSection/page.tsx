"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import stats1 from '../../../assets/stats1.jpeg';

interface StatsSectionProps {
  totalEVs: number;
  topCity: { city: string; count: number };
  topManufacturer: { make: string; count: number };
  isLoading: boolean;
}

const StatsSection = ({ totalEVs, topCity, topManufacturer, isLoading }: StatsSectionProps) => {
  const [animatedTotal, setAnimatedTotal] = useState(0);
  
  useEffect(() => {
    if (!isLoading && totalEVs > 0) {
      const duration = 2000; 
      const interval = 20; 
      const steps = duration / interval;
      const increment = totalEVs / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= totalEVs) {
          current = totalEVs;
          clearInterval(timer);
        }
        setAnimatedTotal(Math.floor(current));
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isLoading, totalEVs]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        duration: 0.8 
      }
    }
  };

  const textVariants = {
    rest: { 
      scale: 1,
      color: "rgb(31, 41, 55)",
      transition: { duration: 0.4, type: "tween", ease: "easeInOut" }
    },
    hover: { 
      scale: 1.05, 
      color: "rgb(37, 99, 235)",
      transition: { duration: 0.4, type: "tween", ease: "easeOut" }
    }
  };

  const backgroundGlow = {
    rest: { 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    hover: { 
      boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.25), 0 10px 10px -5px rgba(37, 99, 235, 0.2)",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 text-white"
          variants={itemVariants}
        >
          <span className="inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-600 font-roboto">
              Electric Vehicle Dashboard
            </span>
          </span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
          variants={containerVariants}
        >
          <motion.div 
            className="relative rounded-2xl overflow-hidden h-80"
            variants={itemVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 z-0">
              <Image src={stats1} alt="Stats Image" layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-slate-900/70 mix-blend-multiply"></div>
            </div>
            
            <motion.div 
              className="relative z-10 h-full w-full p-8 flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm"
              variants={backgroundGlow}
            >
              <motion.h3 
                className="text-xl font-medium text-blue-100 mb-3"
                variants={textVariants}
              >
                Total EVs
              </motion.h3>
              <motion.div 
                className="text-6xl font-bold mb-2"
                variants={textVariants}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-50">
                  {isLoading ? "..." : animatedTotal.toLocaleString()}
                </span>
              </motion.div>
              <motion.div 
                className="mt-4 inline-flex items-center justify-center px-5 py-2 border border-blue-700/50 text-blue-200 rounded-full text-sm bg-blue-900/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                Registered Electric Vehicles
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative rounded-2xl overflow-hidden h-80"
            variants={itemVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 z-0">
            <Image src={stats1} alt="Stats Image" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-slate-900/70 mix-blend-multiply"></div>
            </div>
            
            <motion.div 
              className="relative z-10 h-full w-full p-8 flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm"
              variants={backgroundGlow}
            >
              <motion.h3 
                className="text-xl font-medium text-emerald-100 mb-3"
                variants={textVariants}
              >
                Top City
              </motion.h3>
              <motion.div 
                className="text-5xl font-bold text-center mb-2"
                variants={textVariants}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-emerald-50">
                  {topCity.city}
                </span>
              </motion.div>
              <motion.p 
                className="text-lg text-emerald-200 mt-1 mb-3"
                variants={textVariants}
              >
                ({topCity.count.toLocaleString()} EVs)
              </motion.p>
              <motion.div 
                className="mt-2 inline-flex items-center justify-center px-5 py-2 border border-emerald-700/50 text-emerald-200 rounded-full text-sm bg-emerald-900/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                Leading in Adoption
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative rounded-2xl overflow-hidden h-80"
            variants={itemVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 z-0">
            <Image src={stats1} alt="Stats Image" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-slate-900/70 mix-blend-multiply"></div>
            </div>
            
            <motion.div 
              className="relative z-10 h-full w-full p-8 flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm"
              variants={backgroundGlow}
            >
              <motion.h3 
                className="text-xl font-medium text-purple-100 mb-3"
                variants={textVariants}
              >
                Top Manufacturer
              </motion.h3>
              <motion.div 
                className="text-5xl font-bold text-center mb-2"
                variants={textVariants}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-50">
                  {topManufacturer.make}
                </span>
              </motion.div>
              <motion.p 
                className="text-lg text-purple-200 mt-1 mb-3"
                variants={textVariants}
              >
                ({topManufacturer.count.toLocaleString()} EVs)
              </motion.p>
              <motion.div 
                className="mt-2 inline-flex items-center justify-center px-5 py-2 border border-purple-700/50 text-purple-200 rounded-full text-sm bg-purple-900/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.5 }}
              >
                Market Leader
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <div className="hidden lg:block absolute top-10 right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="hidden lg:block absolute top-0 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="hidden lg:block absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </motion.div>
    </div>
  );
};

export default StatsSection;