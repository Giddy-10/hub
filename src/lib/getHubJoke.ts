import { HubJokesType } from "@/functions/functions"
import { cookies } from "next/headers"

export const getRandHubJoke = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    if (token) {
        const data = await fetch(
            "https://hub-backend-qtb7.onrender.com/api/jokes",
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const jokes: HubJokesType[] = await data.json()
        const randIndex = Math.floor(Math.random() * jokes.length)
        return jokes[randIndex]
    } else {
        return undefined
    }
}
