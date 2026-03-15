"use client";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Physics, RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import { ErrorBoundary } from "react-error-boundary";

function MuseumModel() {
  const { scene } = useGLTF("one.glb");
  return <primitive object={scene} position={[0, -1, 0]} />; 
}

const proximityPoints = [
  {
    coordinates: [-0.9898936748504639, -2.5, 0.16347810626029968],
    radius: 2,
    info: {
      title: "THE VILLAGE SCHOOL by Jan Steen (c. 1660)",
      description: "A humorous Dutch genre painting showing the chaos in a small schoolhouse.",
    },
  },
  {
    coordinates: [6.055342197418213, -2.5, 6.490345001220703],
    radius: 2,
    info: {
      title: "THE LETTER by Alfred Stevens (c. 1860s)",
      description: "A quiet, intimate moment of a woman reading a letter, showcasing 19th-century domestic life.",
    },
  },
  {
    coordinates: [1.7803459167480469, -2.5, 8.226232528686523],
    radius: 2,
    info: {
      title: "THE FLOWER GIRL by Charles Cromwell Ingham (1846)",
      description: "Romanticized portrait of a street flower seller in New York City.",
    },
  },
  {
    coordinates: [-1.6695455312728882, -2.5, 1.975185751914978],
    radius: 1.5,
    info: {
      title: "THE CHESS PLAYER by Thomas Eakins (1876)",
      description: "Realistic scene of men focused on a chess match, symbolizing strategy and intellect.",
    },
  },
  {
    coordinates: [1.7341997623443604, -2.5, -0.3305415213108063],
    radius: 2,
    info: {
      title: "THE YOUNG MECHANIC by Frank Duveneck (1877)",
      description: "Portrait of a working-class youth, representing American realism and labor themes.",
    },
  },
  {
    coordinates: [-1.9085482358932495, -2.5, -7.535684108734131],
    radius: 2,
    info: {
      title: "THE FIRST SCHOOL by Nikolay Bogdanov-Belsky (1892)",
      description: "Strong symbol of enlightenment and social progress.",
    },
  },
  {
    coordinates: [-5.39858341217041, -2.5, -7.986189365386963],
    radius: 1.5,
    info: {
      title: "IDLE HOURS by William Merritt Chase (1894)",
      description: "Portrays women leisurely relaxing by the seashore, part of American Impressionism.",
    },
  },
  {
    coordinates: [-8.101863861083984, -2.5, -7.523684501647949],
    radius: 1.5,
    info: {
      title: "⁠THE JOLLY FLATBOATMEN by George Caleb Bingham (1846)",
      description: "Celebrates American frontier life with boatmen dancing on a river barge.",
    },
  },
  {
    coordinates: [-7.915064811706543, -2.5, -6.682156562805176],
    radius: 1.5,
    info: {
      title: "THE WIDOWER by Albert Neuhuys (c. 1880)",
      description: "A somber Dutch painting of a father alone with his child, reflecting grief and responsibility.",
    },
  },
  {
    coordinates: [-5.239772796630859, -2.5, -5.834741592407227],
    radius: 1.5,
    info: {
      title: "A READING From HOMER by Lawrence Alma-Tadema (1885)",
      description: "Roman-style scene where figures gather to hear poetry, glorifying classical culture.",
    },
  },
  {
    coordinates: [8.575013160705566, -2.5, 6.715041160583496],
    radius: 1.5,
    info: {
      title: "AT THE PIANO by James Whistler (1858)",
      description: "Early work showing a mother and daughter near a piano, combining realism and elegance.",
    },
  },
  {
    coordinates: [8.532113075256348, -2.5, 6.503756999969482],
    radius: 1.5,
    info: {
      title: "WOMEN At WORK by Amrita Sher-Gil (1935)",
      description: "A lesser-known work by the modernist painter, showing rural Indian women engaged in daily chores with somber dignity.",
    },
  },
  {
    coordinates: [2.3125011920928955, -2.5, 10.0021333694458],
    radius: 1.5,
    info: {
      title: "ARJUNA AND KRISHNA ON A CHARIOT – Pahari Painting (c. 18th century)",
      description: "A depiction of the Mahabharata scene from the lesser-known Guler or Kangra miniature tradition.",
    },
  },
  {
    coordinates: [8.715314865112305, -2.5, 9.129046440124512],
    radius: 1.5,
    info: {
      title: "THE BOAT by K.K. Hebbar (c. 1950s)",
      description: "A symbolic modernist painting of struggle and unity through the imagery of boatmen at sea.",
    },
  },
  {
    coordinates: [8.927428245544434, -2.5, 10.6240816116333],
    radius: 1.5,
    info: {
      title: "SHIVA With GANGA – Pattachitra (Odisha, traditional artist)",
      description: "Tells the story of the descent of the Ganga river.",
    },
  },
  {
    coordinates: [6.167913436889648, -2.5, 9.626569747924805],
    radius: 1.5,
    info: {
      title: "LADY IN THE MOONLIGHT by Hemendranath Mazumdar (early 20th century",
      description: "Romantic and graceful portrayal of a woman in a sari under moonlight.",
    },
  },
];

