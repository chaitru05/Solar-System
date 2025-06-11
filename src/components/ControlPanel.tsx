import React from 'react';
import { Play, Pause, RotateCcw, Settings, Palette, Sliders} from 'lucide-react';
import { AnimationControls } from '../App';

interface ControlPanelProps {
  controls: AnimationControls;
  onControlChange: (key: keyof AnimationControls, value: any) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ controls, onControlChange }) => {
  const colorPresets = [
    '#FFD700', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">System Controls</h2>
      </div>

      {/* Playback Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Play className="w-4 h-4" />
          Playback
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onControlChange('isPlaying', !controls.isPlaying)}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-all ${
              controls.isPlaying
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {controls.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {controls.isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <button
            onClick={() => {
              onControlChange('isPlaying', true);
              onControlChange('speed', 1);
              onControlChange('rotationSpeed', 1);
              onControlChange('scale', 1);
              onControlChange('cameraDistance', 25);
            }}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Speed Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          Animation Controls
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Orbital Speed: {controls.speed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={controls.speed}
              onChange={(e) => onControlChange('speed', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Planet Rotation: {controls.rotationSpeed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={controls.rotationSpeed}
              onChange={(e) => onControlChange('rotationSpeed', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              System Scale: {controls.scale.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={controls.scale}
              onChange={(e) => onControlChange('scale', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Camera Distance: {controls.cameraDistance.toFixed(0)}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={controls.cameraDistance}
              onChange={(e) => onControlChange('cameraDistance', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Visual Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Visual Settings
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Wireframe Mode</span>
            <button
              onClick={() => onControlChange('wireframe', !controls.wireframe)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                controls.wireframe ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  controls.wireframe ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Auto Camera Orbit</span>
            <button
              onClick={() => onControlChange('autoRotate', !controls.autoRotate)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                controls.autoRotate ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  controls.autoRotate ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Show Orbit Lines</span>
            <button
              onClick={() => onControlChange('showOrbits', !controls.showOrbits)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                controls.showOrbits ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  controls.showOrbits ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Show Stars</span>
            <button
              onClick={() => onControlChange('showStars', !controls.showStars)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                controls.showStars ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  controls.showStars ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Animation Type */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300">Animation Mode</h3>
        <div className="space-y-2">
          {[
            { value: 'rotation', label: 'Standard Orbit' },
            { value: 'scaling', label: 'Pulsing Planets' },
            { value: 'morphing', label: 'Floating Motion' },
            { value: 'particles', label: 'Asteroid Belt' }
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => onControlChange('animationType', type.value)}
              className={`w-full py-2 px-3 rounded-lg font-medium transition-all ${
                controls.animationType === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;