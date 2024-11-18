import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest){
  // abhi true chod raha hu bad me token wala add karunga 
  // const accessToken = request.cookies.get('accessToken');

  const accessToken = true;

  if(!accessToken){
    // if token not found, redirect to login page
    // we also have to alow the url such as auth/login and auth/register so that this pages can be used 
    // till we get the token
    if(request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/register'){
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)']
};