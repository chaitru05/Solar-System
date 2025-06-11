import React from 'react';
import { Globe, Eye, EyeOff, Sliders } from 'lucide-react';

interface PlanetControlsProps {
  planetSettings: {
    [key: string]: {
      visible: boolean;
      size: number;
      speed: number;
      rotationSpeed: number;
    };
  };
  onPlanetSettingChange: (planetName: string, setting: string, value: any) => void;
}

const PlanetControls: React.FC<PlanetControlsProps> = ({ 
  planetSettings, 
  onPlanetSettingChange 
}) => {
  const planetData = [
    { name: 'Mercury', color: '#8C7853', description: 'Closest to the Sun' },
    { name: 'Venus', color: '#FFC649', description: 'Hottest planet' },
    { name: 'Earth', color: '#6B93D6', description: 'Our home planet' },
    { name: 'Mars', color: '#CD5C5C', description: 'The Red Planet' },
    { name: 'Jupiter', color: '#D8CA9D', description: 'Largest planet' },
    { name: 'Saturn', color: '#FAD5A5', description: 'Planet with rings' },
    { name: 'Uranus', color: '#4FD0E7', description: 'Ice giant' },
    { name: 'Neptune', color: '#4B70DD', description: 'Windiest planet' }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-6 space-y-4 sm:space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
        <h2 className="text-lg sm:text-xl font-semibold text-white">Planet Controls</h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {planetData.map((planet) => {
          const settings = planetSettings[planet.name];
          if (!settings) return null;

          return (
            <div key={planet.name} className="bg-white/5 rounded-lg p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div 
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: planet.color }}
                  />
                  <div>
                    <h3 className="font-medium text-white text-sm sm:text-base">{planet.name}</h3>
                    <p className="text-xs text-gray-400">{planet.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => onPlanetSettingChange(planet.name, 'visible', !settings.visible)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                    settings.visible 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                  }`}
                >
                  {settings.visible ? <Eye className="w-3 h-3 sm:w-4 sm:h-4" /> : <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />}
                </button>
              </div>

              {settings.visible && (
                <div className="space-y-3 pt-2 border-t border-white/10">
                  {/* Size Control */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs text-gray-400">Size</label>
                      <input
                        type="number"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={settings.size}
                        onChange={(e) => onPlanetSettingChange(planet.name, 'size', parseFloat(e.target.value))}
                        className="w-16 px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white"
                      />
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={settings.size}
                      onChange={(e) => onPlanetSettingChange(planet.name, 'size', parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Orbital Speed Control */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs text-gray-400">Orbit Speed</label>
                      <input
                        type="number"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={settings.speed}
                        onChange={(e) => onPlanetSettingChange(planet.name, 'speed', parseFloat(e.target.value))}
                        className="w-16 px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white"
                      />
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={settings.speed}
                      onChange={(e) => onPlanetSettingChange(planet.name, 'speed', parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Rotation Speed Control */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs text-gray-400">Rotation</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={settings.rotationSpeed}
                        onChange={(e) => onPlanetSettingChange(planet.name, 'rotationSpeed', parseFloat(e.target.value))}
                        className="w-16 px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={settings.rotationSpeed}
                      onChange={(e) => onPlanetSettingChange(planet.name, 'rotationSpeed', parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Sliders className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-1 text-sm sm:text-base">Individual Planet Control</h4>
            <p className="text-xs sm:text-sm text-gray-400">
              Customize each planet's visibility, size, orbital speed, and rotation independently. 
              Use sliders or input boxes for precise control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetControls;