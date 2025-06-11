# Three.js Frontend Assignment

A sophisticated 3D animation control center built with React, TypeScript, and Three.js. This interactive application demonstrates real-time 3D graphics with comprehensive animation controls, multiple animation types, and a polished user interface.

## 🚀 Features

### Core Functionality
- **Real-time 3D Animations**: Smooth 60fps animations powered by Three.js
- **Speed Control System**: Dynamic speed adjustment from 0.1x to 3x
- **Multiple Animation Types**:
  - Rotation: Multi-axis rotation with torus knot geometry
  - Scaling: Sine wave scaling with icosahedron shape
  - Morphing: Vertex displacement on sphere geometry
  - Particles: Configurable particle system with wave motion

### Interactive Controls
- **Playback Controls**: Play, pause, and reset functionality
- **Visual Customization**: Color picker with presets, wireframe mode
- **Camera Controls**: Auto-rotate camera with manual override
- **Performance Optimization**: Efficient rendering and memory management

### UI/UX Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern Interface**: Glassmorphism effects and smooth animations
- **Accessibility**: Keyboard navigation and screen reader support
- **Dark Theme**: Professional dark UI with accent colors

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 + TypeScript
- **3D Graphics**: Three.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📁 Project Structure

```
src/
├── components/
│   ├── ThreeScene.tsx          # Main 3D scene component
│   ├── ControlPanel.tsx        # Animation controls interface
│   ├── AnimationLibrary.tsx    # Animation type selector
│   ├── Header.tsx              # Navigation header
│   └── Footer.tsx              # Footer component
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles and Tailwind
```

## 🎮 How to Use

### Animation Controls
1. **Play/Pause**: Control animation playback
2. **Speed Slider**: Adjust animation speed (0.1x - 3x)
3. **Rotation Speed**: Control rotation velocity
4. **Scale**: Modify object size (0.5x - 2x)

### Visual Customization
1. **Color Picker**: Choose from presets or custom colors
2. **Wireframe Mode**: Toggle wireframe rendering
3. **Auto Rotate**: Enable/disable camera rotation
4. **Animation Types**: Switch between different animation styles

### Animation Library
- Click "Animations" to browse available animation types
- Each animation has unique geometry and movement patterns
- Preview descriptions and features for each type

## 🔧 Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd threejs-frontend-assignment

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 768px (optimized touch controls)
- **Tablet**: 768px - 1024px (adaptive layout)
- **Desktop**: > 1024px (full feature set)

## ⚡ Performance Features

- **Efficient Rendering**: Optimized Three.js render loop
- **Memory Management**: Proper cleanup of 3D objects
- **Responsive Loading**: Adaptive quality based on device
- **Smooth Animations**: 60fps target with frame timing
- **Bundle Optimization**: Code splitting and tree shaking

## 🎨 Design Features

- **Glassmorphism UI**: Modern glass-like interface elements
- **Gradient Backgrounds**: Dynamic color gradients
- **Smooth Transitions**: CSS transitions for all interactions
- **Typography**: Clear hierarchy with readable fonts
- **Color System**: Consistent color palette throughout

## 🚀 Deployment

The application can be deployed to various platforms:

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Vercel
```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 📊 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔮 Future Enhancements

- **Physics Integration**: Add physics-based animations
- **Audio Visualization**: Sync animations with audio input
- **VR Support**: WebXR integration for VR headsets
- **Export Features**: Save animations as video/GIF
- **Preset System**: Save and load animation configurations
- **Multi-object Scenes**: Support for multiple animated objects

## 📄 License

This project is built for educational purposes as part of a frontend development assignment.

## 🤝 Contributing

This is an assignment project, but feedback and suggestions are welcome!

## 📞 Support

For questions about this implementation, please refer to the documentation or create an issue in the repository.

---

**Built with ❤️ using React, Three.js, and modern web technologies**