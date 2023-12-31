import {connect} from "@/config/dbConfig"
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
// @ts-ignore
import bcryptjs from "bcryptjs";
// @ts-ignore
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, password} = reqBody;

        const isValidEmail = (email:any) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };


        if (username.toString().length < 4 || password.toString().length < 4) {
            return NextResponse.json({error: "Lütfen en az 4 karakterli giriniz"}, {status: 400})
        }

        // check if user exists
        let user;
        if (isValidEmail(username)) {
            user = await User.findOne({email: username});
        } else {
            user = await User.findOne({username})
        }

        if (!user) {
            return NextResponse.json({error: "Kullanıcı adı veya şifre hatalı"}, {status: 400})
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({error: "Kullanıcı adı veya şifre hatalı"}, {status: 400})
        }

        if (!user.isVerified) {
            return NextResponse.json({error: "Lütfen emailinizi onaylayın"}, {status: 400}) // 401 verince build hatası verdi
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500})
    }
}