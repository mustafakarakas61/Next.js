// @ts-ignore
import nodemailer from 'nodemailer';
// @ts-ignore
import User from "@/models/userModel";
// @ts-ignore
import bcryptjs from "bcryptjs";

export const sendEmail = async ({user, emailType}: any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(user._id.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(user._id, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(user._id, {
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

        const url: string = `${process.env.DOMAIN}/${emailType=== "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}`;

        const mailOptions = {
            from: `${process.env.MAIL_ADD}`,
            to: user.email,
            subject: emailType === "VERIFY" ? "Mail Adresinizi Onaylayın" : "Şifrenizi Resetleyin",
            html: `<p>
                    Merhabalar <b>${user.name} ${user.surname} </b>, <br><br>
                    <a href="${url}">Bu linke</a> tıklayarak ${emailType === "VERIFY" ? "emailinizi onaylayabilir" : "şifrenizi değiştirebilir"}siniz. 
                    Alternatif olarak, linki tarayıcınıza yapıştırıp işlemi gerçekleştirebilirsiniz.
                    <br>Link : ${url}
                    <br><br>
                    Saygılarımızla <br>
                </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}