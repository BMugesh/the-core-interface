'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CoreMesh({ berserk }: { berserk: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const primaryColor = berserk ? '#ff1e38' : '#00e5ff';
  const secondaryColor = berserk ? '#ff6b00' : '#ff2bd6';

  useFrame((_, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.25;
      outerRef.current.rotation.x += delta * 0.12;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.45;
      innerRef.current.rotation.z += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color={primaryColor} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.92, 0]} />
        <meshBasicMaterial color={secondaryColor} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0.2, 0]}>
        <torusGeometry args={[2.35, 0.015, 8, 64]} />
        <meshBasicMaterial color={primaryColor} transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function ParticleDust({ berserk }: { berserk: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 90;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + (i % 5) * 0.45;
      const theta = (i / count) * Math.PI * 2 * 3;
      const phi = Math.acos(2 * ((i * 7) % count) / count - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={berserk ? '#ff6b00' : '#00e5ff'}
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default function HoloCore3D({ berserk = false }: { berserk?: boolean }) {
  return (
    <div aria-hidden="true" className="w-full h-full pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <CoreMesh berserk={berserk} />
        <ParticleDust berserk={berserk} />
      </Canvas>
    </div>
  );
}
