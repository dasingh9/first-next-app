//options.ts

import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import { Just_Me_Again_Down_Here } from "next/font/google";

import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../lib/models/user";


export const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                //const user = { id: "1", name: "Davinder", email: "dav@example.com", password: "pass123" }

                console.log("Authentictaed for ", req);
                const username = req.body.username;
                const password = req.body.password;

                try {
                    const user = await getUserByEmailAndPassword(username, password);
                    if(user)
                        return {
                            "name": `${user.firstName} ${user.lastName}`,
                            "email": user.emailId,
                            "role": "admin"
                        };
                    else
                        return null;
                }
                catch(error) {
                    console.log(error);
                    return null;
                }
 
                /*if (user?.email == username && user?.password == password) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    console.error(`Invalid username or password for user: ${user?.email}`);
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }*/
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            token.role = user?.role;
            if (user?.email === "dav@example.com") {
                token.role = 'admin';
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.role)
                session.user.role = token.role;
            return session;
        }
    }
    /*pages: {
        signIn: "auth/Sign"
    }*/
}

async function getUserByEmailAndPassword(emailId:string, password:string) {
    try {
        const mongoose = await dbConnect();
        const users = await User.find({ "emailId": emailId, "password": password });
        if(!users || users.length == 0)
            return null;
        return users[0];
    }
    catch (error) {
        throw new Error("Unable to find user");
    }
}