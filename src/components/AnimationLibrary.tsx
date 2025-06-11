import React from 'react';
import { X, Play, RotateCcw, Maximize, Zap } from 'lucide-react';

interface AnimationLibraryProps {
  currentType: string;
  onAnimationSelect: (type: 'rotation' | 'scaling' | 'morphing' | 'particles') => void;
  onClose: () => void;
}

const AnimationLibrary: React.FC<AnimationLibraryProps> = ({ 
  currentType, 
  onAnimationSelect, 
  onClose 
}) => {
  const animations = [
    {
      type: 'rotation' as const,
      title: 'Solar System View',
      description: 'Complete solar system with 8 planets orbiting the sun in realistic motion',
      icon: RotateCcw,
      color: 'from-blue-500 to-blue-600',
      features: ['8 planets with moons', 'Realistic orbits', 'Sun at center', 'Orbital mechanics']
    },
    {
      type: 'scaling' as const,
      title: 'Planet Size Animation',
      description: 'Dynamic scaling of celestial bodies with pulsing sun and breathing planets',
      icon: Maximize,
      color: 'from-green-500 to-green-600',
      features: ['Pulsing sun effect', 'Planet size variation', 'Smooth transitions', 'Solar flares']
    },
    {
      type: 'morphing' as const,
      title: 'Cosmic Morphing',
      description: 'Planets transform and morph while maintaining orbital patterns',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      features: ['Shape transformation', 'Organic movement', 'Cosmic effects', 'Dynamic geometry']
    },
    {
      type: 'particles' as const,
      title: 'Asteroid Belt',
      description: 'Asteroid belt between Mars and Jupiter with thousands of particles',
      icon: Play,
      color: 'from-orange-500 to-orange-600',
      features: ['Asteroid belt', 'Particle physics', 'Collision effects', 'Space debris']
    }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Solar System Animations</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {animations.map((animation) => {
          const IconComponent = animation.icon;
          const isActive = currentType === animation.type;
          
          return (
            <div
              key={animation.type}
              className={`relative overflow-hidden rounded-lg border transition-all cursor-pointer ${
                isActive
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              onClick={() => onAnimationSelect(animation.type)}
            >
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${animation.color} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{animation.title}</h4>
                    <p className="text-sm text-gray-400">{animation.description}</p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                
                <div className="space-y-1">
                  {animation.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              {isActive && (
                <div className="absolute top-2 right-2">
                  <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">Solar System Features</h4>
            <p className="text-sm text-gray-400">
              Experience our solar system with realistic planet sizes, orbital speeds, and distances. 
              Use speed controls to see planets complete their orbits and observe the asteroid belt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationLibrary;