import { useEffect, useState } from 'react'
import '../../assets/styles/student.css'
import { Button } from '../../components/button/button'
import { ClientLayout } from '../../components/layout/layout'
import { getUser, getUserData, userLogOut, userSigned } from '../../utilis/authManger'
import { Link, useNavigate } from 'react-router-dom'
import TeacherPopUp from '../teacher'

import dashProfile from '../../assets/images/A kid called BEAST _ NFT.jpeg'
import tutorImage from '../../assets/images/a_cartoon_Igbo__3d54e65c-ec54-4e12-bb66-b7fd056570fd-removebg-preview.png'

export default function StudentDashboard() {
    const navTo = useNavigate()
    const [teacherPoster, setTeacherPoster] = useState(false)
    const [plan, setPlan] = useState(null)
    const [data, setData] = useState({
        name: "--",
        level: "--",
        email: "--",
        exp: "--"
    })
    const [lesson, setLesson] = useState([{}])

    function openPoster() {
        setTeacherPoster(true)
    }
    function closePoster() {
        setTeacherPoster(false)
    }

    function TrailPropmt() {
        return (
            <>
                <div className="trialBox">
                    <div className="trialBox-mail">
                        <h1>Upgrade Your Plan</h1>
                        <p>Get more out of the app by upgrading your plan, access more levels and amazing features</p>
                        <div className="trialGroup">
                            <Link to={"/u/pricing"}>
                                <Button>View Pricing</Button>
                            </Link>
                            <Button action={() => {
                                setPlan(null)
                            }}>Go Back</Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        if (!userSigned()) {
            navTo('/signin')
        } else {
            getUser("/user/me", userSigned().token).then((data) => {
                console.log(data);
                setData(data.data.data, userSigned().token)
                setPlan(data.data.data.userPayment)

            }).catch((error) => {
                if (error.response.status == 401) {
                    navTo('/signin')
                    userLogOut()
                }
            })


            getUserData("/lesson/", userSigned().token)
                .then((data) => {
                    setLesson(data.data.data)
                })
        }
    }, [])

    return (
        <ClientLayout>
            <div className="dashboardStu">
                {teacherPoster ? <TeacherPopUp action={closePoster} /> : <></>}
                {plan === "Trial" || plan === "Trial plan" ? <TrailPropmt /> : <></>}
                <div className="profile">
                    <div className="profileWrap">
                        {/* <div className="profileBox">
                            <img src={dashProfile} alt="" />
                        </div> */}
                        <div className="profileInfo">
                            <h1>{data ? data.name : "loading"}</h1>
                            <p>{data ? data.email : "loading"}</p>
                            <div className="dashInfo">
                                <p>{data?.userPayment ? `${data?.userPayment} Plan` : "Gettting your plan"}</p>
                            </div>

                            <br />
                            <div className="statsPofile">
                                <div className="lessBox">
                                    <h3 className="lessText">
                                        {data.level}
                                    </h3>
                                    <p className='lessPargh'>Level</p>
                                </div>
                                <div className="lessBox">
                                    <h3 className="lessText">
                                        {data.exp}
                                    </h3>
                                    <p className='lessPargh'>Points</p>
                                </div>
                                <div className="lessBox">
                                    <h3 className="lessText">
                                        {
                                            data.level > 0 ? ("Beginner ") : (
                                                data.level > 4 ? "Intermediate " : (
                                                    data.level > 8 ? "Advanced  " : ""
                                                )
                                                
                                            )
                                        }
                                    </h3>
                                    <p className='lessPargh'>Rank</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="lesson">
                    <h2>Current Lesson</h2>
                    {
                        lesson.map((item, index) => {
                            if (item.level == data.level) {
                                return (
                                    <div key={"les" + index} className="nextLessWrap">
                                        <h1>{item.title}</h1>
                                        <p>Get a one on lesson with a teacher and improve on your Igbo skills faster</p>
                                        <Link to={"/u/lesson/" + item.level}>
                                            <Button>Current Lesson</Button>
                                        </Link>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className="getTutor">
                    <div className="getTutor-trial">
                        <h1>Get a private tutor</h1>
                        <p>Get a one on lesson with a teacher and improve on your Igbo skills faster</p>
                        <Button action={openPoster}>Get A Tutor</Button>
                        <div className="imggetTutor">
                            <img src={tutorImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}
