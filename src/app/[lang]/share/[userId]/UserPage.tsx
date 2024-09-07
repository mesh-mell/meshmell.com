"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { onValue, ref } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { LanguageType } from "@/src/types/language";
import { UserType } from "@/src/types/users";
import { database } from "@/src/utils/firebase/firebase.config";

interface ModalProps {
  lang: LanguageType;
  userId: string;
}

type FormData = {
  modelName: string;
  file: FileList;
};

const UserPage = ({ lang, userId }: ModalProps) => {
  const { user: authUser, isLoading } = useUser();
  const [user, setUser] = useState<UserType | null>(null);
  const { register, handleSubmit, setValue } = useForm<FormData>();

  useEffect(() => {
    const usersRef = ref(database, "share/users");
    const fetchUserById = (userId: string) => {
      onValue(
        usersRef,
        (snapshot) => {
          const users = snapshot.val();
          const foundUser = users.find((u: UserType) => u.user_id === userId);
          setUser(foundUser);
        },
        {
          onlyOnce: true,
        },
      );
    };
    fetchUserById(userId);
  }, [userId]);

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  useEffect(() => {
    // Reset the form or set default values if needed
    setValue("modelName", "");
  }, [setValue]);

  return (
    <div className="p-4">
      {!isLoading && authUser && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {lang === "en" ? "My page" : "マイページ"}
            </h1>
            <Link href="/api/auth/logout">
              <button className="mt-2 rounded bg-red-500 px-4 py-2 text-white">
                Logout
              </button>
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <input
              type="file"
              className="w-full border p-2"
              {...register("file")}
            />
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Model Name"
                className="w-[300px] border p-2"
                {...register("modelName", { required: true })}
              />
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Add Model
              </button>
            </div>
          </form>
        </>
      )}
      <div>
        {authUser && user ? (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {user.models.map((model, index) => (
              <div key={index} className="cursor-pointer border p-2">
                <Link href={`/${lang}/share/${userId}/${model.model_id}`}>
                  <Image
                    src={`/images/users/${userId}/${model.model_id}/img.webp`}
                    alt={model.model_name}
                    width={100}
                    height={100}
                    className="h-32 w-full"
                    priority
                  />
                  <div className="mt-2 text-center">{model.model_name}</div>
                </Link>
              </div>
            ))}
          </div>
        ) : authUser && !user ? (
          <p className="mt-4">No models found</p>
        ) : (
          <p className="mt-4">Please login</p>
        )}
        {!isLoading && !authUser && (
          <div className="mt-4">
            <Link href="/api/auth/login">
              <button className="rounded bg-green-500 px-4 py-2 text-white">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
