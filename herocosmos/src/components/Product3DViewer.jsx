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
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
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
