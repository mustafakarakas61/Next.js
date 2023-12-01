// @ts-ignore
import nodemailer from 'nodemailer';
// @ts-ignore
import User from "@/models/userModel";
// @ts-ignore
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        // create transporter
        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.MAIL_ADD}`,
                pass: `${process.env.MAIL_PASS}`
            }
        });

        const url: string = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;

        const mailOptions = {
            from: `${process.env.MAIL_ADD}`,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href={url}>here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}