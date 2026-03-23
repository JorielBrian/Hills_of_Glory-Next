"use client"

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        userName: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      // onSubmit={() => {}}
    />
  )
}

export default SignUp