"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { onValue, ref } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { LanguageType } from "@/src/types/language";
import { ShareModelType, UserType } from "@/src/types/users";
import { database } from "@/src/utils/firebase/firebase.config";

interface ModalProps {
  lang: LanguageType;
  userId: string;
}

const UserPage = ({ lang, userId }: ModalProps) => {

  const { user: authUser, isLoading } = useUser();
  const [user, setUser] = useState<UserType | null>(null);
  const [modelName, setModelName] = useState("");

  useEffect(() => {
    const usersRef = ref(database, "share/users");
    const fetchUserById = (userId: string) => {
      onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        const foundUser = users.find((u: UserType) => u.user_id === userId);
        setUser(foundUser);
      }, {
        onlyOnce: true
      });
    };
    fetchUserById(userId);
  }, [userId]);

  const handleAddModel = async (e: any) => {
    e.preventDefault();
    // Add model upload logic here
  };

  return (
    <div>
      {!isLoading && authUser && (
        <>
          <h1>{lang === "en" ? "My page" : "マイページ"}</h1>
          <Link href="/api/auth/logout">
            <button>Logout</button>
          </Link>
          <form onSubmit={handleAddModel}>
            <input type="text" value={modelName} onChange={(e) => setModelName(e.target.value)} placeholder="Model Name" />
            <input type="file" />
            <button type="submit">Add Model</button>
          </form>
        </>
      )}
      <div className="">
        {authUser && user ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {user.models.map((model: ShareModelType, index: number) => (
              <div key={index} className="cursor-pointer border p-2">
                <Link href={`/${lang}/share/${userId}/${model.model_id}`}>
                  <a>
                    <Image src={`/images/users/${userId}/${model.model_id}/img.webp`} alt={model.model_name} width={100} height={100} objectFit="cover" />
                    <div>{model.model_name}</div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        ) : authUser && !user ? (
          <p>No models found</p>
        ) : (
          <p>Please login</p>
        )}
        {!isLoading && !authUser && (
          <div className="">
            <Link href="/api/auth/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </div >
  );
}

export default UserPage;
