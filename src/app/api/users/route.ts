// GET /api/users
// POST /api/users

import { ResponseBuilder } from "../../../lib/response-builder";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../lib/models/user";

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find({});
        return ResponseBuilder.success(users);
    }
    catch(error) {
        return ResponseBuilder.internalServerError("Failed to fetch users");
    }
}

export async function POST(req: Request) {

    let userPayload = null;
    //validate user payload
    try {
        userPayload = await req.json();
        validateUserPayload(userPayload);
    }
    catch(error) {
        console.log(`Failed to create user. ERROR: ${error}`);
        return ResponseBuilder.badRequest(error.message);
    }

    //create user
    try {
        await dbConnect();
        const user = await new User(userPayload).save();
        console.log(`_id:${user._id} - User created successfully`);
        return ResponseBuilder.success(user);
    }
    catch(error) {
        console.log(`Failed to create user. ERROR: ${error}`);
        return ResponseBuilder.internalServerError(error.message);
    }
}

// Function to validate the payload using the schema
function validateUserPayload(userPayload) {
    const tempUser = new User(userPayload);
    const error:any = tempUser.validateSync(); // Synchronous validation
    if (error) {
        throw new Error(Object.values(error.errors).map((err:any) => err.message).join(', '));
    }
}
