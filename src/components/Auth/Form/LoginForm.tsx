"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingCover from "@/src/app/[lang]/thoughts/components/LoadingCover";
import { SignInSchema } from "@/src/schemas/auth";
import { login } from "@/src/utils/auth/login";

import CardWrapper from "../CardWrapper";

import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import FormTitle from "./FormTitle";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  const { data: session } = useSession();

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          router.push("/en/thoughts/1");
        } else {
          setLoading(false);
        }
      });
    });
  };

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/en/thoughts/1");
    }
  }, [session, router]);

  return (
    <>
      {loading && <LoadingCover />}
      <CardWrapper
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial={false}
      >
        <FormTitle title="Login" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            register={form.register}
            name="email"
            placeholder="Email"
            error={form.formState.errors.email}
            disabled={isPending}
          />
          <Input
            register={form.register}
            name="password"
            type="password"
            placeholder="Password"
            error={form.formState.errors.password}
            disabled={isPending}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <SubmitButton label="Login" />
        </form>
      </CardWrapper>
    </>
  );
};

export default LoginPage;
