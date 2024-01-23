import { NextResponse,NextRequest} from 'next/server'
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export function middleware (request: NextRequest) {
  const token = getCookie("token", {cookies}) || null
  const role = getCookie("role", {cookies}) || null
  const expiration = getCookie("expiration", {cookies})|| ""  

  var date = expiration;
  var datearray = date.split("/");

  var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
  const dateExpiration = Date.parse(newdate);
  const dateNow = Date.now();
  
  // const protectedRoutes = ['parent', 'admin', 'teacher'];
  // var path: string = request.nextUrl.pathname.toLowerCase();
  // if (protectedRoutes.some(x => path.startsWith('/' + x.toLowerCase()))) { 
    
  // }
  //protect routes
  //redirect routes

  if (request.nextUrl.pathname.includes("/parent")) {
    if(token && role === "Parent"){
      if(request.nextUrl.pathname !== "/parent"){
        return NextResponse.rewrite(new URL(request.nextUrl.pathname, request.url))
      }
    }
    else {
      return NextResponse.rewrite(new URL('/login', request.url))
    }
  }

  if ((request.nextUrl.pathname).includes('/admin')) {
    if(token && role === "Admin") {
      if(request.nextUrl.pathname !== "/admin"){
        return NextResponse.rewrite(new URL(request.nextUrl.pathname, request.url))
      }
    }else {
      return NextResponse.rewrite(new URL('/login', request.url))
    }
  }

  if (request.nextUrl.pathname.includes('/login')) {
    if(token && role === "Parent"){
      return NextResponse.redirect(new URL('/parent', request.url))
    }else if(token && role === "Admin") {
      return NextResponse.redirect(new URL('/admin', request.url))
    }else if(token && role === "Teacher") {
      return NextResponse.redirect(new URL('/teacher', request.url))
    }else {
      return NextResponse.rewrite(new URL('/login', request.url))
    }
  }

  if ((request.nextUrl.pathname).includes('/profile')) {
    if(token && role === "Parent"){
      return NextResponse.redirect(new URL('/parent/profile', request.url))
    }else if(token && role === "Admin") {
      return NextResponse.redirect(new URL('/admin/profile', request.url))
    }else if(token && role === "Teacher") {
      return NextResponse.redirect(new URL('/teacher/profile', request.url))
    }else {
      return NextResponse.rewrite(new URL('/login', request.url))
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
