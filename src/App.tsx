import  { useState } from 'react';
import ThreeScene from './components/ThreeScene';
import ControlPanel from './components/ControlPanel';
import PlanetControls from './components/PlanetControls';
import PlanetInfoModal from './components/PlanetInfoModal';
import { Library } from 'lucide-react';

export interface AnimationControls {
  isPlaying: boolean;
  speed: number;
  rotationSpeed: number;
  scale: number;
  wireframe: boolean;
  autoRotate: boolean;
  color: string;
  animationType: 'rotation' | 'scaling' | 'morphing' | 'particles';
  particleCount: number;
  cameraDistance: number;
  showOrbits: boolean;
  showStars: boolean;
  planetSettings: {
    [key: string]: {
      visible: boolean;
      size: number;
      speed: number;
      rotationSpeed: number;
    };
  };
}

export interface PlanetInfo {
  name: string;
  description: string;
  details: {
    diameter: string;
    distance: string;
    temperature: string;
    dayLength: string;
    yearLength: string;
    moons: string;
    composition: string;
    atmosphere: string;
  };
}

function App() {
  const [controls, setControls] = useState<AnimationControls>({
    isPlaying: true,
    speed: 1,
    rotationSpeed: 1,
    scale: 1,
    wireframe: false,
    autoRotate: false,
    color: '#FFD700',
    animationType: 'rotation',
    particleCount: 1000,
    cameraDistance: 25,
    showOrbits: true,
    showStars: true,
    planetSettings: {
      Mercury: { visible: true, size: 1, speed: 1, rotationSpeed: 1 },
      Venus: { visible: true, size: 1, speed: 1, rotationSpeed: 1 },
      Earth: { visible: true, size: 1, speed: 1, rotationSpeed: 1 },
      Mars: { visible: true, size: 1, speed: 1, rotationSpeed: 1 },
      Jupiter: { visible: true, size: 1, speed: 1, rotationSpeed: 1 },
      Saturn: { visible: true, size: 1, speed: 1, rotationSpeed: 1 },
      Uranus: { visible: true, size: 1, speed: 1, rotationSpeed: 1 },
      Neptune: { visible: true, size: 1, speed: 1, rotationSpeed: 1 }
    }
  });

  const [showPlanetControls, setShowPlanetControls] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInfo | null>(null);

  const handleControlChange = (key: keyof AnimationControls, value: any) => {
    setControls(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePlanetSettingChange = (planetName: string, setting: string, value: any) => {
    setControls(prev => ({
      ...prev,
      planetSettings: {
        ...prev.planetSettings,
        [planetName]: {
          ...prev.planetSettings[planetName],
          [setting]: value
        }
      }
    }));
  };

  const handlePlanetClick = (planetInfo: PlanetInfo) => {
    setSelectedPlanet(planetInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">

        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4">
            Interactive Solar System
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Explore our solar system with realistic 3D planets, advanced lighting, and interactive controls. 
            Experience the beauty of space with full 360° camera movement and detailed planetary animations.
          </p>
        </div>
           <div className="mt-6 sm:mt-8 text-center mb-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Controls Guide</h2>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-400 text-sm sm:text-base">Mouse Controls:</h3>
                <p className="text-gray-300 text-xs sm:text-sm">• Left Click + Drag: Rotate camera</p>
                <p className="text-gray-300 text-xs sm:text-sm">• Right Click + Drag: Pan camera</p>
                <p className="text-gray-300 text-xs sm:text-sm">• Scroll Wheel: Zoom in/out</p>
                <p className="text-gray-300 text-xs sm:text-sm">• Click on Planet: View details</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-400 text-sm sm:text-base">Features:</h3>
                <p className="text-gray-300 text-xs sm:text-sm">• Realistic planet textures & lighting</p>
                <p className="text-gray-300 text-xs sm:text-sm">• Dynamic starfield background</p>
                <p className="text-gray-300 text-xs sm:text-sm">• Individual planet controls</p>
                <p className="text-gray-300 text-xs sm:text-sm">• Interactive planet information</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6 h-250px">
          {/* Main 3D Scene */}
          <div className="xl:col-span-3 order-1 ">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-2 sm:p-4 ">
              <ThreeScene 
                controls={controls} 
                onPlanetClick={handlePlanetClick}
                onControlChange={handleControlChange}
              />
            </div>
          </div>

          {/* Left Control Panel */}
          <div className="xl:col-span-1 order-2 xl:order-2">
            <ControlPanel 
              controls={controls} 
              onControlChange={handleControlChange} 
            />
          </div>

          {/* Right Planet Controls */}
          <div className="xl:col-span-1 order-3 xl:order-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 mb-4">
              <button
                onClick={() => setShowPlanetControls(!showPlanetControls)}
                className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all text-sm sm:text-base"
              >
                <Library className="w-4 h-4 sm:w-5 sm:h-5" />
                {showPlanetControls ? 'Hide' : 'Show'} Planets
              </button>
            </div>

            {showPlanetControls && (
              <PlanetControls
                planetSettings={controls.planetSettings}
                onPlanetSettingChange={handlePlanetSettingChange}
              />
            )}
          </div>
        </div>

     
      </div>

      {/* Planet Info Modal */}
      {selectedPlanet && (
        <PlanetInfoModal
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </div>
  );
}

export default App;