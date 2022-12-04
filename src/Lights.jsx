export default function Lights() {
  return (
    <>
      <ambientLight />
      <directionalLight castShadow position={[4, 7, 0]} intensity={7} />
    </>
  );
}
