"use client"
import {
    customQuestions,
    difficulties,
    DifficultyType,
    QuestionType,
    shuffleArrayInPlace,
} from "@/functions/functions"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const page = () => {
    const [questions, setQuestions] = useState<QuestionType[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const searchParams = useSearchParams()

    useEffect(() => {
        const category = searchParams.get("cat") || null
        const difficulty = searchParams.get("dif") || null
        // const fetchQuestions = async () => {
        //     try {
        //         const data = await fetch(
        //             `https://opentdb.com/api.php?amount=10${
        //                 category && /^\d+$/.test(category)
        //                     ? `&category=${category}`
        //                     : ""
        //             }${
        //                 difficulty &&
        //                 difficulties.includes(difficulty as DifficultyType)
        //                     ? `&difficulty=${difficulty}`
        //                     : ""
        //             }`
        //         )
        //         if (!data.ok) {
        //             throw new Error(`HTTP error! status: ${data.status}`)
        //         }
        //         const {
        //             response_code,
        //             results,
        //         }: { response_code: number; results: QuestionType[] } =
        //             await data.json()
        //         setQuestions(results)
        //     } catch (err: any) {
        //         setError(err.message)
        //     } finally {
        //         setLoading(false)
        //     }
        // }
        const fetchQuestions = () => {
            setQuestions(customQuestions.results)
            setLoading(false)
        }
        fetchQuestions()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <div className="max-w-4/5 mx-auto w-fit mb-20 px-20 py-16 border rounded-2xl flex flex-col items-start gap-10">
                {questions?.map((question, index) => {
                    const newAnswerArray: string[] = shuffleArrayInPlace([
                        ...question.incorrect_answers,
                        question.correct_answer,
                    ])
                    return (
                        <div
                            key={question.question}
                            className="flex flex-col gap-3"
                        >
                            <h3 className="text-2xl font-bold opacity-70">
                                Question {index + 1}
                            </h3>
                            <p className="text-lg font-semibold">
                                {question.question}
                            </p>
                            <div className="flex flex-wrap gap-4 [&>div]:px-2 [&>div]:py-1 [&>div]:border [&>div]:rounded-md [&>div]:w-fit">
                                {newAnswerArray.map((answer) => (
                                    <div key={answer}>{answer}</div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default page
