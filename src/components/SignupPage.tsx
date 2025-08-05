"use client"
import React, { useState } from "react"
import AuthForm from "@/components/AuthForm"
import { AuthFormData } from "@/app/types/auth"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Spinner } from "./spectrumui/spinner-dependencies"

const SignupPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSignup = async (data: AuthFormData) => {
        setLoading(true)
        try {
            const res = await fetch(
                "https://hub-backend-qtb7.onrender.com/auth/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            )

            if (res.ok) {
                const data = await res.json()
                Cookies.set("access_token", data.access, { expires: 7 })
                Cookies.set("refresh_token", data.refresh, { expires: 30 })
                router.push("/")
            } else {
                const errorData = await res.json()
                if (errorData.errors && errorData.errors.email) {
                    throw new Error(errorData.errors.email[0])
                } else {
                    throw new Error("Signup failed")
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    if (loading) {
        return (
            <div className="min-h-dvh flex flex-col items-center justify-center">
                <Spinner size={"large"} />
            </div>
        )
    }

    return (
        <div className="min-h-dvh flex flex-col items-center justify-center">
            <AuthForm isSignup onSubmit={handleSignup} />
            <div className="mt-2">
                Already have an account?{" "}
                <span>
                    <Link
                        href={"/login"}
                        className="underline cursor-pointer duration-100 hover:no-underline"
                    >
                        Log in
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default SignupPage
