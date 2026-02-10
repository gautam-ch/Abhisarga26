'use client'

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function MonsterModel() {
    const group = useRef();
    const velocity = useRef(new THREE.Vector2(0, 0));
    const target = useRef(new THREE.Vector2(0, 0));
    const [isMobile, setIsMobile] = useState(false);

    const { scene, animations } = useGLTF("/3d/monster_ani.glb");
    const { actions } = useAnimations(animations, scene);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // play idle animation
    useEffect(() => {
        if (animations.length) {
            actions[animations[0].name]?.play();
        }
    }, [actions, animations]);

    // mouse force
    useEffect(() => {
        const move = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 1.2;
            const y = (e.clientY / window.innerHeight - 0.5) * 0.8;

            target.current.set(x, y);
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    useFrame(() => {
        if (!group.current) return;

        // SPRING PHYSICS
        const stiffness = 0.06;   // attraction strength
        const damping = 0.85;     // resistance

        velocity.current.x += (target.current.x - velocity.current.x) * stiffness;
        velocity.current.y += (target.current.y - velocity.current.y) * stiffness;

        velocity.current.multiplyScalar(damping);

        // APPLY ROTATION (bounded)
        group.current.rotation.y = THREE.MathUtils.clamp(
            velocity.current.x,
            -0.35,
            0.35
        );

        group.current.rotation.x = THREE.MathUtils.clamp(
            velocity.current.y,
            -0.25,
            0.25
        );
    });

    return (
        <group ref={group}>
            <primitive 
                object={scene} 
                scale={isMobile ? 0.35 : 0.6} 
                position={[0, -3.3, 0]} 
            />
        </group>
    );
}

export default function Monster3D() {
    return (
        <Canvas
            className="w-full h-full monster-canvas"
            camera={{ position: [0, 1.2, 8], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={1} />
            <directionalLight position={[5, 6, 5]} intensity={2} />
            <directionalLight position={[-5, 4, -5]} intensity={1.2} />

            <MonsterModel />
            <Environment preset="night" />
        </Canvas>
    );
}
