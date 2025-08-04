export interface HubJokesType {
    id: number
    content: string
    category: string
    vote_type: "upvote" | "downvote"
}

export const jokeExamples: HubJokesType[] = [
    {id: 5, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", category: "General", vote_type: "upvote" },
    {id: 7, content: "Sed vitae ex gravida, pretium sem posuere, sodales mauris. Orci varius natoque.", category: "General", vote_type: "downvote" }
]