function CameraController({ onProximityInfo }) {
  const playerRef = useRef();
  const moveSpeed = 5;
  const keysPressed = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
  });
  const mouseX = useRef(0);
  const { camera, gl } = useThree();
  const lastProximityCheck = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keysPressed.current.hasOwnProperty(e.key)) {
        keysPressed.current[e.key] = true;
      }
    };

    const handleKeyUp = (e) => {
      if (keysPressed.current.hasOwnProperty(e.key)) {
        keysPressed.current[e.key] = false;
      }
    };

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const position = playerRef.current.translation();
    camera.position.set(position.x, position.y + 0.5, position.z);

    // Movement
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, -1);
    const sideVector = new THREE.Vector3(-1, 0, 0);
    
    const moveForward = 
      Number(keysPressed.current.w || keysPressed.current.ArrowUp) - 
      Number(keysPressed.current.s || keysPressed.current.ArrowDown);
    const moveSideways = 
      Number(keysPressed.current.a || keysPressed.current.ArrowLeft) - 
      Number(keysPressed.current.d || keysPressed.current.ArrowRight);

    direction
      .addVectors(
        frontVector.multiplyScalar(moveForward),
        sideVector.multiplyScalar(moveSideways)
      )
      .normalize()
      .multiplyScalar(moveSpeed * delta)
      .applyEuler(camera.rotation);

    playerRef.current.setLinvel(
      { x: direction.x * 20, y: playerRef.current.linvel().y, z: direction.z * 20 }, // Keep existing y velocity
      true
    );

    const canvasWidth = gl.domElement.clientWidth;
    const mouseNormalizedX = (mouseX.current / canvasWidth) * 2 - 1;
    camera.rotation.y = -mouseNormalizedX * Math.PI * 0.9;
    camera.rotation.x = 0;
    camera.rotation.z = 0;

    lastProximityCheck.current += delta;
    if (lastProximityCheck.current > 0.1) {
      lastProximityCheck.current = 0;
      let closestInfo = null;
      let minDistanceSq = Infinity;
      const playerPos = new THREE.Vector3(position.x, position.y, position.z);

      for (const point of proximityPoints) {
        const target = new THREE.Vector3(...point.coordinates);
        const distanceSq = playerPos.distanceToSquared(target);
        if (distanceSq <= point.radius * point.radius && distanceSq < minDistanceSq) {
          minDistanceSq = distanceSq;
          closestInfo = point.info;
        }
      }
      onProximityInfo(closestInfo);
    }
  });

  return (
    <RigidBody
      ref={playerRef}
      position={[1, -2, 2]} 
      type="dynamic"
      colliders={false}
      lockRotations
      linearDamping={5}
      angularDamping={10}
      enabledRotations={[false, false, false]}
      ccd={true}
    >
      <CapsuleCollider args={[0.5, 0.3]} />
      <mesh visible={false}>
        <capsuleGeometry args={[0.3, 0.5]} />
        <meshStandardMaterial />
      </mesh>
    </RigidBody>
  );
}

function Floor() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, -3.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="gray" transparent opacity={0} />
      </mesh>
    </RigidBody>
  );
}

function Wall({ position, size, color = "white" }) {
  // Adjust wall positions to be relative to floor at y = -4
  const adjustedPosition = [position[0], position[1] - 1, position[2]];
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={adjustedPosition}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} transparent opacity={0} />
      </mesh>
    </RigidBody>
  );
}

function Walls() {
  return (
    <>
      <Floor />
      <Wall position={[-5, -2, -9.9]} size={[10, 4, 0.2]} />
      <Wall position={[-7, -2, -4.15]} size={[7.4, 4, 0.2]} />
      <Wall position={[5.5, -2, 12]} size={[11, 4, 0.2]} />
      <Wall position={[-10, -2, -7]} size={[0.2, 4, 6]} />
      <Wall position={[-3.37, -2, 0]} size={[0.2, 4, 8.5]} />
      <Wall position={[4.3, -2, 0]} size={[0.2, 4, 8.5]} />
      <Wall position={[-0.06, -2, 8.3]} size={[0.2, 4, 8.1]} />
      <Wall position={[10.7, -2, 8.3]} size={[0.2, 4, 8.1]} />
      <Wall position={[0.06, -2, -7.3]} size={[0.2, 4, 6]} />
      <Wall position={[2.3, -2, -4.3]} size={[4.4, 4, 0.2]} />
      <Wall position={[7.5, -2, 4.15]} size={[6.4, 4, 0.2]} />
      <Wall position={[-2, -2, 4.3]} size={[4, 4, 0.2]} />
      <Wall position={[9.45, -2, 8]} size={[3, 4, 0.2]} color="white" />
      <Wall position={[4.2, -2, 12.3]} size={[0.2, 4, 6]} />
      <Wall position={[3.1, -2, 4]} size={[3, 4, 0.2]} color="blue" />
    </>
  );
}
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', color: 'white',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: 20, zIndex: 1000
    }}>
      <h2>Error</h2>
      <pre style={{color: 'red'}}>{error.message}</pre>
      <button 
        onClick={resetErrorBoundary}
        style={{padding: '10px 20px', marginTop: 20}}
      >
        Try Again
      </button>
    </div>
  );
}

export default function MuseumScene() {
  const [proximityInfo, setProximityInfo] = useState(null);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {proximityInfo && (
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(0,0,0,0.7)', color: 'white',
          padding: 15, borderRadius: 8, maxWidth: 300,
          zIndex: 10, backdropFilter: 'blur(5px)'
        }}>
          <h3 style={{marginTop: 0}}>{proximityInfo.title}</h3>
          <p>{proximityInfo.description}</p>
        </div>
      )}
      <Canvas
        camera={{ position: [7, 0, 9], fov: 50 }} 
        gl={{ antialias: true }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Physics gravity={[0, -9.81, 0]} timeStep="vary">
          <MuseumModel />
          <Walls />
          <CameraController onProximityInfo={setProximityInfo} />
        </Physics>
      </Canvas>
    </ErrorBoundary>
  );
}
