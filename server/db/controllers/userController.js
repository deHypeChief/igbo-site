import { SendMail } from '../../utils/email.js'
import { generateToken } from '../../utils/jwt.js'
import generateRandomChars from '../../utils/randomChars.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

export async function createUser(req, res) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(500).json({
            message: "Some fidels are missing"
        })
    } else {

        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return (res.status(500).json({
                message: "Email already in use"
            })
            )
        } else {
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)

            await User.create({
                name,
                email,
                password: hashedPassword,
                level: 1,
                exp: 0,
                userPayment: "Trial"
            }).then((data) => {

                SendMail(res, data.email, "Welcome to Learn Igbo Online", `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Template</title>
                    <style>
                        /* Reset styles */
                        body, html {
                            margin: 0;
                            padding: 0;
                            font-family: Arial, sans-serif;
                            font-size: 16px;
                            line-height: 1.5;
                        }
                        /* Main container styles */
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        /* Header styles */
                        .header {
                            background-color: #FF1C1C;
                            padding: 20px;
                            text-align: center;
                        }
                        /* Body content styles */
                        .content {
                            padding: 20px;
                            background-color: #fff;
                        }
                        /* Footer styles */
                        .footer {
                            background-color: #FF1C1C;
                            padding: 20px;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Welcome to Learn Igbo Online</h1>
                        </div>
                        <div class="content">
                            <p>Hello ${name},</p>
                            <p>Welcome to learn igbo online.</p>
                            <p>We are happy you are here, let's  unlock a new world of creative igbo learning</p>
                        </div>
                        <div class="footer">
                            <p>Regards,<br>Mrs Nneka Agu</p>
                        </div>
                    </div>
                </body>
                </html>`)

                res.status(201).json({
                    _id: data.id,
                    email: data.email,
                    name: data.name,
                    token: generateToken({ id: data.id }),
                    level: data.level,
                    exp: data.exp,
                    payment: data.userPayment
                })
            }).catch((error) => {
                res.status(500).json({
                    error: "Error creating new user",
                    message: error
                })
            })
        }
    }
}



export async function authUser(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(500).json({ message: "Some fields are missing" })
    } else {
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user.id,
                email: user.email,
                name: user.name,
                token: generateToken({ id: user.id })
            })
        } else {
            res.status(403).json(
                { message: "Invalid email or password" }
            )
        }
    }
}

export async function getMe(req, res) {
    await User.findById(req.user.id).select('-password').then((data) => {
        res.status(200).json({
            _id: data.id,
            message: "success",
            data: data
        })

    })
}

export async function getUsers(req, res) {
    await User.find().select('-password')
        .then((data) => {
            res.status(200).json({
                messagees: "all Users",
                data: data
            })
        })
}


export async function updateExp(req, res) {
    const { exp } = req.body

    const _user = await User.findById(req.user.id)

    if (_user) {
        await User.findByIdAndUpdate(req.user.id, {
            exp: _user.exp + parseInt(exp),
            level: _user.level += 1
        }).select('-password')
            .then((data) => {
                res.status(200).json({
                    messagees: "User Leved Up",
                    data: data
                })
            }).catch((error) => {
                res.status(400).json(
                    { message: "error updating exp" }
                )
            })
    }
}



export async function paymentRecord(req, res) {
    const { paymentType } = req.body

    if (paymentType) {
        await User.findByIdAndUpdate(req.user.id, { userPayment: paymentType })
            .then((data) => {
                res.status(200).json({
                    messagees: `${paymentType} plan has been added to to your account`,
                    data: data
                })
            }).catch((error) => {
                res.status(400).json(
                    { message: "error updating exp" }
                )
            })
    }
}



export async function changePassword(req, res) {
    const { newPassword, email } = req.body

    if (newPassword && email) {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        await User.findOneAndUpdate({ email: email }, {
            password: hashedPassword
        }, {
            new: true
        }).then(() => {
            res.status(200).json({
                message: "Password Changed"
            })
        })
            .catch(() => {
                res.status(400).json({
                    message: "Error changing password"
                })
            })
    } else {
        res.status(400).json(
            {
                message: "Invalid Link",
                error: error
            }
        )
    }
}

export async function forgotPassword(req, res) {
    const { email, baseUrl } = req.body

    if (email) {
        await User.findOne({ email })
            .then((data) => {
                SendMail(res, email, "Reset Your Password", `Use this link to reset your password link: ${baseUrl}/changePassword/${generateRandomChars(12)}_${btoa(email)}`)
            })
            .catch((error) => {
                console.log(error);
                res.status(400).json(
                    {
                        message: "The email does not exist",
                        error: error
                    }
                )
            })
    } else {
        res.status(400).json(
            {
                message: "Just your email address is required to change your password",
            }
        )
    }
}
