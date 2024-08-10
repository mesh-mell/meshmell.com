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
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {lang === "en" ? "My page" : "マイページ"}
            </h1>
            <Link href="/api/auth/logout">
              <button className="bg-red-500 text-white px-4 py-2 mt-2 rounded">
                Logout
              </button>
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <input
              type="file"
              className="border p-2 w-full"
              {...register("file")}
            />
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Model Name"
                className="border p-2 w-[300px]"
                {...register("modelName", { required: true })}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Model
              </button>
            </div>
          </form>
        </>
      )}
      <div>
        {authUser && user ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {user.models.map((model, index) => (
              <div key={index} className="cursor-pointer border p-2">
                <Link href={`/${lang}/share/${userId}/${model.model_id}`}>
                  <Image
                    src={`/images/users/${userId}/${model.model_id}/img.webp`}
                    alt={model.model_name}
                    width={100}
                    height={100}
                    className="w-full h-32"
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
              <button className="bg-green-500 text-white px-4 py-2 rounded">
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
