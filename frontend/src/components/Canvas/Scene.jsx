'use client';

import gsap from 'gsap';
import { useRef } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { FloatingShirt } from './FloatingShirt';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);


const Scene = ({ currentDesign }) => {
  const shirtRef = useRef(null);
  const { scene } = useThree();
  const FLOAT_SPEED = 1.5;

  
  useGSAP(() => {
    if (!shirtRef.current) return;

    gsap.set(shirtRef.current.position, { x: 0 , y:0.71 });
    gsap.set(shirtRef.current.rotation, { x: 0.2 });

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)"
      }
    });
    
    introTl
      .from(shirtRef.current.position, { y:0, z:0},0)
    //   .from(shirtRef.current.rotation, { z: 1 }, 0);

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2
      },
      scrollTrigger: {
        trigger: ".hero",
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    scrollTl
    .to(shirtRef.current.position, { x: 0, y: -0.5, z:0.1 }, 0)
    .to(shirtRef.current.rotation, { z: 0 }, 0)
  }, []);

  return (
    <>
      <group ref={shirtRef}>
        <FloatingShirt design={currentDesign.design} scale={0.8} floatSpeed={FLOAT_SPEED} />
      <Environment files='/hdr/lobby.hdr' environmentIntensity={1} />
      <OrbitControls/>
      </group>
      
    </>
  );
};

export default Scene;