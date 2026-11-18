
import { useMemo } from "react";
import * as THREE from "three";

function Block({ position, scale, color, rotation = [0, 0, 0], material }) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      material={material}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

function DragonWing({ side, mats }) {
  const flip = side;

  const bones = [
    [0.2, 0, 0],
    [1.4, 0, -0.8],
    [2.8, 0, -1.8],
    [4.2, 0, -2.8],
    [3.4, 0, -0.5],
    [2.3, 0, 0.8],
    [1.1, 0, 1.4],
  ];

  const panels = [
    { p: [1.1, 0, -0.35], s: [1.9, 0.12, 0.65] },
    { p: [2.1, 0, -1.0], s: [2.0, 0.12, 0.65] },
    { p: [3.1, 0, -1.8], s: [2.0, 0.12, 0.65] },
    { p: [2.6, 0, -0.3], s: [1.5, 0.12, 0.65] },
    { p: [1.5, 0, 0.55], s: [1.5, 0.12, 0.6] },
  ];

  return (
    <group scale={[flip, 1, 1]}>
      {/* Qanot pardasi */}
      {panels.map((item, i) => (
        <Block
          key={i}
          position={item.p}
          scale={item.s}
          material={mats.wing}
        />
      ))}

      {/* Qanot suyaklari */}
      {bones.map((p, i) => (
        <Block
          key={i}
          position={p}
          scale={[0.16, 0.2, 0.16]}
          material={mats.spike}
        />
      ))}

      <Block position={[2.1, 0.03, -0.9]} scale={[3.8, 0.13, 0.13]} material={mats.bone} rotation={[0, 0, -0.55]} />
      <Block position={[2.5, 0.03, -1.4]} scale={[3.5, 0.13, 0.13]} material={mats.bone} rotation={[0, 0, -0.9]} />
      <Block position={[1.8, 0.03, 0.2]} scale={[2.6, 0.13, 0.13]} material={mats.bone} rotation={[0, 0, 0.4]} />

      {/* Qanot uchlari */}
      <Block position={[4.2, 0, -2.8]} scale={[0.25, 0.3, 0.8]} material={mats.spike} rotation={[0, 0, -0.5]} />
    </group>
  );
}

function DragonTail({ mats }) {
  const parts = [
    [0, 0, -1.7, 0.75],
    [0.1, 0, -2.5, 0.65],
    [0.3, 0.1, -3.3, 0.52],
    [0.55, 0.2, -4.0, 0.42],
    [0.8, 0.3, -4.65, 0.32],
    [1.0, 0.35, -5.2, 0.23],
    [1.25, 0.4, -5.7, 0.16],
    [1.5, 0.5, -6.1, 0.1],
  ];

  return (
    <group>
      {parts.map(([x, y, z, size], i) => (
        <group key={i} position={[x, y, z]}>
          <Block
            position={[0, 0, 0]}
            scale={[size, size, size * 1.8]}
            material={i % 2 ? mats.body : mats.armor}
          />
          <Block
            position={[0, size * 0.65, 0]}
            scale={[size * 0.55, size * 0.7, size * 0.7]}
            material={mats.spike}
          />
        </group>
      ))}

      <Block
        position={[1.75, 0.55, -6.45]}
        scale={[0.12, 0.18, 0.7]}
        material={mats.spike}
        rotation={[0, 0, -0.6]}
      />
    </group>
  );
}

function DragonLeg({ side, z, mats }) {
  return (
    <group position={[side * 0.72, -0.65, z]}>
      <Block position={[0, 0, 0]} scale={[0.55, 0.55, 0.6]} material={mats.body} />

      <Block
        position={[0, -0.45, 0.12]}
        scale={[0.35, 0.65, 0.38]}
        material={mats.armor}
        rotation={[0.15, 0, side * 0.12]}
      />

      <Block
        position={[0, -0.82, 0.38]}
        scale={[0.65, 0.2, 0.55]}
        material={mats.body}
      />

      {[-1, 0, 1].map((i) => (
        <Block
          key={i}
          position={[i * 0.19, -0.91, 0.65]}
          scale={[0.12, 0.12, 0.25]}
          material={mats.spike}
        />
      ))}
    </group>
  );
}

