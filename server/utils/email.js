import nodemailer from 'nodemailer'

const adminMail = "learnigboonline@hotmail.com"
const adminPassword = "Learnigboon2024#"

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: adminMail,
        pass: adminPassword
    }
});

export function SendMail(res, email, subject, message){
    const mailOptions = {
        from: adminMail,
        to: email,
        subject: subject,
        html: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            res.status(400).json({
                message: "error sending mail",
                error: error
            })
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({
                message: "Password Reset Link has been sent to your mail",
                data: info.response
            })
        }
    });
}


