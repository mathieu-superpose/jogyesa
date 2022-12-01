import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODEL = "/models/buddha.glb";

const goldMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0xe2ab27),
  metalness: 0.95,
  roughness: 0.1,
});

export default function Buddha(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(MODEL);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].reset().fadeIn().play();
  }, []);

  useFrame((state, delta) => {});

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            castShadow
            name="Hat"
            geometry={nodes.Hat.geometry}
            material={materials["hat.001"]}
            skeleton={nodes.Hat.skeleton}
          />
          <skinnedMesh
            castShadow
            name="Body"
            geometry={nodes.Body.geometry}
            material={goldMaterial}
            skeleton={nodes.Body.skeleton}
          />

          <skinnedMesh
            castShadow
            name="Vest"
            geometry={nodes.Vest.geometry}
            material={materials["clothes.001"]}
            skeleton={nodes.Vest.skeleton}
          />
          <group name="Head">
            <skinnedMesh
              castShadow
              name="head001"
              geometry={nodes.head001.geometry}
              material={goldMaterial}
              skeleton={nodes.head001.skeleton}
            />
            <skinnedMesh
              castShadow
              name="head001_1"
              geometry={nodes.head001_1.geometry}
              material={materials["mouth.001"]}
              skeleton={nodes.head001_1.skeleton}
            />
            <skinnedMesh
              castShadow
              name="head001_2"
              geometry={nodes.head001_2.geometry}
              material={materials["tongue.001"]}
              skeleton={nodes.head001_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="head001_3"
              geometry={nodes.head001_3.geometry}
              material={materials["black.001"]}
              skeleton={nodes.head001_3.skeleton}
            />
          </group>
          <skinnedMesh
            castShadow
            name="Skirt"
            geometry={nodes.Skirt.geometry}
            material={materials["clothes.001"]}
            skeleton={nodes.Skirt.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL);
