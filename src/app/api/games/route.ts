// GET /api/games
// POST /api/games

import { ResponseBuilder } from "../../../lib/response-builder";

let games = [
    {
        id: 540,
        title: "Overwatch 2",
        thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
        short_description: "A hero-focused first-person team shooter from Blizzard Entertainment.",
        game_url: "https://www.freetogame.com/open/overwatch-2",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Activision Blizzard",
        developer: "Blizzard Entertainment",
        release_date: "2022-10-04",
        freetogame_profile_url: "https://www.freetogame.com/overwatch-2"
    }
];

export function GET() {
    //make a connection to DB
    console.log("Request received");
    return ResponseBuilder.successResponse(games);
}

export async function POST(req: Request) {
    //make a connection to DB
    let body;
    try {
       body = await req.json();
    }
    catch(error) {
        return ResponseBuilder.badRequest("Invalid JSON payload for game");
    }
    const game = body;

    if (!game.id || !game.title) {
        return ResponseBuilder.badRequest("Invalid game data");
    }

    games.push(game);

    return ResponseBuilder.successResponse({ 'message': 'created' });
}