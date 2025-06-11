import React from 'react';
import { Github, ExternalLink, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <h1 className="text-xl font-bold text-white">ThreeJS Assignment</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#demo" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Demo
            </a>
            <a 
              href="#features" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#controls" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Controls
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Live Demo</span>
            </a>
            
            <button className="md:hidden text-gray-300 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;