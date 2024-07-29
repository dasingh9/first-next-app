//without a defined matcher, this one line applies next-auth to the entire project
//export { default } from "next-auth/middleware";

//Applies next-auth only to matching routes - can be regex
//export const config = { matcher: ["/dashboard"] }

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      console.log('Middleware running for path:', req.nextUrl.pathname);
      if (req.nextUrl.pathname === "/dashboard") {
        return token?.role === "admin";
      }
      if (Boolean(token)) {
        console.log('Token found, allowing access');
        console.log(`Token:${JSON.stringify(token)}`);
      } else {
        console.log('No token, redirecting to login');
      }
      return Boolean(token);
    }
  }
});

export const config = { matcher: ['/dashboard', '/about', '/profile'] };
