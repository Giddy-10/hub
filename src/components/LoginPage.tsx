"use client"
import React from "react"
import AuthForm from "@/components/AuthForm"
import { AuthFormData } from "@/app/types/auth"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import Link from "next/link"

const LoginPage: React.FC = () => {
    const router = useRouter()

    const handleLogin = async (data: AuthFormData) => {
        try {
            const res = await fetch(
                "https://hub-backend-qtb7.onrender.com/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                    }),
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
                    throw new Error("Login failed")
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    return (
        <div className="min-h-dvh flex flex-col items-center justify-center">
            <AuthForm onSubmit={handleLogin} />
            <div className="mt-2">
                Already have an account?{" "}
                <span>
                    <Link
                        href={"/signup"}
                        className="underline cursor-pointer duration-100 hover:no-underline"
                    >
                        Sign up
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default LoginPage
