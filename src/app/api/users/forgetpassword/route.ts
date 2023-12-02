import {connect} from "@/config/dbConfig"
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
import {sendEmail} from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        console.info(email)

        const isValidEmail = (email: any) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        if (email.toString().length < 4) {
            return NextResponse.json({error: "Lütfen geçerli bir kullanıcı adı veya mail adresi giriniz"}, {status: 400})
        }

        let user;
        if (isValidEmail(email)) {
            user = await User.findOne({email: email});
        } else {
            user = await User.findOne({username: email})
        }

        if (!user) {
            return NextResponse.json({error: "Kullanıcı bulunamadı"}, {status: 400})
        } else {

            try {
                await sendEmail({user, emailType: "RESET"})

                return NextResponse.json(
                    {message: "Şifre sıfırlama maili gönderildi", success: true, status: 200}
                )
            } catch (error: any) {
                return NextResponse.json(
                    {error: error.message},
                    {status: 500}
                )
            }
        }


    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}