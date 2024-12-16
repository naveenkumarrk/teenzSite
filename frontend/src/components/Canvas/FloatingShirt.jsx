'use client'

import React from 'react'
import { Float } from '@react-three/drei'
import { Tshirt } from './Tshirt'

const designTextures = {
  design1: "/labels/texture1.JPG",
  design2: "/labels/texture2.png",
  design3: "/labels/Design.jpg",
}

export const FloatingShirt = React.forwardRef(({
  design,
  floatSpeed = 1,
  rotationIntensity = 1,
  floatIntensity = 1,
  floatingRange = 0.1,
  children,
  ...props
}, ref) => {
  return (
    <group ref={ref} {...props}>
      <Float
        speed={floatSpeed}
        rotationIntensity={rotationIntensity}
        floatIntensity={floatIntensity}
        floatingRange={floatingRange}
      >
        {children}
        <Tshirt design={design} scale={1} />
      </Float>
    </group>
  )
})

FloatingShirt.displayName = 'FloatingShirt'