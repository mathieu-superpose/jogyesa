import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const MODEL = "/models/temple.glb";

export default function Temple(props) {
  const { nodes, materials } = useGLTF(MODEL);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Beams.geometry}
        material={materials.TempleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Platform.geometry}
        material={materials.TempleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RoofBorder.geometry}
        material={materials.TempleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Walls.geometry}
        material={materials.TempleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Decor.geometry}
        material={materials.TempleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shutters.geometry}
        material={materials.TempleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Roof.geometry}
        material={materials.TempleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stairs.geometry}
        material={materials.TempleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Columns.geometry}
        material={materials.TempleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Statues.geometry}
        material={materials.TempleMaterial}
      />
    </group>
  );
}

useGLTF.preload(MODEL);
