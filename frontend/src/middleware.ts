
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from './middleware.service'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // const token = request.headers.get('token')
    const token = await getToken();

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/booking/:path*', '/reviews/add/:path*'],
  }

