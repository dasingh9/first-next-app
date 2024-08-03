export class FetchGamesError extends Error {
    constructor(message) {
        super(message);
        this.name = "FetchgamesError";
        this.errorCode = "FETCH_GAMES_ERROR";
    }
}

export class FetchGenresError extends Error {
    constructor(message) {
        super(message);
        this.name = "FetchgamesError";
        this.errorCode = "FETCH_GENRES_ERROR";
    }
}