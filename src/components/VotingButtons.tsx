"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"

const VotingButtons = () => {
    const [upVotes, setUpVotes] = useState(0)
    const [downVotes, setDownVotes] = useState(0)

    const handleUpVote = () => setUpVotes(prev => prev + 1)
    const handleDownVote = () => setDownVotes(prev => prev + 1)

    return (
        <div className="flex items-center gap-6">
            <button
                onClick={handleUpVote}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow-md"
            >
                <ThumbsUp className="w-5 h-5" />
                <span>{upVotes}</span>
            </button>

            <button
                onClick={handleDownVote}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 shadow-md"
            >
                <ThumbsDown className="w-5 h-5" />
                <span>{downVotes}</span>
            </button>
        </div>
    )
}

export default VotingButtons
