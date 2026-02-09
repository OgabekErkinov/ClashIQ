import { NextRequest, NextResponse } from "next/server";

export function middleware(request : NextRequest) {
    const role = request.cookies.get('userRole')?.value
    console.log(role)

    //getting path of url
    const { pathname } = request.nextUrl
    //if user want to go admin panel
    if(pathname.startsWith('/admin')){
        console.log(role)
        if(role === 'user'){
            console.log(pathname)
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // if user go in platform already
    if(pathname === '/' && role){
        
        //if role is user goes to user side else goes to admin side
        const dashPath = role === 'user' ? '/user' : '/admin'
        return NextResponse.redirect(new URL(dashPath, request.url))
    }

}

    export const config = {
        matcher : ["/admin/:path*", "/user/:path*", "/"],
    };