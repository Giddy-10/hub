"use client"
import { QuestionType, shuffleArrayInPlace } from "@/functions/functions"
import React, { useEffect, useState } from "react"
import QuestionsContainer from "./QuestionsContainer"
import Link from "next/link"

interface ExpProps {
    questions: QuestionType[]
    selectedAnswers: string[]
}

const Results = (props: ExpProps) => {
    const [correct, setCorrect] = useState<number>()
    const [total, setTotal] = useState<number>()

    useEffect(() => {
        setCorrect(
            props.selectedAnswers.reduce(
                (prevVal, current, index) =>
                    current == props.questions[index].correct_answer
                        ? prevVal + 1
                        : prevVal,
                0
            )
        )
        setTotal(props.questions.length)
    }, [props])

    if (correct == undefined || total == undefined) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className="flex flex-col items-center gap-2">
                <div
                    className={`text-[150px] audiowide ${
                        correct / total < 0.5
                            ? "text-(--failure-foreground)"
                            : "text-(--success-foreground)"
                    }`}
                >
                    {correct}
                </div>
                <div className="font-bold text-xl py-1 px-10 border-y">
                    out of
                </div>
                <div className="text-[80px] audiowide">{total}</div>
            </div>
            <QuestionsContainer>
                <div className="w-full flex justify-end">
                    <Link
                        href="/quiz"
                        className="px-6 py-2 rounded-xl border border-foreground/15 bg-foreground/5 duration-100 hover:border-foreground/30 hover:bg-foreground/10 active:scale-95"
                    >
                        Do Another Quiz
                    </Link>
                </div>
                {props.questions?.map((question, index) => {
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
                            <h3
                                className={`text-2xl font-bold ${
                                    question.correct_answer ==
                                    props.selectedAnswers[index]
                                        ? "text-(--success-foreground)"
                                        : "text-(--failure-foreground)"
                                }`}
                            >
                                Question {index + 1}
                            </h3>
                            <p className="text-lg font-semibold">
                                {question.question}
                            </p>
                            <div className="flex flex-wrap gap-4 [&>div]:px-2 [&>div]:py-1 [&>div]:border [&>div]:rounded-md [&>div]:w-fit [&>div]:duration-100">
                                {question.all_answers_shuffled.map((answer) => {
                                    if (props.selectedAnswers[index])
                                        console.log(
                                            props.selectedAnswers[index],
                                            answer
                                        )
                                    if (question.correct_answer == answer)
                                        return (
                                            <div
                                                key={answer}
                                                className="bg-(--success)"
                                            >
                                                {answer}
                                            </div>
                                        )
                                    if (props.selectedAnswers[index] == answer)
                                        return (
                                            <div
                                                key={answer}
                                                className="bg-(--failure)"
                                            >
                                                {answer}
                                            </div>
                                        )
                                    return <div key={answer}>{answer}</div>
                                })}
                            </div>
                        </div>
                    )
                })}
            </QuestionsContainer>
        </div>
    )
}

export default Results
