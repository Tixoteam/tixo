import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const starsRef = useRef<THREE.Points[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      2000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000511, 1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create galaxy particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // Create spiral galaxy pattern
    const arms = 5;
    const armWidth = 0.5;
    
    for (let i = 0; i < particlesCount; i++) {
      // Distance from center
      const radius = THREE.MathUtils.randFloat(1, 30) * THREE.MathUtils.randFloat(0.2, 1);
      
      // Angle around center
      const spinAngle = radius * 0.2;
      const armAngle = (i % arms) * Math.PI * 2 / arms;
      
      // Add randomness to the angle
      const angle = armAngle + spinAngle + THREE.MathUtils.randFloatSpread(armWidth);
      
      // Convert polar coordinates to Cartesian
      const x = Math.cos(angle) * radius;
      const y = THREE.MathUtils.randFloatSpread(2) * (radius * 0.1); // Flatten the galaxy
      const z = Math.sin(angle) * radius;
      
      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;
      
      // Colors - blue and purple with hints of cyan
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      const normalizedDistance = Math.min(distanceFromCenter / 30, 1);
      
      // Inside is more blue/purple, outside more cyan
      colorArray[i * 3] = 0.2 + (normalizedDistance * 0.3); // R
      colorArray[i * 3 + 1] = 0.2 + (normalizedDistance * 0.6); // G
      colorArray[i * 3 + 2] = 0.5 + (normalizedDistance * 0.5); // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Material with vertex colors
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    // Galaxy mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesRef.current = particlesMesh;
    
    // Add distant stars
    const starLayers = 3;
    for (let layer = 0; layer < starLayers; layer++) {
      const starCount = 1000;
      const starsGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      
      for (let i = 0; i < starCount * 3; i += 3) {
        // Distribute stars in a sphere
        const radius = 100 + (layer * 300);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i + 2] = radius * Math.cos(phi);
      }
      
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      
      const starsMaterial = new THREE.PointsMaterial({
        size: 0.2 + (layer * 0.2),
        color: 0xffffff,
        transparent: true,
        opacity: 0.8 - (layer * 0.2)
      });
      
      const starPoints = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starPoints);
      starsRef.current.push(starPoints);
    }

    // Animation loop
    const animate = () => {
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.z += 0.0001;
      }
      
      // Animate stars at different speeds
      starsRef.current.forEach((stars, index) => {
        stars.rotation.y += 0.0001 * (index + 1);
        stars.rotation.x += 0.00005 * (index + 1);
      });
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Mouse movement effect
    const handleMouseMove = (event: MouseEvent) => {
      if (!particlesRef.current) return;
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Subtle rotation response to mouse
      particlesRef.current.rotation.y += mouseX * 0.0002;
      particlesRef.current.rotation.x += mouseY * 0.0002;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameIdRef.current);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (particlesRef.current && sceneRef.current) {
        sceneRef.current.remove(particlesRef.current);
      }
      
      starsRef.current.forEach(stars => {
        if (sceneRef.current) {
          sceneRef.current.remove(stars);
        }
      });
    };
  }, []);

  return (
    <div className="relative">
      <div ref={containerRef} className="w-full min-h-screen fixed inset-0 z-0">
        {/* Galaxy particle animation renders here */}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParticleBackground;