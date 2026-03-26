'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { z, ZodTypeAny} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FIELD_NAMES, FIELD_TYPES } from "@/constants/index";
import { Controller, useForm, Path } from "react-hook-form"


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation";
import Link from "next/link"

interface Props<T extends ZodTypeAny> {
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: (data: z.infer<T>) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends ZodTypeAny>({
  type,
  schema,
  defaultValues,
  onSubmit
}: Props<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (data: z.infer<T>) => {
    
    console.log("SUBMITTING", data);

    const result = await onSubmit(data);

    console.log("RESULT", result);

    if(result.success){
      router.push('/dashboard');
    }
   };

  const isSignIn = type ==='SIGN_IN';

  return (
    <Card className="w-full sm:max-w-md bg-transparent text-white">
      <CardHeader>
        <CardTitle>{isSignIn ? 'Log in to your account' : 'Create an account'}</CardTitle>
        <CardDescription className="text-amber-300">
          {isSignIn ? 'Enter your email and password below to log in' : 'Enter your details below to create your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signInForm" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            {(Object.keys(defaultValues) as Array<Path<z.infer<T>>>).map((field) => (
              <Controller
                key={field}
                name={field}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FieldLabel>
                    <Input
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="bg-white text-black"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
            <Field className="grid grid-cols-2">
              <Button type="button" variant="outline" onClick={() => form.reset()} className="text-black">
                Clear
              </Button>
              <Button type="submit" form="signInForm" className="bg-emerald-800">
                {isSignIn ? 'Log In' : 'Sign Up'}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex bg-transparent justify-center">
        <Field orientation="horizontal" className="flex justify-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold hover:underline hover:scale-105">{isSignIn ? "Sign Up" : "Sign In"}</Link>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;