import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';


export async function SendEmail({username,email,userId,type}:any) {
    try {
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "6aaf711aebe3cb",
                pass: "86785d4db44b93"
            }
        });

        //determine which template to use
        const templatePath =path.resolve(process.cwd(),`src/utils/${type==='VERIFY'?'verifyEmailTemplate.html':'resetPasswordTemplate.html'}`)
        let html=fs.readFileSync(templatePath,'utf-8');

        console.log(templatePath)

        //Replace placeholders with actual values
        html=html.replace('{{username}}',username);
        html=html.replace('{{userId}}',userId);

        const info = await transporter.sendMail({
            from: 'hibbanrahmanhyt@gmail.com',
            to: email,
            subject: type==="VERIFY"?'Verify your account':'Reset your password',
            html: html
          });

          console.log("Message sent %s",info.messageId);


    } catch (error) {
        console.log("Something went wrong!!", error);
    }
}