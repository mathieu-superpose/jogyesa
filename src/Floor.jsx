function Floor() {
  return (
    <mesh
      receiveShadow
    >
      <boxGeometry args={[25, 0.1, 25]} />
      <meshStandardMaterial color={"green"} />
    </mesh>
  );
}

export default Floor;
