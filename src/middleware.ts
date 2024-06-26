
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from "jsonwebtoken";
import { getDataFromToken } from './helpers/getDataFromToken';





export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  

  const isPublicPath = path == '/login' || path == '/signup' || path == "/verifyemail" || path == "/"

  const test = path.includes('/login')
  

  let token: any = request.cookies.get('token')?.value || ''

  if (token == "") {
    token = false
  } else {
    token = true
  }



  





  // if (isPublicPath && checkToken) {
  //   
  //   
  //   
  //   return NextResponse.redirect(new URL('/login', request.nextUrl))
  // }


  if (!isPublicPath && !token) {
    
    
    
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profilePost',
    '/SearchPage',
    '/profile',
    '/profile/[id]',
    '/login',
    '/signup',
    '/verifyemail',
    '/ProfileRatingPage',
    '/verifySpecificComponent/[specificFieldToChange]'
  ], unstable_allowDynamic: [
    "/node_modules/lodash/**",
    "/node_modules/jsonwebtoken/**",
    "/node_modules/**"



  ]
}