import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODEL = "/models/buddha.glb";

const SPEED = 5;

const goldMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0xe2ab27),
  metalness: 0.95,
  roughness: 0.1,
});

export default function Buddha(props) {
  const buddha = useRef();
  const { nodes, materials, animations } = useGLTF(MODEL);
  const { actions, names } = useAnimations(animations, buddha);
  const [subscribedKeys, getKeys] = useKeyboardControls();
  const [isWalking, setIsWalking] = useState(false);

  const [smoothedCharacterDirection] = useState(
    () => new THREE.Vector3(0, 0, 0)
  );
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(20, 20, 20)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  useEffect(() => {
    const animation = isWalking ? names[4] : names[0];
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5)
  }, [isWalking]);

  useFrame((state, delta) => {
    const { up, down, left, right } = getKeys();

    const direction = { x: 0, y: 0, z: 0 };

    if (up) direction.z -= 1;
    if (down) direction.z += 1;
    if (left) direction.x -= 1;
    if (right) direction.x += 1;

    const walks = Math.abs(direction.x) + Math.abs(direction.z);
    if(walks && !isWalking) setIsWalking(true)
    if(!walks && isWalking) setIsWalking(false)

    buddha.current.position.x += direction.x * delta * SPEED;
    buddha.current.position.z += direction.z * delta * SPEED;

    const characterDirection = new THREE.Vector3();
    characterDirection.copy(buddha.current.position);
    characterDirection.x += direction.x
    characterDirection.z += direction.z

    smoothedCharacterDirection.lerp(characterDirection, 5 * delta)

    buddha.current.lookAt(smoothedCharacterDirection);
  });

  return (
    <group ref={buddha} dispose={null}>
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
