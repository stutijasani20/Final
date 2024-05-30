import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from './middleware.service';

export async function middleware(request: NextRequest) {
    console.log('Middleware invoked');


    const token = await getToken();
    console.log('Token:', token);

    if (!token) {
        console.log('No token found, redirecting to login page');
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

  
    console.log('Token found, proceeding with the request');
    return NextResponse.next();
}


export const config = {
    matcher: ['/booking/:path*', '/reviews/add/:path*'],
};
