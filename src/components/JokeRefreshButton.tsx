"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { revalidateSpecificJokePage } from "@/app/jokes/actions"

interface JokeRefreshButtonProps {
    currentPath: string // New prop to pass the current path
}

export function JokeRefreshButton({ currentPath }: JokeRefreshButtonProps) {
    const [isPending, startTransition] = useTransition()

    return (
        <Button
            className="text-md"
            variant={"outline"}
            onClick={() =>
                startTransition(() => revalidateSpecificJokePage(currentPath))
            }
            disabled={isPending}
        >
            {isPending ? (
                <>
                    <RefreshCcw className="animate-spin mr-2" /> Loading...
                </>
            ) : (
                <>
                    <RefreshCcw /> Another joke
                </>
            )}
        </Button>
    )
}
