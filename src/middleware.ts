import { NextRequest, NextResponse } from 'next/server';
export function middleware(request:NextRequest){const loggedIn=!!request.cookies.get('venuze_token')?.value; const path=request.nextUrl.pathname;
 if(path.startsWith('/dashboard')&&!loggedIn){const url=new URL('/login',request.url);url.searchParams.set('next',path);return NextResponse.redirect(url);}
 if(path==='/login'&&loggedIn)return NextResponse.redirect(new URL('/dashboard',request.url));return NextResponse.next();}
export const config={matcher:['/dashboard/:path*','/login']};
