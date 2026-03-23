"use client"

import AuthForm from "@/components/AuthForm";
import { toast } from "sonner"
import * as z from "zod"

import { signInSchema } from "@/lib/validations"

const schema = signInSchema;

const SignIn = () => {
  function onSubmit(data: z.infer<typeof schema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      // onSubmit={() => {}}
    />
  )
}

export default SignIn;