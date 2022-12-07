import React, { useEffect, useRef, useState, useContext } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// import { GamepadsContext } from "react-gamepads";

const MODEL = "/models/buddha.glb";

const SPEED = 2;
const WALKING_SPEED = 2;
const RUNNING_SPEED = 4;

const goldMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0xe2ab27),
  metalness: 0.95,
  roughness: 0.1,
});

export default function Buddha() {
  const buddha = useRef();
  const { nodes, materials, animations } = useGLTF(MODEL);
  const { actions, names } = useAnimations(animations, buddha);
  const [subscribedKeys, getKeys] = useKeyboardControls();
  const [isWalking, setIsWalking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  // const { gamepads } = useContext(GamepadsContext);

  const [smoothedCharacterDirection] = useState(
    () => new THREE.Vector3(0, 0, 0)
  );
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(20, 20, 20)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const getCurrentMove = () => {
    /*
    0: "Idle"
    1: "Jump"
    2: "Roll"
    3: "Run"
    4: "Walk"
    */

    if (!isMoving) return names[0];
    if (isWalking) return names[4];
    return names[3];
  };

  useEffect(() => {
    const animation = getCurrentMove();

    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [isMoving, isWalking]);

  useFrame((state, delta) => {
    const { up, down, left, right } = getKeys();

    const direction = { x: 0, y: 0, z: 0 };

    if (up) direction.z -= 1;
    if (down) direction.z += 1;
    if (left) direction.x -= 1;
    if (right) direction.x += 1;

    const walks = Math.abs(direction.x) + Math.abs(direction.z);
    if (walks && !isMoving) setIsMoving(true);
    if (!walks && isMoving) setIsMoving(false);

    const speed = isWalking ? WALKING_SPEED : RUNNING_SPEED;

    buddha.current.position.x += direction.x * delta * speed;
    buddha.current.position.z += direction.z * delta * speed;

    const characterDirection = new THREE.Vector3();
    characterDirection.copy(buddha.current.position);
    characterDirection.x += direction.x;
    characterDirection.z += direction.z;

    smoothedCharacterDirection.lerp(characterDirection, 5 * delta);

    buddha.current.lookAt(smoothedCharacterDirection);
  });

  return (
    <group scale={0.5} ref={buddha} dispose={null}>
      <group name="Buddha" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />

        <skinnedMesh
          name="body001"
          geometry={nodes.body001.geometry}
          material={goldMaterial}
          skeleton={nodes.body001.skeleton}
        />
        <skinnedMesh
          name="body001_1"
          geometry={nodes.body001_1.geometry}
          material={materials["black.001"]}
          skeleton={nodes.body001_1.skeleton}
        />
        <skinnedMesh
          name="body001_2"
          geometry={nodes.body001_2.geometry}
          material={materials["clothes.001"]}
          skeleton={nodes.body001_2.skeleton}
        />
        <skinnedMesh
          name="body001_3"
          geometry={nodes.body001_3.geometry}
          material={materials["mouth.001"]}
          skeleton={nodes.body001_3.skeleton}
        />
        <skinnedMesh
          name="body001_4"
          geometry={nodes.body001_4.geometry}
          material={materials["tongue.001"]}
          skeleton={nodes.body001_4.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL);
