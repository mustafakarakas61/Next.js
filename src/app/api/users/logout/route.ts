import {NextResponse} from "next/server";
import { cookies} from "next/headers";

export async function GET() {
    try {
        const cookieStore = cookies();
        cookieStore.delete('token');

        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
        // response.cookies.set("token", "", {httpOnly: true, expires: new Date(0), path: "/"});
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}