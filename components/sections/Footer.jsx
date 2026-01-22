import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative z-20 py-12 px-6 mt-20 border-t border-red-900/30 overflow-hidden min-h-[400px]">
      
      
      <div 
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/footer/footer-bg1.png')" }}
      ></div>

      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Logo Section */}
        {/* Mobile: h-24 | Laptop: h-40 */}
        <div className="mb-2 -mt-10 flex items-center justify-center gap-0"> 
          {/* Bird Logo */}
          <img 
            src="/footer/birdlogo.png" 
            alt="Bird Logo" 
            className="h-20 md:h-40 lg:h-50 w-auto object-contain opacity-100 drop-shadow-[0_0_15px_rgba(255,0,0,0.3)] -mr-12 md:-mr-22 lg:-mr-26"
          />
          
          {/* Main Logo */}
          <img 
            src="/footer/logo.png" 
            alt="Abhisarga Logo" 
            className="h-42 md:h-32 lg:h-40 w-auto object-contain opacity-100 transition-opacity drop-shadow-[0_0_25px_rgba(255,0,0,0.4)]"
          />
        </div>

        {/* Social Icons Section */}
        <div className="flex space-x-6 md:space-x-8 mb-10">
          <a href="https://www.instagram.com/abhisarga/" target="_blank" rel="noreferrer" 
            className="text-xl md:text-2xl text-[#ff0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] hover:text-red-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_#ff0000]">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com/company/abhisarga-iiits" target="_blank" rel="noreferrer" 
            className="text-xl md:text-2xl text-[#ff0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] hover:text-red-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_#ff0000]">
            <FaLinkedin />
          </a>
          <a href="https://x.com/Abhisarga_iiits" target="_blank" rel="noreferrer" 
            className="text-xl md:text-2xl text-[#ff0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] hover:text-red-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_#ff0000]">
            <FaTwitter />
          </a>
          <a href="#" target="_blank" rel="noreferrer" 
            className="text-xl md:text-2xl text-[#ff0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] hover:text-red-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_#ff0000]">
            <FaYoutube />
          </a>
        </div>

        {/* Atmospheric Divider */}
        <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-red-700/60 to-transparent mb-8"></div>

        {/* Credits Section */}
        <div className="text-center">
          <p className="text-white-400 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
            Designed by <span className="text-red-700 font-bold tracking-widest uppercase">IIITS Team</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;