//without a defined matcher, this one line applies next-auth to the entire project
//export { default } from "next-auth/middleware";

//Applies next-auth only to matching routes - can be regex
//export const config = { matcher: ["/dashboard"] }

import { withAuth } from 'next-auth/middleware';

const pathsRequiringAuthentication = ['/dashboard', '/about', '/profile'];
const adminGroupPaths = ['/users', '/dashboard'];
const standardGroupPaths = ['/profile'];

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      console.log('Middleware running for path:', req.nextUrl.pathname);

      //TEMP block start: temporary by passed authentication for /api paths, but this block to be removed before the deployment
      if (req.nextUrl.pathname.startsWith("/api")) {
        return true;
      }
      //TEMP block end

      //Admin Only Path accessible to users in `admin` group only
      if (adminGroupPaths.includes(req.nextUrl.pathname)) {
        const allowAdminAccess = token?.group === "admin";
        const message = `Authorized: ${allowAdminAccess} - Path '${req.nextUrl.pathname}' is accessible to users in 'admin' group only`;
        console.info(message);
        return allowAdminAccess;
      }

      //Standard Paths accessible to users in `standard` and `admin` groups only
      if (standardGroupPaths.includes(req.nextUrl.pathname)) {
        const allowStandardAccess = token?.group === "admin" || token?.group === "standard";
        const message = `Authorized: ${allowStandardAccess} - Path '${req.nextUrl.pathname}' is accessible to users in 'admin' or 'standard' group only`;
        console.info(message);
        return allowStandardAccess;
      }

      //other protected pages accessible to all authenticated users (irrespective of their group)
      if (Boolean(token)) {
        const message = `Authorized: true - Path '${req.nextUrl.pathname}' is accessible to all authenticated users (irrespective of their group)`;
        console.info(message);
        return true;
      } else {
        console.error('Authorized: false - No token, redirecting to login');
        return false;
      }

    }
  }
});

export const config = { matcher: pathsRequiringAuthentication };
