import React from 'react';

interface JokeType {
    id: string;
    content: string;
}

const favourites: JokeType[] = [
    { id: '1', content: 'Why did the scarecrow win an award? Because he was outstanding in his field!' },
    { id: '2', content: 'Why don’t skeletons fight each other? They don’t have the guts.' },
    { id: '3', content: "What do you call cheese that isn't yours? Nacho cheese!" },
];


export default function FavouritesPage() {
    return (
        <div className="container">
            <h2>⭐ Favourite Jokes</h2>
            <ul id="favouriteList"></ul>


            {favourites && favourites.length === 0 ? (
                <p>No favourites yet. Start cracking jokes!</p>
            ) : (
                <ul>
                    {favourites.map((joke: JokeType) => (
                        <li key={joke.id}>{joke.content}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}