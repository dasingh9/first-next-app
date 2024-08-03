// GET /api/games/{id}
// PUT /api/games/{id}
// DELETE /api/games/{id}

import { ResponseBuilder } from "../../../../lib/response-builder";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    id: number
}

// GET /api/games/{id}
export async function GET(request: NextRequest, context: { params: Params }) {
    const id = context.params.id;
    if (!id) {
        return ResponseBuilder.badRequest(`ID parameter is missing`);
        //or alternatively you can return the response as below
        //NextResponse.json({ error: 'ID parameter is missing' }, { status: 400 });
    }
    //write here code fetch a game from your database and return the game json object in response
    //... todo ...
    return ResponseBuilder.success({ message: `Game ID: ${id}` });
    //or alternatively you can return the response as below
    //NextResponse.json({ message: `Game ID: ${id}` });
}

// PUT /api/games/{id}
export async function PUT(req: NextRequest, context: { params: Params }) {
    const id = context.params.id;
    if (!id) {
        return ResponseBuilder.badRequest(`ID parameter is missing`);
    }
    const game = await req.json();
    console.log(`Going to update record for id: ${id}`);
    console.log(`Data for record id: ${id} is: ${JSON.stringify(game)}`);

    //write here code update the game to your database and return the success or fail response
    return ResponseBuilder.success({ message: `Game ID: ${id} updated successfully` });
}

// DELETE /api/games/{id}
export async function DELETE(req: NextRequest, context: { params: Params }) {
    const id = context.params.id;
    if (!id) {
        return ResponseBuilder.badRequest(`ID parameter is missing`);
    }
    console.log(`Going to delete game for id: ${id}`);

    //write here code delete the game from your database and return the success or fail response
    return ResponseBuilder.success({ message: `Game ID: ${id} deleted successfully` });
}
