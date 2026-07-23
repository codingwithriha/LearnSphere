import nodemailer,{Transporter} from 'nodemailer'
import ejs from 'ejs'
import path from "path"
import dotenv from "dotenv"
dotenv.config();
interface EmailOption{
    email:string;
    subject:string,
    template:string,
    data:{[key:string]:any}
}

const sendMailer=async (option:EmailOption):Promise <void>=>{
    const transporter:Transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:parseInt(process.env.SMPT_PORT||'587'),
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    })

    const {email,subject,template,data}=option;
    const templetepath=path.join(__dirname,'../mails',template);
    const html:string=await ejs.renderFile(templetepath,data);
    const mailOption={
        form:process.env.SMTP_MAIL,
        to:email,
        subject,
        html
    };
    await transporter.sendMail(mailOption)
}
export default sendMailer;