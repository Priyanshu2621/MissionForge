import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AxesHelper, Vector3 } from "three";
import { OrbitControls, Grid } from "@react-three/drei";
import ModelLoader from "../components/ModelLoader";

// Axes Helper
const Axes = ({ size = 5 }) => {
  const { scene } = useThree();
  useEffect(() => {
    const helper = new AxesHelper(size);
    scene.add(helper);
    return () => scene.remove(helper);
  }, [scene, size]);
  return null;
};

// Player with WASD control + bank proximity detection
const Player = ({ initialPosition = [0, 0], bankPosition = [12, 12], onReachBank }) => {
  const ref = useRef();
  const speed = 0.1;
  const reachedRef = useRef(false);

  useFrame(() => {
    if (!ref.current) return;
    const keys = window.keyStates || {};
    const dir = new Vector3();

    if (keys.w) dir.z -= speed;
    if (keys.s) dir.z += speed;
    if (keys.a) dir.x -= speed;
    if (keys.d) dir.x += speed;

    ref.current.position.add(dir);

    // Trigger event when player reaches the bank
    const bankPos = new Vector3(...bankPosition, 0);
    if (!reachedRef.current && ref.current.position.distanceTo(bankPos) < 2) {
      reachedRef.current = true;
      onReachBank && onReachBank();
    }
  });

  return (
    <group ref={ref} position={[initialPosition[0], 0, initialPosition[1]]}>
      <ModelLoader
        path="/models/player.glb"
        scale={1.2}
        fallback={
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="blue" />
          </mesh>
        }
      />
    </group>
  );
};

// NPC with patrol logic
const NPC = ({ start = [0, 0], end = [2, 0] }) => {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;
    const t = (Math.sin(Date.now() * 0.001) + 1) / 2;
    const pos = new Vector3().lerpVectors(
      new Vector3(...start, 0),
      new Vector3(...end, 0),
      t
    );
    ref.current.position.set(pos.x, pos.y, pos.z);
  });

  return (
    <group ref={ref} position={[start[0], 0, start[1]]}>
      <ModelLoader
        path="/models/police.glb"
        scale={1.2}
        fallback={
          <mesh>
            <sphereGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        }
      />
    </group>
  );
};

// Scene Renderer
const Scene = ({ gameData }) => {
  const npcs = gameData?.npcs || [];
  const objects = gameData?.environment?.objects || [];
  const player = gameData?.player;

  // WASD key tracking
  useEffect(() => {
    window.keyStates = {};
    const down = (e) => (window.keyStates[e.key.toLowerCase()] = true);
    const up = (e) => (window.keyStates[e.key.toLowerCase()] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Bank position detection for highlight + mission logic
  const bankObject = objects.find((obj) => obj.type === "bank");
  const bankPosition = bankObject?.position || [12, 12];

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Grid />
      <Axes size={5} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Highlighted Bank Zone */}
      {bankObject && (
        <mesh position={[bankPosition[0], 0.01, bankPosition[1]]}>
          <boxGeometry args={[3, 0.05, 3]} />
          <meshStandardMaterial color="gold" transparent opacity={0.4} />
        </mesh>
      )}

      {/* Player */}
      {player?.position && Array.isArray(player.position) ? (
        <Player
          initialPosition={player.position}
          bankPosition={bankPosition}
          onReachBank={() => alert("🏦 Bank Reached! Mission Triggered.")}
        />
      ) : (
        <Player
          initialPosition={[0, 0]}
          bankPosition={bankPosition}
          onReachBank={() => alert("🏦 Bank Reached! Mission Triggered.")}
        />
      )}

      {/* NPCs */}
      {npcs.map((npc, i) => {
        const start = npc.path?.[0] || npc.position || [0, 0];
        const end = npc.path?.[1] || [start[0] + 2, start[1]];
        return <NPC key={`npc-${i}`} start={start} end={end} />;
      })}

      {/* Environment Objects */}
      {objects.map((obj, i) => {
        const pos = obj?.position;
        if (!pos || pos.length < 2) return null;

        let modelPath = "/models/car.glb";
        switch (obj.type) {
          case "bank":
            modelPath = "/models/bank.glb";
            break;
          case "car":
            modelPath = "/models/car.glb";
            break;
          // Add more types here (e.g. "atm", "fence", etc.)
        }

        return (
          <ModelLoader
            key={`obj-${i}`}
            path={modelPath}
            position={[pos[0], 0.5, pos[1]]}
            scale={1.5}
            fallback={
              <mesh position={[pos[0], 0.5, pos[1]]}>
                <boxGeometry />
                <meshStandardMaterial color="green" />
              </mesh>
            }
          />
        );
      })}
    </Canvas>
  );
};

export default Scene;
