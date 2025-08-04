import { jokeExamples } from "./mockdata";

export function shuffleArrayInPlace<T>(array: T[]) {
    let currentIndex = array.length,
        randomIndex

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }
    return array
}

export type DifficultyType = "easy" | "medium" | "hard"

export interface RawQuestionType {
    type: "boolean" | "multiple"
    difficulty: DifficultyType
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

export interface QuestionType {
    type: "boolean" | "multiple"
    difficulty: DifficultyType
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
    all_answers_shuffled?: string[]
}

export const difficulties: DifficultyType[] = ["easy", "medium", "hard"]

export const customQuestions: {
    response_code: number
    results: QuestionType[]
} = {
    response_code: 0,
    results: [
        {
            type: "boolean",
            difficulty: "easy",
            category: "General Knowledge",
            question:
                "Romanian belongs to the Romance language family, shared with French, Spanish, Portuguese and Italian. ",
            correct_answer: "True",
            incorrect_answers: ["False"],
        },
        {
            type: "multiple",
            difficulty: "easy",
            category: "General Knowledge",
            question:
                "What do the letters of the fast food chain KFC stand for?",
            correct_answer: "Kentucky Fried Chicken",
            incorrect_answers: [
                "Kentucky Fresh Cheese",
                "Kibbled Freaky Cow",
                "Kiwi Food Cut",
            ],
        },
        {
            type: "multiple",
            difficulty: "easy",
            category: "General Knowledge",
            question:
                "Of the following months, which has the most amount of days?",
            correct_answer: "December",
            incorrect_answers: ["April", "September", "November "],
        },
        {
            type: "multiple",
            difficulty: "easy",
            category: "General Knowledge",
            question:
                "If you are caught &quot;Goldbricking&quot;, what are you doing wrong?",
            correct_answer: "Slacking",
            incorrect_answers: ["Smoking", "Stealing", "Cheating"],
        },
        {
            type: "multiple",
            difficulty: "easy",
            category: "General Knowledge",
            question: "What is the French word for &quot;hat&quot;?",
            correct_answer: "Chapeau",
            incorrect_answers: ["Bonnet", " &Eacute;charpe", " Casque"],
        },
        {
            type: "multiple",
            difficulty: "easy",
            category: "General Knowledge",
            question:
                "What is on display in the Madame Tussaud&#039;s museum in London?",
            correct_answer: "Wax sculptures",
            incorrect_answers: [
                "Designer clothing",
                "Unreleased film reels",
                "Vintage cars",
            ],
        },
        {
            type: "multiple",
            difficulty: "easy",
            category: "General Knowledge",
            question: "Earth is located in which galaxy?",
            correct_answer: "The Milky Way Galaxy",
            incorrect_answers: [
                "The Mars Galaxy",
                "The Galaxy Note",
                "The Black Hole",
            ],
        },
        {
            type: "multiple",
            difficulty: "easy",
            category: "General Knowledge",
            question:
                "What is the profession of Elon Musk&#039;s mom, Maye Musk?",
            correct_answer: "Model",
            incorrect_answers: ["Professor", "Biologist", "Musician"],
        },
        {
            type: "multiple",
            difficulty: "easy",
            category: "General Knowledge",
            question:
                "Which of these Marvel games was released on the Playstation 2?",
            correct_answer: "Spider-Man 2",
            incorrect_answers: [
                "Silver Surfer",
                "Howard the Duck",
                "Wolverine: Adamantium Rage",
            ],
        },
        {
            type: "multiple",
            difficulty: "easy",
            category: "General Knowledge",
            question: "What is the Spanish word for &quot;donkey&quot;?",
            correct_answer: "Burro",
            incorrect_answers: ["Caballo", "Toro", "Perro"],
        },
    ],
}

export const getHubJokeExample = () => {
    const randIndex = Math.floor(Math.random() * jokeExamples.length)
    return jokeExamples[randIndex]
}