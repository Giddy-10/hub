import { HubJokesType } from '@/functions/functions'
import { jokeExamples } from '@/functions/mockdata'
import React from 'react'


const page = () => {
    const favourites: HubJokesType[] = jokeExamples
  return (
      <div className="container">
          {favourites && favourites.length === 0 ? (
              <p>No favourites yet.</p>
          ) : (
              <div className="flex flex-col gap-6 w-fit max-w-[90%] mx-auto">
                  <h2 className='font-bold text-2xl my-4'>Favourite Jokes</h2>
                  {favourites.map((joke: HubJokesType) => (
                      <div key={joke.id} className='py-2 px-4 rounded-lg shadow-sm shadow-foreground/20'><p className='font-semibold'>{joke.content}</p></div>
                  ))}
              </div>
          )}
      </div>
  )
}

export default page