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
        // console.log(userSigned());
        if (userSigned()) {
            document.getElementsByClassName("navContents")[0].style.display = "none"
            document.getElementsByClassName("navContents")[1].style.display = "none"
            document.getElementsByClassName("dashBoardValue-log")[0].style.display = "flex"

        } else {
            document.getElementsByClassName("navContents")[0].style.display = "flex"
            document.getElementsByClassName("navContents")[1].style.display = "block"
            document.getElementsByClassName("dashBoardValue-log")[0].style.display = "none"
        }
    }, [])
    const navLinks = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "About Us",
            link: "/"
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

    useEffect(() => {
        if (userSigned()) {
            document.getElementsByClassName("hamMenu")[0].style.display = "none"
        }
        document.getElementById("dasboardTitle").innerText = "Dashboard"
        const nav = document.getElementsByTagName('nav')[0]
        const navWrap = document.getElementsByClassName('navWrap')[0]

        document.getElementsByClassName("navContents")[0].style.display = "none"
        document.getElementsByClassName("navContents")[1].style.display = "none"

        const screenWidth = window.screen.width
        let offset = 50

        if (scrollY < offset - 10) {
            document.getElementsByClassName("navContents")[0].style.display = "none"
            document.getElementsByClassName("navContents")[1].style.display = "none"
        }

        document.onscroll = (e) => {
            if (scrollY > offset) {
                nav.style.background = "white"
                navWrap.style.padding = screenWidth < 600 ? "10px 0px" : "10px 70px"
            }
            if (scrollY < offset - 10) {
                nav.style.background = "transparent"
                navWrap.style.padding = screenWidth < 600 ? "20px 20px" : "20px 70px"
                document.getElementsByClassName("navContents")[0].style.display = "none"
                document.getElementsByClassName("navContents")[1].style.display = "none"
                console.log(screenWidth);
            }
        }
    }, [])

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
                            <div className="boxUser" onClick={handleDropdown}></div>
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