"use client"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import Cookies from "js-cookie"
import { Spinner } from "./spectrumui/spinner-dependencies"

const SubmitJoke = () => {
    const [content, setContent] = useState<string>()
    const [category, setCategory] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmitJoke = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = Cookies.get("access_token")
            if (token && content && category) {
                const res = await fetch(
                    "https://hub-backend-qtb7.onrender.com/api/jokes/create/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ content, category }),
                    }
                )

                if (!res.ok) {
                    throw new Error("Failed to submit joke")
                }

                setLoading(false)
            } else {
                setCategory('')
                setContent('')
                setLoading(false)
            }
        } catch (error) {
            console.error("Error:", error)
            setCategory("")
            setContent("")
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="mt-20 mb-10 min-w-[450px] min-h-44 flex justify-center items-center py-10 px-20 rounded-lg border shadow-md shadow-foreground/30">
                <Spinner size={'large'}></Spinner>
            </div>
        )
    }

    return (
        <div className="mt-20 mb-10">
            <form
                onSubmit={(e) => handleSubmitJoke(e)}
                className="min-w-[450px] flex flex-col gap-6 py-10 px-20 rounded-lg border shadow-md shadow-foreground/30"
            >
                <h2 className="text-xl font-bold text-center">Submit a Joke</h2>
                <Input
                    name="category"
                    placeholder="Category"
                    onInput={(e) => setCategory(e.currentTarget.value)}
                />
                <Textarea
                    name="content"
                    placeholder="Write the joke here..."
                    onInput={(e) => setContent(e.currentTarget.value)}
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default SubmitJoke
