import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) { // kullanıcı zaten giriş yapmış ise istenilen url'ye gidiyor, kullanıcı giriş yapmışsa login ve signup'a tekrar girmemeli, anasayfaya yönlendirme işlemi burası
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) { // kullanıcı giriş yapmamışsa login sayfasına gönderiliyor
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
    ]
}