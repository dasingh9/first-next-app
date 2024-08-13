// GET /api/users
// POST /api/users

import { ResponseBuilder } from "../../../lib/response-builder";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../lib/models/user";

export async function GET() {
    console.log("Request received");

    try {
        //make a connection to DB
        const mongoose = await dbConnect();
        const users = await User.find({});
        return ResponseBuilder.success(users);
    }
    catch(error) {
        return ResponseBuilder.internalServerError("Failed to fetch users");
    }
}

/*
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

    return ResponseBuilder.success({ 'message': 'created' });
}
*/