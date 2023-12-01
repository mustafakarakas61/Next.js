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
            subject: emailType === "VERIFY" ? "Mail Adresinizi Onaylayın" : "Şifrenizi Resetleyin",
            html: `<p>
                    Merhaba, <br><br>
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Bu linke</a> tıklayarak ${emailType === "VERIFY" ? "emailinizi onaylayabilir" : "şifrenizi değiştirebilir"}siniz. 
                    Alternatif olarak, linki tarayıcınıza yapıştırıp doğrulama işlemini gerçekleştirebilirsiniz.
                    Link : ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    <br><br>
                    Saygılarımla, <br>
                </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}