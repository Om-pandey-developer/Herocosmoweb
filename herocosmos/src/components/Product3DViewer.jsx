'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function ProductCard3D({ imageUrl }) {
  const meshRef = useRef();
  
  // Load texture
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(imageUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [imageUrl]);

  // Rotate slowly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1} // Up/down float intensity
    >
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        {/* A slightly thick card */}
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial 
          attach="material-0" 
          color="#222" 
          roughness={0.8}
        />
        <meshStandardMaterial 
          attach="material-1" 
          color="#222" 
          roughness={0.8}
        />
        <meshStandardMaterial 
          attach="material-2" 
          color="#222" 
          roughness={0.8}
        />
        <meshStandardMaterial 
          attach="material-3" 
          color="#222" 
          roughness={0.8}
        />
        {/* Front Face with the product image */}
        <meshStandardMaterial 
          attach="material-4" 
          map={texture} 
          roughness={0.2} 
          metalness={0.1}
        />
        {/* Back Face */}
        <meshStandardMaterial 
          attach="material-5" 
          color="#111" 
          roughness={0.9} 
        />
      </mesh>
    </Float>
  );
}

export default function Product3DViewer({ imageUrl }) {
  const [arMode, setArMode] = useState(false);

  React.useEffect(() => {
    import('@google/model-viewer').catch(console.error);
  }, []);

  if (arMode) {
    return (
      <div className="w-full h-full relative bg-black/20 rounded-xl overflow-hidden">
        <model-viewer
          src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          style={{ width: '100%', height: '100%' }}
        >
          <button slot="ar-button" className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-purple-600 px-6 py-3 rounded-full font-bold shadow-lg">
            Activate AR Camera
          </button>
        </model-viewer>
        <button 
          onClick={() => setArMode(false)}
          className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs hover:bg-black/70 transition-colors"
        >
          ← Back to 3D View
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setArMode(true)} 
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          AR Try-On
        </button>
      </div>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <ProductCard3D imageUrl={imageUrl} />
        
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
        />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <span className="bg-black/50 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-medium border border-purple-500/30">
          Drag to rotate • Scroll to zoom
        </span>
      </div>
    </div>
  );
}
