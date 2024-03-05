import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../button/button'
import './style.css'
import { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/images/logo/learn_igbo_logo.svg'
import { userLogOut, userSigned } from '../../utilis/authManger'

export default function Navbar() {
    const dropdown = useRef()
    const [drop, setDroped] = useState()
    const navTo = useNavigate()
    useEffect(() => {
        console.log(userSigned());
        if (userSigned()) {
            document.getElementsByClassName("navContents")[0].style.display = "none"
            document.getElementsByClassName("navContents")[1].style.display = "none"
            document.getElementsByClassName("dashBoardValue-log")[0].style.display = "flex"

        }else{
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
        document.getElementById("dasboardTitle").innerText = "Dashboard"
        const nav = document.getElementsByTagName('nav')[0]
        const navWrap = document.getElementsByClassName('navWrap')[0]

        const screenWidth = window.screen.width
        let offset = 50
        document.onscroll = (e) => {
            if (scrollY > offset) {
                nav.style.background = "white"
                navWrap.style.padding = screenWidth < 600 ? "10px 0px" : "10px 70px"
            }
            if (scrollY < offset - 10) {
                nav.style.background = "transparent"
                navWrap.style.padding = screenWidth < 600 ? "20px 30px" : "20px 70px"
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

                                <p onClick={()=>{userLogOut(navTo('/signin'))}}>Log Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}