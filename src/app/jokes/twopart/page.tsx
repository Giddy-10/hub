import { JokeRefreshButton } from "@/components/JokeRefreshButton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import React, { Suspense } from "react"
import VotingButtons from "@/components/VotingButtons" // ✅ Import voting buttons

interface JokeType3 {
    id: number
    setup: string
    punchline: string
}

const page = async () => {
    const data = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
    )
    const joke: JokeType3 = await data.json()

    return (
        <div>
            <div className="flex flex-col gap-4">
                <Suspense fallback={<p>Loading...</p>}>
                    <p
                        className={`text-lg my-24 px-10 text-center font-semibold ${
                            joke.setup && joke.punchline
                                ? ""
                                : "text-destructive"
                        }`}
                    >
                        {joke.setup && joke.punchline ? (
                            <span>
                                <span className="block mb-2">{joke.setup}</span>{" "}
                                <span className="block">{joke.punchline}</span>
                            </span>
                        ) : (
                            "Unlucky, unlucky!!"
                        )}
                    </p>
                </Suspense>

                {/* ✅ Voting buttons below the joke */}
                <div className="flex justify-center my-4">
                    <VotingButtons />
                </div>

                {/* Navigation and refresh */}
                <div className="flex justify-evenly">
                    <Link href="/jokes">
                        <Button className="text-md">
                            <ArrowLeft /> Go Back
                        </Button>
                    </Link>
                    <JokeRefreshButton currentPath={"/jokes/twopart"} />
                </div>
            </div>
        </div>
    )
}

export default page
