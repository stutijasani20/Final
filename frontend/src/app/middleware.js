// import { NextResponse } from 'next/server';
// import Cookies from 'js-cookie';

// // This function will run on every request
// export function middleware(request) {
//   const token = request.cookies.get('token');
  
//   if (!token) {
//     // Redirect to the login page if the token is not present
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // If the token is present, allow the request to continue
//   return NextResponse.next();
// }

// // Specify the paths for which the middleware should run
// export const config = {
//   matcher: ['/protected/:path*'],
// };
