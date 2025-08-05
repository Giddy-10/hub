"use client"
import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"

const VotingButtons = () => {
    const [status, setStatus] = useState<"upvote" | "downvote" | undefined>(
        undefined
    )

    const handleVote = async (newStatus: "upvote" | "downvote" | undefined) => {
        setStatus(newStatus)
    }

    return (
        <div className="flex items-center gap-6">
            <button
                onClick={() =>
                    status == "upvote"
                        ? handleVote(undefined)
                        : handleVote("upvote")
                }
                className={`flex items-center gap-2 text-white px-4 py-2 rounded-md ${
                    status == "upvote"
                        ? "bg-green-600 hover:bg-green-700"
                        : "hover:bg-foreground/10"
                } shadow-md`}
            >
                <ThumbsUp
                    className={`w-5 h-5 ${
                        status == "upvote" ? "fill-foreground" : ""
                    }`}
                />
            </button>

            <button
                onClick={() =>
                    status == "downvote"
                        ? handleVote(undefined)
                        : handleVote("downvote")
                }
                className={`flex items-center gap-2 text-white px-4 py-2 rounded-md ${
                    status == "downvote"
                        ? "bg-red-600 hover:bg-red-700"
                        : "hover:bg-foreground/10"
                } shadow-md`}
            >
                <ThumbsDown
                    className={`w-5 h-5 ${
                        status == "downvote" ? "fill-foreground" : ""
                    }`}
                />
            </button>
        </div>
    )
}

export default VotingButtons
