'use client' // Error components must be Client Components
import { useEffect } from 'react'
// Save as app/posts/error.jsx
export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    return (
        <div>
            <h2>Something went wrong!</h2>
            <div style={{ marginTop: "20px" }}></div>
            <p>Failed to get games list.</p>
            <div style={{ marginTop: "20px" }}></div>
            {/* Attempt to recover by trying to re-render the segment */}
            <button onClick={() => reset()}>
                Try again
 </button>
        </div>
    )
}
