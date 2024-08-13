import dbConnect from "../../lib/dbConnect";
import User from "../../lib/models/user";

export default async function UsersList() {

    let users = null;
    let errorMessage = null;

    try {
        users = await getUsers();
    }
    catch(error) {
        errorMessage = error.message;
    }
    

    return (
        <>
            <h1>List of users</h1>
            {errorMessage && <span>{errorMessage}</span>}
            {!errorMessage &&
                <ul>
                    {users.map(user=> (<li key={user.emailId}>{user.firstName}</li>))}
                </ul>
            }
        </>
    );
}

async function getUsers() {
    try {
        //make a connection to DB
        const mongoose = await dbConnect();
        const users = await User.find({});
        return users;
    }
    catch(error) {
        throw new Error("Unable to fetch users");
    }
}