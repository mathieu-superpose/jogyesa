import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Buddha from "./Buddha";
import Floor from './Floor';

import "./App.css";

function App() {
  return (
    <div className="App">
      <Canvas
        shadows
      >
        <OrbitControls />
        <ambientLight />
        <directionalLight 
          castShadow
          position={[-2, 2, 2]}
          intensity={10}
        />
        <Buddha />
        <Floor />
      </Canvas>
    </div>
  );
}

export default App;
