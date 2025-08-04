import { JokeRefreshButton } from '@/components/JokeRefreshButton'
import { Button } from '@/components/ui/button'
import VotingButtons from '@/components/VotingButtons'
import { getHubJokeExample } from '@/functions/functions'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

const page = () => {
    const joke = getHubJokeExample()
  return (
      <div>
          <div className="flex flex-col gap-4">
              <Suspense fallback={<p>Loading...</p>}>
                  <p
                      className={`text-lg my-24 px-10 text-center font-semibold ${
                          joke.content ? "" : "text-destructive"
                      }`}
                  >
                      {joke.content ? `${joke.content}` : "Unlucky, unlucky!!"}
                  </p>
              </Suspense>

              {/* ✅ Voting buttons below the joke */}
              <div className="flex justify-center my-4">
                  <VotingButtons />
              </div>

              <div className="flex justify-evenly">
                  <Link href="/jokes">
                      <Button className="text-md">
                          <ArrowLeft /> Go Back
                      </Button>
                  </Link>
                  <JokeRefreshButton currentPath={"/jokes/hub-jokes"} />
              </div>
          </div>
      </div>
  )
}

export default page