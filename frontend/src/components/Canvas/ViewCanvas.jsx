import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import { Preload } from '@react-three/drei';
// import { Perf } from "r3f-perf";

export default function ViewCanvas({ currentDesign }) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none',
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{ fov: 30 }}
    >
      <Scene currentDesign={currentDesign} />
      {/* <Perf /> */}
      <Preload all />
    </Canvas>
  );
}
