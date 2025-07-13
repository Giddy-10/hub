"use client"
import React, { useEffect, useState } from "react"

interface CategoryType {
    id: number
    name: string
}

type DifficultyType = "easy" | "medium" | "hard"

const page = () => {
    const [categories, setCategories] = useState<CategoryType[]>()
    const [selectedCategory, setSelectedCategory] = useState<number>()
    const [selectedDifficulty, setSelectedDifficulty] =
        useState<DifficultyType>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const difficulties: DifficultyType[] = ["easy", "medium", "hard"]

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetch("https://opentdb.com/api_category.php")
                if (!data.ok) {
                    throw new Error(`HTTP error! status: ${data.status}`)
                }
                const {
                    trivia_categories,
                }: { trivia_categories: CategoryType[] } = await data.json()
                setCategories(trivia_categories)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }
    return (
        <div>
            <div className="px-4 mb-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-6">
                <h2>Choose Category:</h2>

                <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 [&>div]:px-8 [&>div]:py-5 [&>div]:text-lg [&>div]:rounded-xl">
                    {categories?.map((category) => {
                        if (selectedCategory == category.id)
                            return (
                                <div
                                    key={category.id}
                                    className="bg-(--success)"
                                >
                                    {category.name}
                                </div>
                            )
                        return (
                            <div
                                key={category.id}
                                className="border border-foreground/10 duration-100 cursor-pointer hover:bg-foreground/5 hover:border-foreground/20"
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </div>
                        )
                    })}
                </div>

                <h2>Select Difficulty:</h2>

                <div className="flex justify-evenly items-center text-2xl [&>div]:px-12 [&>div]:py-6 [&>div]:rounded-xl">
                    {difficulties.map((difficulty) => {
                        if (selectedDifficulty == difficulty)
                            return (
                                <div
                                    key={difficulty}
                                    className="bg-(--success)"
                                >
                                    {difficulty}
                                </div>
                            )
                        return (
                            <div
                                key={difficulty}
                                className="border border-foreground/10 bg-foreground/5 cursor-pointer duration-100 hover:border-foreground/20 hover:bg-foreground/10"
                                onClick={() =>
                                    setSelectedDifficulty(difficulty)
                                }
                            >
                                {difficulty}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default page
