"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { LanguageType } from "@/src/types/language";

import SingleModel from "./SingleModel";

interface ModalProps {
  lang: LanguageType;
  userId: string;
  modelId: string;
}

const SingleModelScene = ({ lang, userId, modelId }: ModalProps) => {

  return (

    <>
      <div className="">
        <h1>{lang}</h1>
      </div>
      <Canvas shadows>
        <Suspense fallback={null}>
          <SingleModel userId={userId} modelId={modelId} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default SingleModelScene;