export default function Dragon() {
  const mats = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({
      color: "#073b3b",
      roughness: 0.38,
      metalness: 0.65,
    }),
    armor: new THREE.MeshStandardMaterial({
      color: "#075a56",
      roughness: 0.3,
      metalness: 0.8,
    }),
    wing: new THREE.MeshStandardMaterial({
      color: "#092b2d",
      roughness: 0.7,
      metalness: 0.25,
      side: THREE.DoubleSide,
    }),
    bone: new THREE.MeshStandardMaterial({
      color: "#031c20",
      roughness: 0.35,
      metalness: 0.6,
    }),
    spike: new THREE.MeshStandardMaterial({
      color: "#20c9b8",
      emissive: "#087d77",
      emissiveIntensity: 0.7,
      roughness: 0.25,
      metalness: 0.7,
    }),
    eye: new THREE.MeshBasicMaterial({
      color: "#00ffe1",
      toneMapped: false,
    }),
  }), []);

  return (
    <group>
      {/* TANA */}
      <Block
        position={[0, 0, -0.1]}
        scale={[1.35, 1.15, 2.8]}
        material={mats.body}
      />

      {/* TANADAGI ZIRHLAR */}
      {Array.from({ length: 8 }, (_, i) => (
        <Block
          key={i}
          position={[0, 0.57, 0.95 - i * 0.4]}
          scale={[1.1, 0.18, 0.3]}
          material={mats.armor}
        />
      ))}

      {/* ORQA TIKANLAR */}
      {Array.from({ length: 12 }, (_, i) => (
        <Block
          key={i}
          position={[0, 0.92, 1.1 - i * 0.35]}
          scale={[0.25, 0.55, 0.25]}
          material={mats.spike}
          rotation={[0, 0, i % 2 ? -0.15 : 0.15]}
        />
      ))}

      {/* BO'YIN */}
      <Block
        position={[0, 0.55, 1.8]}
        scale={[0.85, 0.9, 1.65]}
        material={mats.body}
        rotation={[-0.35, 0, 0]}
      />

      <Block
        position={[0, 1.05, 2.4]}
        scale={[0.7, 0.7, 0.8]}
        material={mats.armor}
      />

      {/* BOSH */}
      <group position={[0, 1.25, 2.95]}>
        <Block
          position={[0, 0, 0]}
          scale={[1.0, 0.85, 1.1]}
          material={mats.armor}
        />

        {/* TUMSHUQ */}
        <Block
          position={[0, -0.2, 0.75]}
          scale={[0.75, 0.4, 0.75]}
          material={mats.body}
        />

        {/* PASTKI JAG' */}
        <Block
          position={[0, -0.48, 0.68]}
          scale={[0.7, 0.15, 0.7]}
          material={mats.bone}
        />

        {/* KO'ZLAR */}
        {[-1, 1].map((s) => (
          <group key={s}>
            <Block
              position={[s * 0.51, 0.13, 0.35]}
              scale={[0.12, 0.15, 0.18]}
              material={mats.eye}
            />

            {/* SHOH */}
            <Block
              position={[s * 0.38, 0.65, -0.3]}
              scale={[0.2, 0.85, 0.2]}
              material={mats.spike}
              rotation={[0, 0, -s * 0.3]}
            />

            {/* YON TIKANLAR */}
            <Block
              position={[s * 0.55, 0.3, -0.25]}
              scale={[0.3, 0.22, 0.4]}
              material={mats.spike}
            />
          </group>
        ))}

        {/* BURUN */}
        {[-1, 1].map((s) => (
          <Block
            key={s}
            position={[s * 0.2, -0.08, 1.1]}
            scale={[0.1, 0.1, 0.12]}
            material={mats.bone}
          />
        ))}
      </group>

      {/* OYOQLAR */}
      <DragonLeg side={-1} z={0.85} mats={mats} />
      <DragonLeg side={1} z={0.85} mats={mats} />
      <DragonLeg side={-1} z={-0.95} mats={mats} />
      <DragonLeg side={1} z={-0.95} mats={mats} />

      {/* QANOTLAR */}
      <group position={[0.65, 0.65, 0.1]}>
        <DragonWing side={1} mats={mats} />
      </group>

      <group position={[-0.65, 0.65, 0.1]}>
        <DragonWing side={-1} mats={mats} />
      </group>

      {/* DUM */}
      <DragonTail mats={mats} />
    </group>
  );
}
