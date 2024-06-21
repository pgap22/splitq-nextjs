import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { EVERYONE_ROUTES, LOGIN_REDIRECT, NOAUTH_REDIRECT, PUBLIC_ROUTES } from "./auth.routes";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig)

export default auth((req)=>{
   const logged = !!req.auth
   const url = req.nextUrl.pathname
   
   const isPublic = PUBLIC_ROUTES.some(route => {
      return url.startsWith(route) || url == "/"
   })

   const isEveryone = EVERYONE_ROUTES.some(route => {
      return url.startsWith(route)
   })

   const isAPI = url.startsWith("/api")
   
   if(isEveryone) return
   if(isAPI) return

   if(!isPublic && !logged) return NextResponse.redirect(new URL(NOAUTH_REDIRECT, req.url))
   if(isPublic && logged) return NextResponse.redirect(new URL(LOGIN_REDIRECT, req.url))
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };