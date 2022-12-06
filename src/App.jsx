import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";

import Buddha from "./Buddha";
import Temple from "./assets/Temple";
import Floor from "./Floor";
import Lights from "./Lights";


import "./App.css";

function App() {
  return (
    <div className="App">
      <KeyboardControls
        map={[
          { name: "up", keys: ["ArrowUp"] },
          { name: "down", keys: ["ArrowDown"] },
          { name: "left", keys: ["ArrowLeft"] },
          { name: "right", keys: ["ArrowRight"] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 75,
            position: [0, 10, 15],
          }}
          legacy={true}
        >
          <OrbitControls />
          <Lights />
          <Buddha />
          <Temple position={[0, 0, -13]} />
          <Floor />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default App;
