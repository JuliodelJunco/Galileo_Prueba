import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const pathname = req.nextUrl.pathname;

  if (!isLoggedIn) {
    return Response.redirect(
      new URL("/login", req.nextUrl)
    );
  }

  if (
    pathname.startsWith("/dashboard") &&
    role !== "admin"
  ) {
    return Response.redirect(
      new URL("/tickets", req.nextUrl)
    );
  }

  return null;
});