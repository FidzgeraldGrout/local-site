import { NextResponse } from 'next/server';

export default async function handler( req, res ) {

    if( req.nextUrl.pathname == "/authorization" )
        return NextResponse.rewrite(`${process.env.NEXT_PUBLIC_CLIENT_URL}/authorization/login`)
    else
        return NextResponse.next();

}
