import '../assets/styles/home.css'
import heroImg from '../assets/images/Hero-img.png'
import waveImg from '../assets/images/bgWave.png'
import { Button } from '../components/button/button'

import commuCard from '../assets/images/medium-shot-nigerian-dancers-with-jewelry.jpg'
import fImg1 from '../assets/images/3d-illustration-sand-clock-isolated-white-removebg-preview 1.png'
import fImg2 from '../assets/images/question-mark-bubble-speech-sign-icon-3d-rendering_47987-15901-removebg-preview 1.png'
import fImg3 from '../assets/images/Red_play_button_3d_vector_illustration-removebg-preview 1.png'
import { Link, useNavigate } from 'react-router-dom'
import { ClientLayout } from '../components/layout/layout'


import { userSigned } from '../utilis/authManger'
import { useEffect } from 'react'
import aboutImg from "../assets/images/learnigboonline_1710147103698.jpeg"

export default function Home() {
    const navTo = useNavigate()
    useEffect(()=> {
        if(userSigned()){
            navTo('/u')
        }
    })

    
    const featuresList = [
        {
            id: "fImg1",
            img: fImg2,
            title: "Fun and practical quiz",
            des: "We provide  a simple module that enables you learn at your own pace"
        },
        {
            id: "fImg2",
            img: fImg1,
            title: "Learn at your own pace ",
            des: "We provide  a simple module that enables you learn at your own pace"
        },
        {
            id: "fImg3",
            img: fImg3,
            title: "Over 100 videos on Youtube ",
            des: "We provide  a simple module that enables you learn at your own pace"
        }
    ]

    // function handleFeatures(id) {

    //     const card = document.getElementById(id)
    //     if (card.classList.contains('fclose')) {
    //         card.style.height = 'fit-content'
    //         card.classList.remove('fclose')

    //     } else {
    //         card.style.height = '260px'
    //         card.classList.add('fclose')
    //     }

    // }


    return (
        <ClientLayout>
            <section className="hero">
                <div className="heroWrap">
                    <div className="heroContent">
                        <h1>Igbo Learning <br /> Made Fun</h1>
                        <p>
                            Discover the new possibility in the way we
                            approach Igbo learning
                        </p>
                        <div className="heroLink">
                        <Link to='/signin'>
                            <Button>Sign In</Button>
                        </Link>
                        <Link to='/demo/:id'>
                            <Button>Play Demo</Button>
                        </Link>
                        </div>
                    </div>
                    <div className="heroImage">
                        <img src={heroImg} alt="hero image of kids smiling" />
                    </div>
                </div>
            </section>

            <section className="aboutIgbo">
                <div className="aboutWrap">
                    <div className="igboImg">
                        <img src={aboutImg} alt="" />
                    </div>
                    <div className="igboContent">
                        <h1>About The Author</h1>
                        <p>I’m Nneka Agu, a mother, teacher, trainer. I am passionate about impacting young mind’s through trainings (growing up great series), teaching ( Igbo online classes). <br /><br /> 
Join me as we explore this journey together</p>
                        <Link to="/u/pricing">
                            <Button>Get a tutor</Button>
                        </Link>
                    </div>
                </div>
                <div className="aboutWave">
                    <div className="bbWave">
                        <img src={waveImg} alt="" />
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="featureWrap">
                    {
                        featuresList.map((value) => {
                            return (
                                <div key={value.title} id={value.id} className="fBox ">
                                    <div className="fIMgWrap">
                                        <img src={value.img} alt="" className="fImage" />
                                    </div>
                                    <h2 className="vTitles">{value.title}</h2>
                                    <p>{value.des}</p>
                                    {/* <div className="fButtonWrap" onClick={() => { handleFeatures(value.id) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 1408 1408"><path fill="currentColor" d="M1408 608v192q0 40-28 68t-68 28H896v416q0 40-28 68t-68 28H608q-40 0-68-28t-28-68V896H96q-40 0-68-28T0 800V608q0-40 28-68t68-28h416V96q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68"/></svg>
                                    </div> */}
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section className="commu">
                <div className="commuPlayWrap">
                    <div className="commuPlay">
                        <div className="playCard">
                            <img src={commuCard} alt="" />
                        </div>
                    </div>
                    <div className="commuText">
                        <h1>Learn with
                            our Community</h1>
                        <p>Kids love fun and that is where we come in, with various amazing topics for your kids </p>
                        <Link to="">
                        <Button>Join Us</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <footer>
                <div className="footerBottom">
                    <p>All Rights Reserved</p>
                    <p>Designed By FirstClassPilot</p>
                </div>
            </footer>
        </ClientLayout>
    )

}


