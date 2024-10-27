"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useRef } from "react";

import DirectionalLightForScene from "@/src/components/Three/DirectionalLightForScene";
import { LightAndDarkThemeType } from "@/src/types/lightAndDarkTheme";

const SingleModelSceneForHome = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme() as { theme: LightAndDarkThemeType };
  const { camera } = useThree();
  const modelPath = "/models/home/fox_01.glb";
  const GltfModel = useGLTF(modelPath);

  return (
    <>
      <OrbitControls camera={camera} maxDistance={50} />
      <DirectionalLightForScene lightAndDarkTheme={theme} />
      <mesh ref={meshRef} castShadow receiveShadow dispose={null}>
        <primitive object={GltfModel.scene} />
        <mesh ref={meshRef} position={[0, 0, 0]} visible={true}>
          <meshBasicMaterial color="skyblue" />
        </mesh>
      </mesh>
    </>
  );
};

export default SingleModelSceneForHome;
