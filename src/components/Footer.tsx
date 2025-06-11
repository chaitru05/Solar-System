import React from 'react';
import { Github, ExternalLink} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
              <h3 className="text-lg font-bold text-white">ThreeJS Assignment</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Interactive 3D animations powered by Three.js and React. 
              Featuring real-time controls and smooth performance.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#demo" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Live Demo
              </a>
              <a href="#features" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Features
              </a>
              <a href="#controls" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Controls Guide
              </a>
              <a href="#documentation" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Documentation
              </a>
            </div>
          </div>
          
          {/* Tech Stack */}
          <div>
            <h4 className="text-white font-semibold mb-4">Built With</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>React + TypeScript</div>
              <div>Three.js</div>
              <div>Tailwind CSS</div>
              <div>Vite</div>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
   
      </div>
    </footer>
  );
};

export default Footer;