import {connect} from "@/config/dbConfig"
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel"
// @ts-ignore
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token, password, acceptPassword} = reqBody

        if (password.toString().length < 6) {
            return NextResponse.json({error: "Lütfen şifrenizi 6 veya daha fazla uzunlukta giriniz"}, {status: 400})
        }

        if (password.toString() != acceptPassword.toString()) {
            return NextResponse.json({error: "Şifreler uyuşmuyor!"}, {status: 400})
        }

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})

        if (!user) {
            return NextResponse.json({error: "Doğrulama süresi doldu."}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            message: "Şifre başarıyla değiştirildi",
            success:true
        })

    } catch (error : any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}