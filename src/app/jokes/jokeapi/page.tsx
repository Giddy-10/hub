import { JokeRefreshButton } from "@/components/JokeRefreshButton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import React, { Suspense } from "react"

interface JokeType2 {
    id: number
    type: "twopart" | "single"
    joke?: string
    setup?: string
    delivery?: string
}

const page = async () => {
    const data = await fetch(
        "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious"
    )
    const joke: JokeType2 = await data.json()
    return (
        <div>
            <div className="flex flex-col gap-4">
                <Suspense fallback={<p>Loading...</p>}>
                    <p
                        className={`text-lg my-24 px-10 text-center font-semibold ${
                            joke.joke || (joke.setup && joke.delivery)
                                ? ""
                                : "text-destructive"
                        }`}
                    >
                        {joke.type == "single" && joke.joke ? (
                            `${joke.joke}`
                        ) : joke.type == "twopart" &&
                          joke.setup &&
                          joke.delivery ? (
                            <span>
                                <span className="block mb-2">{joke.setup}</span>{" "}
                                <span className="block">{joke.delivery}</span>
                            </span>
                        ) : (
                            "Unlucky, unlucky!!"
                        )}
                    </p>
                </Suspense>
                <div className="flex justify-evenly">
                    <Link href="/jokes">
                        <Button className="text-md">
                            <ArrowLeft /> Go Back
                        </Button>
                    </Link>
                    <JokeRefreshButton currentPath={"/jokes/jokeapi"} />
                </div>
            </div>
        </div>
    )
}

export default page
