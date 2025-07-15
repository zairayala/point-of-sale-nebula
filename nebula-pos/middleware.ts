import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/autenticacion/iniciar-sesion', request.url))
        }
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
            if(payload.role === 2 && request.nextUrl.pathname.startsWith('/dashboard/modulos')){
                return NextResponse.redirect(new URL('/dashboard/principal', request.url))
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/autenticacion/iniciar-sesion', request.url))
        }

    }
    return NextResponse.next()

}
export const config = {
    matcher: '/dashboard/:path*',
}
