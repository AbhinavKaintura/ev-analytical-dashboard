"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Hero from '../../../assets/HeroImg.jpg'

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gray-800">
        <Image src={Hero} layout="fill" objectFit="cover" alt="Electric Vehicles" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      
      <motion.div 
        className="absolute inset-0 flex flex-col items-start justify-center text-left text-white p-8 md:p-16 lg:p-24"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ 
            scale: 1.05, 
            textShadow: "0 0 8px rgba(255,255,255,0.8)" 
          }}
        >
          Electrifying The Future
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ 
            scale: 1.02,
            color: "#a3e0ff"
          }}
        >
          Explore the world of electric vehicles with our comprehensive dashboard
        </motion.p>
        <motion.button
          className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)"
          }}
          whileTap={{ scale: 0.95 }} 
          onClick={() => window.open("/dashboard", "_blank")} // Opens in a new tab

          >
          Explore Data
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;