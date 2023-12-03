import {connect} from "@/config/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import User from "@/models/userModel"

connect()

export async function GET() {
    try {
        const userId = await getDataFromToken();
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json(
            {
                message: "User found",
                data: user
            }
        )
    } catch (error: any) {
        return NextResponse.json({data: null},{error: error.message}, {status: 400})
    }
}