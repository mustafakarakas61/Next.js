import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/config/dbConfig"
import User from "@/models/userModel"
import toast from "react-hot-toast";

connect()

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {newUsername, _id} = reqBody // user will be change only username, _id will be taken from token

        const user = await User.findOne({_id})

        if (user) {
            if (newUsername.toString().trim().length < 4) {
                return NextResponse.json({error: "Please enter username at least 4 characters."}, {status: 400})
            }

            user.username = newUsername;
            const savedUser = await user.save();
            return NextResponse.json({message: "Updated successful", status: true, savedUser})
        } else {
            return NextResponse.json({error: "This user's id not found"}, {status: 400})
        }


    } catch (error: any) {
        NextResponse.json({error: error.message}, {status: 500})
    }
}