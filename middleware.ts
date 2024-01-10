import { NextResponse,NextRequest} from 'next/server'
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function middleware (request: NextRequest) {
  const token = getCookie("token", {cookies}) || null
  const role = getCookie("role", {cookies}) || null
  const expiration = getCookie("expiration", {cookies})|| ""  

  var date = expiration;
  var datearray = date.split("/");

  var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
  const dateExpiration = Date.parse(newdate);
  const dateNow = Date.parse(new Date().toISOString().split('T')[0]);

  // if (request.nextUrl.pathname.startsWith('/')) {
  //   if(token && role === "Student"){
  //     return NextResponse.rewrite(new URL('/', request.url))
  //   } else if(token && role === "Admin") {
  //     return NextResponse.rewrite(new URL('/admin', request.url))
  //   } else {
  //     return NextResponse.rewrite(new URL('/login', request.url))
  //   }
  // }

  if (request.nextUrl.pathname === '/') {
    if(token && role === "Student"){
      return NextResponse.rewrite(new URL('/', request.url))
    }else if(token && role === "Admin") {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  if (request.nextUrl.pathname === '/admin') {
    if(token && role === "Student"){
      return NextResponse.redirect(new URL('/', request.url))
    }else if(token && role === "Admin") {
      return NextResponse.rewrite(new URL('/admin', request.url))
    }
  }

  if (
    dateNow > dateExpiration
  ) {
    request.cookies.delete("token");
    request.cookies.delete("role");
    request.cookies.delete("expiration");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    response.cookies.delete("role");
    response.cookies.delete("expiration");
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)'
]
}
