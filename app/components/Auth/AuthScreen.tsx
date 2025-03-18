"use client";

import { useState } from "react";
import { SignInFlow } from "@/app/types/auth-types";
import SignIncard from "./SignInCard";
import SignUpcard from "./SignUpCard";

export function AuthScreen({ authType }: { authType?: SignInFlow }) {
  const [formType, setFormType] = useState<SignInFlow>(authType || "signIn");
  return (
    <div className=" w-full h-full flex items-center justify-center gap-5 bg-gradient-to-b from-purple-900 to-gray-900">
      <div className="w-full md:h-auto md:w-[420px] px-4">
        {formType === "signIn" ? (
          <SignIncard setFormType={setFormType} />
        ) : (
          <SignUpcard setFormType={setFormType} />
        )}
      </div>
    </div>
  );
}
