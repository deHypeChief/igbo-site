import nodemailer from 'nodemailer'

const adminMail = "dev.hype7@gmail.com"
const adminPassword = "#justHYPE7"
const baseUrl = "http://localhost:5173/"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: adminMail,
        pass: adminPassword
    }
});

export function SendMail(subject, message){
    const mailOptions = {
        from: adminMail,
        to: email,
        subject: subject,
        text: message
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
                message: "Mail sent ",
                data: info.response
            })
        }
    });
}


