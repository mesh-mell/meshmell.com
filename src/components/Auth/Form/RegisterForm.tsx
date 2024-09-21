"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RegisterSchema } from "@/src/schemas/auth";
import { register } from "@/src/utils/auth/register";

import CardWrapper from "../CardWrapper";

import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import FormTitle from "./FormTitle";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const Register = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  useEffect(() => {
    if (success) {
      router.push("/auth/login");
    }
  }, [success]);

  return (
    <CardWrapper
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <FormTitle title="Register" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Input
          register={form.register}
          name="name"
          placeholder="Name"
          error={form.formState.errors.name}
          disabled={isPending}
        />
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
        <SubmitButton label="Register" />
      </form>
    </CardWrapper>
  );
};

export default Register;
