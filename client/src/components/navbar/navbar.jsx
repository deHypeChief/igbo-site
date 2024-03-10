import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../button/button'
import './style.css'
import { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/images/logo/learn_igbo_logo.svg'
import { userLogOut, userSigned } from '../../utilis/authManger'
import { Icon } from '@iconify/react'

export default function Navbar() {
    const dropdown = useRef()
    const [drop, setDroped] = useState()
    const [hamOpen, setHamOpen] = useState(true)

    const navTo = useNavigate()
    useEffect(() => {
        const screenWidth = window.screen.width
        let offset = 50

        if (userSigned()) {
            document.getElementsByClassName("navContents")[0].style.display = "none"
            document.getElementsByClassName("navContents")[1].style.display = "none"
            document.getElementsByClassName("hamMenu")[0].style.display = "none"
            document.getElementsByClassName("dashBoardValue-log")[0].style.display = "flex"

        } else {
            if (screenWidth > 600) {
                document.getElementsByClassName("navContents")[0].style.display = "flex"
                document.getElementsByClassName("navContents")[1].style.display = "block"
                document.getElementsByClassName("dashBoardValue-log")[0].style.display = "none"
            }
            if (screenWidth < 600) {
                document.getElementsByClassName("navContents")[0].style.display = "none"
                document.getElementsByClassName("navContents")[1].style.display = "none"
                document.getElementsByClassName("dashBoardValue-log")[0].style.display = "none"
            }
        }

        document.getElementById("dasboardTitle").innerText = "Dashboard"
        const nav = document.getElementsByTagName('nav')[0]
        const navWrap = document.getElementsByClassName('navWrap')[0]

        document.onscroll = (e) => {
            if (scrollY > offset) {
                nav.style.background = "white"
                navWrap.style.padding = screenWidth < 600 ? "10px 0px" : "10px 70px"
            }
            if (scrollY < offset - 10) {
                nav.style.background = "transparent"
                console.log(screenWidth);
            }
        }
    }, [hamOpen])

    const navLinks = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "Pricing",
            link: "/u/pricing"
        },
        {
            title: "Topics",
            link: "/u/topics"
        },
        {
            title: "Contact",
            link: "/"
        }
    ]
    function handleDropdown() {
        if (drop) {
            dropdown.current.style.display = "none"
            setDroped(false)
        } else {
            dropdown.current.style.display = "flex"
            setDroped(true)
        }
    }
    function handleHambuger() {
        if (hamOpen) {
            setHamOpen(false)
            document.getElementById("hamDropDown").style.display = 'flex'
        } else {
            setHamOpen(true)
            document.getElementById("hamDropDown").style.display = 'none'
        }
    }


    return (
        <nav>
            <div className="navWrap">
                <div className="navBox">
                    <div className="logo">
                        <Link to={'/'}>
                            <img src={Logo} alt="" />
                        </Link>
                    </div>

                    <div className="content navContents" >
                        {navLinks.map((value) => {
                            return (
                                <Link key={value.title} to={value.link}>{value.title}</Link>
                            )
                        })}
                    </div>
                    <div className="button navContents">
                        <Link to="/signin">
                            <Button>Login</Button>
                        </Link>
                    </div>


                    <div className="hamMenu">
                        <div className="hamWrap" onClick={handleHambuger}>
                            {
                                hamOpen ? (
                                    <Icon icon="ic:round-menu" width="2em" height="2em" />
                                ) : (
                                    <Icon icon="ic:round-close" width="2em" height="2em" />
                                )
                            }
                        </div>

                        <div className="hamDropDown" id='hamDropDown'>
                            {navLinks.map((value) => {
                                return (
                                    <Link key={value.title} to={value.link}>{value.title}</Link>
                                )
                            })}

                            <Link to="/signin">
                                <button>Sign in</button>
                            </Link>

                        </div>

                    </div>


                    <div className="dashBoardValue-log" id="logedInuser">
                        <p className="dashBoaedTitle" id="dasboardTitle">
                            Dashboard
                        </p>
                        <div className="stuBox">
                            <div className="boxUser" onClick={handleDropdown}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5m-4 9.5A3.75 3.75 0 0 0 4.25 17v1.188c0 .754.546 1.396 1.29 1.517c4.278.699 8.642.699 12.92 0a1.537 1.537 0 0 0 1.29-1.517V17A3.75 3.75 0 0 0 16 13.25h-.34c-.185 0-.369.03-.544.086l-.866.283a7.251 7.251 0 0 1-4.5 0l-.866-.283a1.752 1.752 0 0 0-.543-.086z"/></svg>
                            </div>
                            <div className="userDropDown" ref={dropdown}>
                                <Link to="/u/">
                                    <p>Dashboard</p>
                                </Link>
                                <Link to="/u/topics">
                                    <p>View Topics</p>
                                </Link>
                                <Link to="/u/pricing">
                                    <p>View Pricing</p>
                                </Link>

                                <p onClick={() => { userLogOut(navTo('/signin')) }}>Log Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}