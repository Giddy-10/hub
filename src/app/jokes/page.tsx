import { Button } from "@/components/ui/button"
import { ArrowDown, PenBox } from "lucide-react"
import Link from "next/link"
import React from "react"

const page = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center gap-8 my-10">
                <h2 className="text-4xl font-bold">Jokes</h2>
                <p className="text-lg">
                    <ArrowDown className="inline animate-bounce" /> A mild
                    chuckle is just one click away{" "}
                    <ArrowDown className="inline animate-bounce" />
                </p>
            </div>
            <div className="my-16 w-96 mx-auto grid grid-cols-2 gap-4">
                <Link
                    href={"/jokes/hub-jokes"}
                    className="col-span-2 w-full mb-6"
                >
                    <Button className="text-md w-full">HÜB Jokes</Button>
                </Link>
                <Link href={"/jokes/submit"} className="col-span-2 w-full mb-6">
                    <Button className="text-md w-full" size={"icon"} variant={"outline"}>
                        <PenBox /> Submit a joke
                    </Button>
                </Link>
                <Link href={"/jokes/dad"}>
                    <Button className="text-md" variant={"outline"}>
                        Generate a dad joke
                    </Button>
                </Link>
                <Link href={"/jokes/jokeapi"}>
                    <Button className="text-md" variant={"outline"}>
                        Random Joke
                    </Button>
                </Link>
                <Link href={"/jokes/twopart"}>
                    <Button className="text-md" variant={"outline"}>
                        Two-Part Jokes
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default page
