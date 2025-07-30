import { JokeRefreshButton } from "@/components/JokeRefreshButton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import React, { Suspense } from "react"
import VotingButtons from "@/components/VotingButtons";

interface JokeType {
    id: string
    joke: string
    status: number
}

const page = async () => {
    const data = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    })
    const joke: JokeType = await data.json()

    return (
        <div>
            <div className="flex flex-col gap-4">
                <Suspense fallback={<p>Loading...</p>}>
                    <p
                        className={`text-lg my-24 px-10 text-center font-semibold ${
                            joke.joke ? "" : "text-destructive"
                        }`}
                    >
                        {joke.joke ? `${joke.joke}` : "Unlucky, unlucky!!"}
                    </p>
                </Suspense>

                {/* ✅ Voting buttons below the joke */}
                <div className="flex justify-center my-4">
                    <VotingButtons />
                </div>

                <div className="flex justify-evenly">
                    <Link href="/jokes">
                        <Button className="text-md">
                            <ArrowLeft /> Go Back
                        </Button>
                    </Link>
                    <JokeRefreshButton currentPath={"/jokes/dad"} />
                </div>
            </div>
        </div>
    )
}

export default page
