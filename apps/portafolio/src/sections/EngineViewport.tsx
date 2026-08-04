import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferAttribute, BufferGeometry } from "three";
import type { Mesh, Points } from "three";

/** Two counter-rotating wireframe solids (amber engine shell, acid core) with
 *  drifting dust. Unlit basic materials, so it renders identically regardless
 *  of three's lighting model and stays cheap on low-end GPUs. */
function Object3D({ spin }: { spin: boolean }) {
  const outer = useRef<Mesh>(null);
  const inner = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!spin) return;
    if (outer.current) {
      outer.current.rotation.y += dt * 0.34;
      outer.current.rotation.x += dt * 0.12;
    }
    if (inner.current) {
      inner.current.rotation.y -= dt * 0.5;
      inner.current.rotation.z += dt * 0.18;
    }
  });
  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color="#ff9e2c" wireframe />
      </mesh>
      <mesh ref={inner} scale={0.62}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color="#7dfc5a" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={0.34}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color="#ff9e2c" />
      </mesh>
    </group>
  );
}

/** Dust positions are rolled once at module load, so render stays pure. */
const DUST_POSITIONS = (() => {
  const n = 90;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n * 3; i++) pos[i] = (Math.random() - 0.5) * 11;
  return pos;
})();

function Dust() {
  const ref = useRef<Points>(null);
  const geo = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(DUST_POSITIONS, 3));
    return g;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.03;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.035} color="#7dfc5a" transparent opacity={0.55} />
    </points>
  );
}

export default function EngineViewport({ spin = true }: { spin?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 46 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={spin ? "always" : "demand"}
    >
      <Object3D spin={spin} />
      <Dust />
    </Canvas>
  );
}
