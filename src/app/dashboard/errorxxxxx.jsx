'use client' // Error components must be Client Components
import {FetchGamesError, FetchGenresError} from "../../lib/errors/custom-errors";
import { useEffect, useState } from 'react'
// Save as app/posts/error.jsx
export default function Error({ error, reset }) {
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        // Log the error to an error reporting service
        //console.error(error)

        if (error?.errorCode == "FETCH_GAMES_ERROR") {
            setErrorMessage("Games List broken")
        } else if (error?.errorCode=="FETCH_GENRES_ERROR") {
            setErrorMessage("Genres List broken")
        }
        else {
            setErrorMessage(error.message);
        }

    }, [error])
    return (
        <div>
            <h2>Something went wrong!</h2>
            <div style={{ marginTop: "20px" }}></div>
            
            <p>{errorMessage}</p>

            <div style={{ marginTop: "20px" }}></div>
            {/* Attempt to recover by trying to re-render the segment */}
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}