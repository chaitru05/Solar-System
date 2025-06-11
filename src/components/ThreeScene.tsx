"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import * as THREE from "three"
import type { AnimationControls, PlanetInfo } from "../App"

interface ThreeSceneProps {
  controls: AnimationControls
  onPlanetClick: (planetInfo: PlanetInfo) => void
  onControlChange: (key: keyof AnimationControls, value: any) => void
}

interface Planet {
  mesh: THREE.Mesh
  orbitRadius: number
  orbitSpeed: number
  rotationSpeed: number
  angle: number
  name: string
  description: string
  orbitLine?: THREE.Line
  info: PlanetInfo
}

interface SolarSystem {
  sun: THREE.Mesh
  planets: Planet[]
  asteroidBelt?: THREE.Points
  starField?: THREE.Points
  sunLight: THREE.PointLight
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ controls, onPlanetClick, onControlChange }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    solarSystem?: SolarSystem
    animationId?: number
    clock: THREE.Clock
    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    cameraControls: {
      isDragging: boolean
      previousMousePosition: { x: number; y: number }
      cameraTarget: THREE.Vector3
      cameraRadius: number
      cameraTheta: number
      cameraPhi: number
    }
    lastFrameTime: number
  }>({} as any)

  // Store controls in a ref to access latest values in animation loop
  const controlsRef = useRef(controls)

  // Update the ref whenever controls change
  useEffect(() => {
    controlsRef.current = controls
  }, [controls])

  // Enhanced planet data with detailed information
  const planetData = [
    {
      name: "Mercury",
      size: 0.2,
      distance: 3,
      speed: 0.048,
      color: 0x8c7853,
      rotationSpeed: 0.02,
      description: "Closest planet to the Sun, with extreme temperature variations",
      info: {
        name: "Mercury",
        description: "The smallest planet and closest to the Sun",
        details: {
          diameter: "4,879 km",
          distance: "57.9 million km",
          temperature: "-173°C to 427°C",
          dayLength: "58.6 Earth days",
          yearLength: "88 Earth days",
          moons: "0",
          composition: "Iron core, silicate mantle",
          atmosphere: "Extremely thin (oxygen, sodium, hydrogen)",
        },
      },
    },
    {
      name: "Venus",
      size: 0.35,
      distance: 4.2,
      speed: 0.035,
      color: 0xffc649,
      rotationSpeed: 0.015,
      description: "Hottest planet with thick atmosphere and retrograde rotation",
      info: {
        name: "Venus",
        description: "The hottest planet with a toxic atmosphere",
        details: {
          diameter: "12,104 km",
          distance: "108.2 million km",
          temperature: "462°C (surface)",
          dayLength: "243 Earth days",
          yearLength: "225 Earth days",
          moons: "0",
          composition: "Iron core, rocky mantle",
          atmosphere: "Dense CO₂ with sulfuric acid clouds",
        },
      },
    },
    {
      name: "Earth",
      size: 0.4,
      distance: 5.5,
      speed: 0.03,
      color: 0x6b93d6,
      rotationSpeed: 0.01,
      description: "Our home planet, the only known planet with life",
      info: {
        name: "Earth",
        description: "Our home planet, the only known planet with life",
        details: {
          diameter: "12,756 km",
          distance: "149.6 million km",
          temperature: "-89°C to 58°C",
          dayLength: "24 hours",
          yearLength: "365.25 days",
          moons: "1 (The Moon)",
          composition: "Iron core, silicate mantle and crust",
          atmosphere: "Nitrogen (78%), Oxygen (21%)",
        },
      },
    },
    {
      name: "Mars",
      size: 0.3,
      distance: 7,
      speed: 0.024,
      color: 0xcd5c5c,
      rotationSpeed: 0.008,
      description: "The Red Planet, with polar ice caps and the largest volcano",
      info: {
        name: "Mars",
        description: "The Red Planet with evidence of ancient water",
        details: {
          diameter: "6,792 km",
          distance: "227.9 million km",
          temperature: "-87°C to -5°C",
          dayLength: "24.6 hours",
          yearLength: "687 Earth days",
          moons: "2 (Phobos, Deimos)",
          composition: "Iron core, basaltic mantle",
          atmosphere: "Thin CO₂ (95%), Nitrogen (3%)",
        },
      },
    },
    {
      name: "Jupiter",
      size: 1.2,
      distance: 10,
      speed: 0.013,
      color: 0xd8ca9d,
      rotationSpeed: 0.005,
      description: "Largest planet, a gas giant with the Great Red Spot",
      info: {
        name: "Jupiter",
        description: "The largest planet and a gas giant",
        details: {
          diameter: "142,984 km",
          distance: "778.5 million km",
          temperature: "-108°C (cloud tops)",
          dayLength: "9.9 hours",
          yearLength: "11.9 Earth years",
          moons: "95+ (including Io, Europa, Ganymede, Callisto)",
          composition: "Hydrogen and helium gas giant",
          atmosphere: "Hydrogen (89%), Helium (10%)",
        },
      },
    },
    {
      name: "Saturn",
      size: 1.0,
      distance: 13,
      speed: 0.009,
      color: 0xfad5a5,
      rotationSpeed: 0.004,
      description: "Famous for its spectacular ring system",
      info: {
        name: "Saturn",
        description: "The ringed planet with spectacular ice rings",
        details: {
          diameter: "120,536 km",
          distance: "1.43 billion km",
          temperature: "-139°C (cloud tops)",
          dayLength: "10.7 hours",
          yearLength: "29.4 Earth years",
          moons: "146+ (including Titan, Enceladus)",
          composition: "Hydrogen and helium gas giant",
          atmosphere: "Hydrogen (96%), Helium (3%)",
        },
      },
    },
    {
      name: "Uranus",
      size: 0.6,
      distance: 16,
      speed: 0.007,
      color: 0x4fd0e7,
      rotationSpeed: 0.003,
      description: "Ice giant that rotates on its side",
      info: {
        name: "Uranus",
        description: "An ice giant that rotates on its side",
        details: {
          diameter: "51,118 km",
          distance: "2.87 billion km",
          temperature: "-197°C (cloud tops)",
          dayLength: "17.2 hours",
          yearLength: "84 Earth years",
          moons: "27+ (including Miranda, Ariel)",
          composition: "Water, methane, ammonia ices",
          atmosphere: "Hydrogen (83%), Helium (15%), Methane (2%)",
        },
      },
    },
    {
      name: "Neptune",
      size: 0.58,
      distance: 19,
      speed: 0.005,
      color: 0x4b70dd,
      rotationSpeed: 0.002,
      description: "Windiest planet with supersonic winds",
      info: {
        name: "Neptune",
        description: "The windiest planet with supersonic winds",
        details: {
          diameter: "49,528 km",
          distance: "4.50 billion km",
          temperature: "-201°C (cloud tops)",
          dayLength: "16.1 hours",
          yearLength: "165 Earth years",
          moons: "16+ (including Triton)",
          composition: "Water, methane, ammonia ices",
          atmosphere: "Hydrogen (80%), Helium (19%), Methane (1%)",
        },
      },
    },
  ]

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000005)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      2000,
    )

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.8
    mountRef.current.appendChild(renderer.domElement)

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.1)
    scene.add(ambientLight)

    const sunLight = new THREE.PointLight(0xffffff, 3, 200)
    sunLight.position.set(0, 0, 0)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.camera.near = 0.1
    sunLight.shadow.camera.far = 100
    scene.add(sunLight)

    // Directional light for better planet illumination
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    // Create starfield
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 10000
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const radius = 500 + Math.random() * 1000
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = radius * Math.cos(phi)

      // Random star colors
      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55)
      starColors[i * 3] = color.r
      starColors[i * 3 + 1] = color.g
      starColors[i * 3 + 2] = color.b
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3))

    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    const starField = new THREE.Points(starGeometry, starMaterial)
    scene.add(starField)

    // Create enhanced Sun with glow effect
    const sunGeometry = new THREE.SphereGeometry(1.5, 64, 64)
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      
    })
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
    scene.add(sunMesh)

    // Add sun corona effect
    const coronaGeometry = new THREE.SphereGeometry(2.2, 32, 32)
    const coronaMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    })
    const corona = new THREE.Mesh(coronaGeometry, coronaMaterial)
    sunMesh.add(corona)

    // Create solar system
    const solarSystem: SolarSystem = {
      sun: sunMesh,
      planets: [],
      starField,
      sunLight,
    }

    // Create planets with enhanced materials and visible rotation markers
    planetData.forEach((planetInfo, index) => {
      // Create planet sphere
      const geometry = new THREE.SphereGeometry(planetInfo.size, 32, 32)

      // Enhanced planet material with better lighting
      const material = new THREE.MeshPhongMaterial({
        color: planetInfo.color,
        shininess: 30,
        specular: 0x111111,
      })

      const planetMesh = new THREE.Mesh(geometry, material)
      planetMesh.castShadow = true
      planetMesh.receiveShadow = true
      planetMesh.userData = {
        name: planetInfo.name,
        description: planetInfo.description,
        info: planetInfo.info,
      }

      // Add a visible marker on the planet to make rotation obvious
      const markerGeometry = new THREE.SphereGeometry(planetInfo.size * 0.2, 16, 16)
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      })
      const marker = new THREE.Mesh(markerGeometry, markerMaterial)
      marker.position.set(planetInfo.size * 0.8, 0, 0) // Position on the "equator"
      planetMesh.add(marker)

      // Initial position
      planetMesh.position.x = planetInfo.distance
      scene.add(planetMesh)

      const planet: Planet = {
        mesh: planetMesh,
        orbitRadius: planetInfo.distance,
        orbitSpeed: planetInfo.speed,
        rotationSpeed: planetInfo.rotationSpeed,
        angle: Math.random() * Math.PI * 2,
        name: planetInfo.name,
        description: planetInfo.description,
        info: planetInfo.info,
      }

      // Create orbit lines
      const orbitPoints = []
      for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2
        orbitPoints.push(
          new THREE.Vector3(Math.cos(angle) * planetInfo.distance, 0, Math.sin(angle) * planetInfo.distance),
        )
      }

      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints)
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x444444,
        transparent: true,
        opacity: 0.3,
      })
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial)
      planet.orbitLine = orbitLine
      scene.add(orbitLine)

      solarSystem.planets.push(planet)

      // Add rings to Saturn
      if (planetInfo.name === "Saturn") {
        const ringGeometry = new THREE.RingGeometry(planetInfo.size * 1.2, planetInfo.size * 2, 64)
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0xc4a484,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        })
        const rings = new THREE.Mesh(ringGeometry, ringMaterial)
        rings.rotation.x = Math.PI / 2
        planetMesh.add(rings)
      }
    })

    // Mouse interaction setup
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Camera controls setup
    const cameraControls = {
      isDragging: false,
      previousMousePosition: { x: 0, y: 0 },
      cameraTarget: new THREE.Vector3(0, 0, 0),
      cameraRadius: 25,
      cameraTheta: 0,
      cameraPhi: Math.PI / 4,
    }

    const updateCameraPosition = () => {
      camera.position.x =
        cameraControls.cameraRadius * Math.sin(cameraControls.cameraPhi) * Math.cos(cameraControls.cameraTheta)
      camera.position.y = cameraControls.cameraRadius * Math.cos(cameraControls.cameraPhi)
      camera.position.z =
        cameraControls.cameraRadius * Math.sin(cameraControls.cameraPhi) * Math.sin(cameraControls.cameraTheta)
      camera.lookAt(cameraControls.cameraTarget)
    }

    // Mouse event handlers
    const onMouseDown = (event: MouseEvent) => {
      cameraControls.isDragging = true
      cameraControls.previousMousePosition = { x: event.clientX, y: event.clientY }
    }

    const onMouseMove = (event: MouseEvent) => {
      if (cameraControls.isDragging) {
        const deltaMove = {
          x: event.clientX - cameraControls.previousMousePosition.x,
          y: event.clientY - cameraControls.previousMousePosition.y,
        }

        cameraControls.cameraTheta -= deltaMove.x * 0.01
        cameraControls.cameraPhi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraControls.cameraPhi + deltaMove.y * 0.01))
        updateCameraPosition()

        cameraControls.previousMousePosition = { x: event.clientX, y: event.clientY }
      }
    }

    const onMouseUp = () => {
      cameraControls.isDragging = false
    }

    const onWheel = (event: WheelEvent) => {
      cameraControls.cameraRadius = Math.max(5, Math.min(100, cameraControls.cameraRadius + event.deltaY * 0.01))
      updateCameraPosition()
      onControlChange("cameraDistance", cameraControls.cameraRadius)
    }

    const onClick = (event: MouseEvent) => {
      if (cameraControls.isDragging) return

      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(solarSystem.planets.map((p) => p.mesh))

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object
        const planetInfo = clickedObject.userData.info
        if (planetInfo) {
          onPlanetClick(planetInfo)
        }
      }
    }

    // Add event listeners
    renderer.domElement.addEventListener("mousedown", onMouseDown)
    renderer.domElement.addEventListener("mousemove", onMouseMove)
    renderer.domElement.addEventListener("mouseup", onMouseUp)
    renderer.domElement.addEventListener("wheel", onWheel)
    renderer.domElement.addEventListener("click", onClick)

    updateCameraPosition()

    // Initialize clock
    const clock = new THREE.Clock()
    const lastFrameTime = Date.now()

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      solarSystem,
      clock,
      raycaster,
      mouse,
      cameraControls,
      lastFrameTime,
    }

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.domElement.removeEventListener("mousedown", onMouseDown)
      renderer.domElement.removeEventListener("mousemove", onMouseMove)
      renderer.domElement.removeEventListener("mouseup", onMouseUp)
      renderer.domElement.removeEventListener("wheel", onWheel)
      renderer.domElement.removeEventListener("click", onClick)

      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  // Update camera distance when controls change
  useEffect(() => {
    const { cameraControls } = sceneRef.current
    if (cameraControls && cameraControls.cameraRadius !== controls.cameraDistance) {
      cameraControls.cameraRadius = controls.cameraDistance
      const camera = sceneRef.current.camera
      if (camera) {
        camera.position.x =
          cameraControls.cameraRadius * Math.sin(cameraControls.cameraPhi) * Math.cos(cameraControls.cameraTheta)
        camera.position.y = cameraControls.cameraRadius * Math.cos(cameraControls.cameraPhi)
        camera.position.z =
          cameraControls.cameraRadius * Math.sin(cameraControls.cameraPhi) * Math.sin(cameraControls.cameraTheta)
        camera.lookAt(cameraControls.cameraTarget)
      }
    }
  }, [controls.cameraDistance])

  // Update solar system based on controls
  useEffect(() => {
    const { scene, solarSystem } = sceneRef.current
    if (!scene || !solarSystem) return


    // Update planets based on individual settings
    solarSystem.planets.forEach((planet) => {
      const planetSetting = controls.planetSettings[planet.name]
      if (planetSetting) {
        planet.mesh.visible = planetSetting.visible
        planet.mesh.scale.setScalar(planetSetting.size * controls.scale)

        if (planet.orbitLine) {
          planet.orbitLine.visible = controls.showOrbits && planetSetting.visible
        }
      }

      if (planet.mesh.material instanceof THREE.MeshPhongMaterial) {
        planet.mesh.material.wireframe = controls.wireframe
      }
    })

    // Update starfield
    if (solarSystem.starField) {
      solarSystem.starField.visible = controls.showStars
    }
  }, [controls])

  // Animation loop - Completely rewritten for reliable planet rotation and orbit
  useEffect(() => {
    const { scene, camera, renderer, solarSystem } = sceneRef.current
    if (!scene || !camera || !renderer || !solarSystem) return

    // Animation function
    const animate = () => {
      const currentControls = controlsRef.current
      const currentTime = Date.now()
      const deltaTime = (currentTime - sceneRef.current.lastFrameTime) / 1000 // Convert to seconds
      sceneRef.current.lastFrameTime = currentTime

      // Only update if animation is playing
      if (currentControls.isPlaying) {
        // Animate sun rotation
        solarSystem.sun.rotation.y += 0.01 * currentControls.rotationSpeed

        // Animate planets
        solarSystem.planets.forEach((planet) => {
          const planetSetting = currentControls.planetSettings[planet.name]
          if (planetSetting && planetSetting.visible) {
            // Orbital motion - apply speed controls
            const orbitSpeed = planet.orbitSpeed * currentControls.speed * planetSetting.speed
            planet.angle += orbitSpeed * deltaTime * 10 // Multiply by 10 to make it more visible

            // Update planet position
            const scaledRadius = planet.orbitRadius * currentControls.scale
            planet.mesh.position.x = Math.cos(planet.angle) * scaledRadius
            planet.mesh.position.z = Math.sin(planet.angle) * scaledRadius

            // Planet rotation - apply rotation speed controls
            // Multiply by a larger factor to make rotation more visible
            const rotationAmount =
              planet.rotationSpeed * currentControls.rotationSpeed * planetSetting.rotationSpeed * deltaTime * 20

            // Apply rotation directly to the planet mesh
            planet.mesh.rotation.y += rotationAmount
          }
        })

        // Auto-rotate camera if enabled
        if (currentControls.autoRotate) {
          const { cameraControls } = sceneRef.current
          cameraControls.cameraTheta += 0.2 * deltaTime * currentControls.speed
          camera.position.x =
            cameraControls.cameraRadius * Math.sin(cameraControls.cameraPhi) * Math.cos(cameraControls.cameraTheta)
          camera.position.z =
            cameraControls.cameraRadius * Math.sin(cameraControls.cameraPhi) * Math.sin(cameraControls.cameraTheta)
          camera.lookAt(cameraControls.cameraTarget)
        }

        // Animation type specific effects
        switch (currentControls.animationType) {
          case "scaling":
            solarSystem.planets.forEach((planet, index) => {
              const planetSetting = currentControls.planetSettings[planet.name]
              if (planetSetting && planetSetting.visible) {
                const baseScale = planetSetting.size * currentControls.scale
                const pulseScale = 1 + Math.sin(currentTime * 0.001 * 2 + index) * 0.2
                planet.mesh.scale.setScalar(baseScale * pulseScale)
              }
            })
            break

          case "morphing":
            solarSystem.planets.forEach((planet, index) => {
              const planetSetting = currentControls.planetSettings[planet.name]
              if (planetSetting && planetSetting.visible) {
                planet.mesh.position.y = Math.sin(currentTime * 0.001 + index) * 0.5
              }
            })
            break

          case "particles":
            // Add asteroid belt if it doesn't exist
            if (!solarSystem.asteroidBelt) {
              const asteroidCount = Math.min(currentControls.particleCount, 2000)
              const asteroidGeometry = new THREE.BufferGeometry()
              const positions = new Float32Array(asteroidCount * 3)

              for (let i = 0; i < asteroidCount; i++) {
                const angle = Math.random() * Math.PI * 2
                const radius = 8.5 + Math.random() * 1 // Between Mars and Jupiter
                const height = (Math.random() - 0.5) * 0.5

                positions[i * 3] = Math.cos(angle) * radius
                positions[i * 3 + 1] = height
                positions[i * 3 + 2] = Math.sin(angle) * radius
              }

              asteroidGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
              const asteroidMaterial = new THREE.PointsMaterial({
                color: Number.parseInt(currentControls.color.replace("#", "0x")),
                size: 0.05,
                sizeAttenuation: true,
              })

              solarSystem.asteroidBelt = new THREE.Points(asteroidGeometry, asteroidMaterial)
              scene.add(solarSystem.asteroidBelt)
            }

            // Rotate asteroid belt
            if (solarSystem.asteroidBelt) {
              solarSystem.asteroidBelt.rotation.y += 0.001 * currentControls.speed
            }
            break
        }
      }

      renderer.render(scene, camera)
      sceneRef.current.animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
    }
  }, []) // No dependencies to prevent recreation

  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ background: "radial-gradient(ellipse at center, #1a1a2e 0%, #000000 100%)" }}
    />
  )
}

export default ThreeScene
