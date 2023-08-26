import {connect} from "@/config/dbConfig"
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
// @ts-ignore
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {name, surname, username, email, password} = reqBody

        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({username})

        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        if (name.toString().length < 4 || surname.toString().length < 4 || username.toString().length < 4 || email.toString().length < 8) {
            return NextResponse.json({error: "Please fill in the fields validly."}, {status: 400})
        }

        if (password.toString().length < 6) {
            return NextResponse.json({error: "Please enter password more than 6 characters"}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            name,
            surname,
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        // todo : Kullanıcı mail doğrulattır, yoksa giriş yapamaz, aktif olmayanlar giriş yapamasın

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}