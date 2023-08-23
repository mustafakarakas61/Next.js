import {connect} from "@/config/dbConfig"
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel"

connect()

export async function GET() {
    try {
        const users = await User.find();

        return NextResponse.json(
            {
                message: "Customers",
                data: users
            }
        )
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}