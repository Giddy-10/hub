import React from "react"
import { Button } from "./ui/button"
import { GraduationCap, Mic2 } from "lucide-react"
import Link from "next/link"

const Hero = () => {
    return (
        <div className="hero gap-8">
            <h1 className="text-8xl">THE HÜB</h1>
            <p className="text-xl font-semibold opacity-90">
                Your one-stop site for fun and educational quizzes
            </p>
            <div className="flex items-center gap-16 mt-8">
                <Link href={"/quiz"}>
                    <Button
                        size={"icon"}
                        className="w-fit px-8 py-6 text-lg flex gap-4"
                    >
                        <GraduationCap className="size-8" />
                        Take a quiz
                    </Button>
                </Link>
                <Link href={"/jokes"}>
                    <Button
                        className="w-fit px-8 py-6 text-lg flex gap-4"
                        variant={"outline"}
                        size={"icon"}
                    >
                        <Mic2 className="size-6" />
                        Jokes
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Hero
