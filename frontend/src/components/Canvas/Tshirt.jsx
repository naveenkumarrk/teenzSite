// 'use client'

// import React, { useRef } from 'react'
// import { useGLTF, useTexture } from '@react-three/drei'
// import * as THREE from 'three'

// const textures = {
//   texture1: '/labels/texture1.JPG',
//   texture2: '/labels/texture2.png',
//   texture3: '/labels/texture3.png'
// }

// export function Tshirt({ textureUrl = textures.texture1, ...props }) {
//   const { nodes, materials } = useGLTF('/scene.gltf')
//   const texture = useTexture(textureUrl)

//   // Create a new material based on the original, but with the new texture
//   const newMaterial = new THREE.MeshStandardMaterial({
//     ...materials['Material.001'],
//     map: texture
//   })

//   return (
//     <group {...props} dispose={null}>
//       <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} scale={1.5}>
//         <mesh
//           name="Object_2"
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_2.geometry}
//           material={newMaterial}
//         />
//         <mesh
//           name="Object_3"
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_3.geometry}
//           material={newMaterial}
//         />
//         <mesh
//           name="Object_4"
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_4.geometry}
//           material={newMaterial}
//         />
//         <mesh
//           name="Object_5"
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_5.geometry}
//           material={newMaterial}
//         />
//       </group>
//     </group>
//   )
// }

// useGLTF.preload('/scene.gltf')
'use client'

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload("/oversized.glb");

const designTextures = {
  design1: "/labels/hawk.png",
  design2: "/labels/social.png",
  design3: "/labels/travis.png",
};

export function Tshirt({ design = "design1", scale = 1.8, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/oversized.glb')
  const { actions } = useAnimations(animations, group)

  const labels = useTexture(designTextures)

  // Fixes upside down labels if needed
  Object.values(labels).forEach(label => {
    label.flipY = false
  })

  const label = labels[design]

  const baseMaterial = new THREE.MeshStandardMaterial({
    ...materials['Shirt Texture'],
    map: label,
  })

  useEffect(() => {
    // Start the animation if it exists
    if (actions.Animation) {
      actions.Animation.play()
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null} scale={scale}>
      <group name="Scene">
        <mesh
          name="Animated_Shirt"
          castShadow
          receiveShadow
          geometry={nodes.Animated_Shirt.geometry}
          position={[0,0,0]}
        >
          <primitive object={baseMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  )
}
