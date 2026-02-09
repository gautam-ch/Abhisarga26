'use client';

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function Dice({ onComplete }) {
  const meshRef = useRef();
  const [rollComplete, setRollComplete] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const { scene } = useGLTF("/dice/d20.glb");
  const [diceScale, setDiceScale] = useState(2.5);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) setDiceScale(1.7);      
      else if (w < 768) setDiceScale(2.1);  
      else if (w <= 1180) setDiceScale(2.5); 
      else setDiceScale(2.8);               
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const targetRotation = useMemo(() => [
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
  ], []);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = false;
      child.material.opacity = 1;
      child.material.depthWrite = true;
      child.material.depthTest = true;
      child.material.side = THREE.FrontSide; 
      child.material.emissiveIntensity = 0.3; 
      child.material.needsUpdate = true;
    }
  });

  useFrame((state, delta) => {
    if (!meshRef.current || isSettled) return;

    if (!rollComplete) {
      meshRef.current.rotation.x += delta * 2;
      meshRef.current.rotation.y += delta * 1.8;
      
      const moveFactor = window.innerWidth < 768 ? 0.7 : 2;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime) * moveFactor;
      meshRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 2)) * 1.5;

      if (state.clock.elapsedTime > 3) setRollComplete(true);
    } else {
      meshRef.current.rotation.x += (targetRotation[0] - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (targetRotation[1] - meshRef.current.rotation.y) * 0.1;
      meshRef.current.rotation.z += (targetRotation[2] - meshRef.current.rotation.z) * 0.1;
      meshRef.current.position.x += (0 - meshRef.current.position.x) * 0.1;
      meshRef.current.position.y += (0 - meshRef.current.position.y) * 0.1;

      if (
        Math.abs(meshRef.current.rotation.x - targetRotation[0]) < 0.01 &&
        Math.abs(meshRef.current.rotation.y - targetRotation[1]) < 0.01
      ) {
        setIsSettled(true);
        onComplete();
      }
    }
  });

  return <primitive key={diceScale} ref={meshRef} object={scene} scale={[diceScale, diceScale, diceScale]} />;
}

export default function D20Loader({ onComplete }) {
  const [showTransition, setShowTransition] = useState(false);
  const [fov, setFov] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      setFov(window.innerWidth < 768 ? 45 : 50);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!showTransition && (
          <motion.div key="dice-canvas" exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center bg-black touch-none overflow-hidden" onWheel={(e) => e.preventDefault()}>
            <Canvas camera={{ position: [0, 1.5, 8], fov: fov }}>
              <ambientLight intensity={0.9} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Dice onComplete={() => setShowTransition(true)} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>

      {showTransition && (
        <div className="fixed inset-0 z-[600] flex pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="h-full bg-black border-x border-white/5"
              style={{ width: `${100 / 12}%` }}
              initial={{ y: 0 }}
              animate={{ y: i % 2 === 0 ? "-100%" : "100%" }}
              transition={{ delay: i * 0.04, duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
              onAnimationStart={i === 0 ? onComplete : undefined}
            />
          ))}
        </div>
      )}
    </>
  );
}