import { Button } from "../components/button/button"
import '../assets/styles/auth.css'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Navbar from "../components/navbar/navbar"
import { ClientLayout } from "../components/layout/layout"

import { authUser, createUser } from "../utilis/authManger"



export function SignIn() {
    const navTo = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        // Do something with the form data, like sending it to server
        authUser('/user/authUser', formData).then((data) => {
            if (data) {
                setLoading(false)
                alert("Login Valid")
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data.data))
                navTo('/u')
            }
        }).catch((error) => {
            alert(error.response.data.message)
            setLoading(false)
        })
    };

    return (
        <ClientLayout>
            <section className="auth">
                <div className="authSignBox signIn">
                    <form className="authIn" onSubmit={handleSubmit} action='submit'>
                        <h1>Login to your account</h1>
                        <p>Welcome Back</p>

                        <input type="text" placeholder='Email Address'
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange} />

                        <input type="password" placeholder='Password'
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange} />

                        <p className='authSecP'>Don&apos;t have an account <Link to={'/signup'}>Sign Up</Link></p>
                        
                        <Button>{loading ? "loading ..." : "Sign In"}</Button>
                    </form>
                </div>
            </section>
        </ClientLayout>
    )
}

export function SignUp() {
    const [accComplete, isAccComplete] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        // Do something with the form data, like sending it to a server
        createUser('/user/createUser', formData).then((data) => {
            if (data) {
                setLoading(false)
                isAccComplete(true)
                localStorage.setItem("user", JSON.stringify(data.data))
            }
        }).catch((error) => {
            alert(error.response.data.message)
            setLoading(false)
        })
    };

    return (
        <ClientLayout>
            <section className="auth signup">
                {accComplete ? <AccountCreated /> : (

                    <div className="authSignBox">
                        <form className='authIn' onSubmit={handleSubmit} action="submit">
                            <h1>Create
                                an account</h1>
                            <p>To get started create an account and join the fun</p>
                            <input type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder='Your Name' required />

                            <input type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='Email Address' required />

                            <input type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder='Password' required />

                            <p className='authSecP'>Already have an account <Link to={'/signin'}>Sign In</Link></p>
                            <Button>{loading ? "loading ..." : "Send Link"}</Button>
                        </form>
                    </div>
                )}
            </section >
        </ClientLayout>
    )
}




export function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: '',
    });
    const [loading, setLoading] = useState(false)


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    return (
        <ClientLayout>
            <section className="auth">
                <div className="authSignBox signIn">
                    <form className="authIn" action='submit'>
                        <h1>Change Your Password</h1>
                        <p>Enter your email related to your account</p>

                        <input type="text" placeholder='Email Address'
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Button>{loading ? "loading ..." : "Change Password"}</Button>
                    </form>
                </div>
            </section>
        </ClientLayout>
    )
}


export function ChangePassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: "",
    });


    const [loading, setLoading] = useState(false)


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    return (
        <ClientLayout>
            <section className="auth">
                <div className="authSignBox signIn">
                    <form className="authIn" action='submit'>
                        <h1>Change Your Password</h1>
                        <p>Enter your email related to your account</p>

                        <input type="text" placeholder='Password'
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <input type="text" placeholder='Confirm Password'
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        <Button>{loading ? "loading ..." : "Change Password"}</Button>
                    </form>
                </div>
            </section>
        </ClientLayout>
    )
}


function AccountCreated() {
    return (
        <div className="accCreate">
            <div className="accWrap">
                <h1>Your Account Has Been Created</h1>
                <Link to="/u">
                    <Button>Get Started</Button>
                </Link>
            </div>
        </div>
    )
}