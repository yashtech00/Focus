"use client"
import { AuthScreen } from "@/app/components/Auth/AuthScreen";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export type SignInFlow = "signIn" | "signUp";

export default function AuthPage() {
    const session = useSession();
    const searchParams = useSearchParams();

    const formType = searchParams.get("authType") as SignInFlow;
    const router = useRouter();

    useEffect(() => {
        if (session.status === "authenticated") {
            router.push("/dashboard")
        }
    },[session.status,router])
    
    return <AuthScreen authType={formType} />
}