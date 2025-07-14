"use client"
import QuestionsContainer from "@/components/QuestionsContainer"
import Results from "@/components/Results"
import { Button } from "@/components/ui/button"
import {
    difficulties,
    DifficultyType,
    QuestionType,
    shuffleArrayInPlace,
} from "@/functions/functions"
import { decode } from "html-entities"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const page = () => {
    const [questions, setQuestions] = useState<QuestionType[]>()
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>()
    const [showResult, setShowResult] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const searchParams = useSearchParams()

    useEffect(() => {
        const category = searchParams.get("cat") || null
        const difficulty = searchParams.get("dif") || null
        const fetchQuestions = async () => {
            try {
                const data = await fetch(
                    `https://opentdb.com/api.php?amount=10${
                        category && /^\d+$/.test(category)
                            ? `&category=${category}`
                            : ""
                    }${
                        difficulty &&
                        difficulties.includes(difficulty as DifficultyType)
                            ? `&difficulty=${difficulty}`
                            : ""
                    }`
                )
                if (!data.ok) {
                    throw new Error(`HTTP error! status: ${data.status}`)
                }
                const {
                    response_code,
                    results,
                }: { response_code: number; results: QuestionType[] } =
                    await data.json()
                const processedQuestions: QuestionType[] = results.map(
                    (q: any) => {
                        const decodedQuestion: QuestionType = {
                            ...q,
                            question: decode(q.question),
                            correct_answer: decode(q.correct_answer),
                            incorrect_answers: q.incorrect_answers.map(
                                (ans: string) => decode(ans)
                            ),
                        }
                        // Combine all answers and shuffle them for this question
                        decodedQuestion.all_answers_shuffled =
                            shuffleArrayInPlace([
                                ...decodedQuestion.incorrect_answers,
                                decodedQuestion.correct_answer,
                            ])
                        return decodedQuestion
                    }
                )
                setQuestions(processedQuestions)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        // const fetchQuestions = () => {
        //     const processedQuestions: QuestionType[] =
        //         customQuestions.results.map((q: any) => {
        //             const decodedQuestion: QuestionType = {
        //                 ...q,
        //                 question: decode(q.question),
        //                 correct_answer: decode(q.correct_answer),
        //                 incorrect_answers: q.incorrect_answers.map(
        //                     (ans: string) => decode(ans)
        //                 ),
        //             }
        //             // Combine all answers and shuffle them for this question
        //             decodedQuestion.all_answers_shuffled = shuffleArrayInPlace([
        //                 ...decodedQuestion.incorrect_answers,
        //                 decodedQuestion.correct_answer,
        //             ])
        //             return decodedQuestion
        //         })
        //     setQuestions(processedQuestions)
        //     setLoading(false)
        // }
        fetchQuestions()
        setShowResult(false)
    }, [])

    useEffect(() => {
        if (!questions) {
            setSelectedAnswers(undefined)
            return
        }
        setError(null)
        const qCount = questions.length
        setSelectedAnswers(Array(qCount).fill(""))
    }, [questions])

    useEffect(() => {
        console.log(selectedAnswers)
    }, [selectedAnswers])

    if (loading || !selectedAnswers) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (showResult && questions) {
        return (
            <div>
                <Results
                    questions={questions}
                    selectedAnswers={selectedAnswers}
                />
            </div>
        )
    }

    return (
        <div>
            <QuestionsContainer>
                {questions?.map((question, index) => {
                    if (!question.all_answers_shuffled)
                        question.all_answers_shuffled = shuffleArrayInPlace([
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
                            <div className="flex flex-wrap gap-4 [&>div]:px-2 [&>div]:py-1 [&>div]:border [&>div]:rounded-md [&>div]:w-fit [&>div]:duration-100">
                                {question.all_answers_shuffled.map((answer) => {
                                    if (selectedAnswers[index])
                                        console.log(
                                            selectedAnswers[index],
                                            answer
                                        )
                                    if (selectedAnswers[index] == answer)
                                        return (
                                            <div
                                                key={answer}
                                                className="bg-(--active)"
                                            >
                                                {answer}
                                            </div>
                                        )
                                    return (
                                        <div
                                            key={answer}
                                            className="cursor-pointer hover:scale-105 active:scale-95"
                                            onClick={() =>
                                                setSelectedAnswers(
                                                    (prevState) => {
                                                        console.log("in here")
                                                        if (!prevState) {
                                                            console.log(
                                                                "in (not prevState)"
                                                            )
                                                            setError(
                                                                "Set selectedAnswers' prev state is undefined"
                                                            )
                                                            return prevState
                                                        }
                                                        const newAnswers = [
                                                            ...prevState,
                                                        ]
                                                        newAnswers[index] =
                                                            answer
                                                        console.log(
                                                            "New answers",
                                                            newAnswers
                                                        )
                                                        console.log(
                                                            "All answers before",
                                                            selectedAnswers
                                                        )
                                                        return newAnswers
                                                    }
                                                )
                                            }
                                        >
                                            {answer}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}

                <div>
                    <Button
                        className="text-xl px-6 py-5 bg-(--success) text-foreground hover:bg-(--success-foreground) active:scale-95"
                        onClick={() => setShowResult(true)}
                    >
                        Submit
                    </Button>
                </div>
            </QuestionsContainer>
        </div>
    )
}

export default page
