import React from 'react';
import { X, Globe, Thermometer, Clock, Users } from 'lucide-react';
import { PlanetInfo } from '../App';

interface PlanetInfoModalProps {
  planet: PlanetInfo;
  onClose: () => void;
}

const PlanetInfoModal: React.FC<PlanetInfoModalProps> = ({ planet, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-400" />
              <div>
                <h2 className="text-3xl font-bold text-white">{planet.name}</h2>
                <p className="text-gray-300">{planet.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Planet Details Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">Physical Properties</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Diameter:</span>
                  <span className="text-white">{planet.details.diameter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Distance from Sun:</span>
                  <span className="text-white">{planet.details.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Composition:</span>
                  <span className="text-white">{planet.details.composition}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-white">Environment</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Temperature:</span>
                  <span className="text-white">{planet.details.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Atmosphere:</span>
                  <span className="text-white">{planet.details.atmosphere}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">Time & Motion</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Day Length:</span>
                  <span className="text-white">{planet.details.dayLength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year Length:</span>
                  <span className="text-white">{planet.details.yearLength}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-white">Satellites</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Known Moons:</span>
                  <span className="text-white">{planet.details.moons}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetInfoModal;