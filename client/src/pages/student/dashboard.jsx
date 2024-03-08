import { useEffect, useState } from 'react'
import '../../assets/styles/student.css'
import { Button } from '../../components/button/button'
import { ClientLayout } from '../../components/layout/layout'
import { getUser, getUserData, userSigned } from '../../utilis/authManger'
import { Link, useNavigate } from 'react-router-dom'
import TeacherPopUp from '../teacher'
export default function StudentDashboard() {
    const navTo = useNavigate()
    const [teacherPoster, setTeacherPoster] = useState(false)
    const [data, setData] = useState({
        name: "--",
        level: "--",
        email: "--",
        exp: "--"
    })
    const [lesson, setLesson] = useState([
        {}
    ])

    function openPoster(){
        setTeacherPoster(true)
    }
    function closePoster(){
        setTeacherPoster(false)
    }

    useEffect(() => {
        if (!userSigned()) {
            navTo('/signin')
        } else {

            getUser("/user/me", userSigned().token)
            
                .then((data) => {
                console.log(data);
                    setData(data.data.data, userSigned().token)
                })
                .catch((error) => {
                    console.log(error.response.status);
                    if(error.response.status == 401){
                        navTo("/signin")
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
                {teacherPoster ? <TeacherPopUp action={closePoster}/> : <></>}
                <div className="profile">
                    <div className="profileWrap">
                        <div className="profileBox"></div>
                        <div className="profileInfo">
                            <h1>{data ? data.name : "loading"}</h1>
                            <p>{data ? data.email : "loading"}</p>
                        </div>
                    </div>
                </div>
                <div className="stats">
                    <h2>Your Stats</h2>
                    <div className="lessonsStat">
                        <div className="lessBox">
                            <h3 className="lessText">
                                {data.level}
                            </h3>
                            <p>Current <br /> Level</p>
                        </div>
                        <div className="lessBox">
                            <h3 className="lessText">
                                {data.exp}
                            </h3>
                            <p>Exp <br /> Point</p>
                        </div>
                        <div className="lessBox">
                            <h3 className="lessText">
                                2
                            </h3>
                            <p>Current <br /> Rank</p>
                        </div>
                        <div className="lessBox">
                            <h3 className="lessText">
                                2
                            </h3>
                            <p>Current <br /> Level</p>
                        </div>
                    </div>

                </div>
                <div className="lesson">
                    <h2>Current Lesson</h2>
                    {
                        lesson.map((item, index) => {
                            if (item.level == data.level) {
                                return (
                                    <div key={"les" + index } className="nextLessWrap">
                                        <h1>{item.title}</h1>
                                        <p>Get a one on lesson with a teacher and improve on your Igbo skills faster</p>
                                        <Link to={"/u/lesson/" + item._id}>
                                            <Button>Start Lesson</Button>
                                        </Link>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className="getTutor">
                    <h1>Get a private tutor</h1>
                    <p>Get a one on lesson with a teacher and improve on your Igbo skills faster</p>
                    <Button action={openPoster}>Get A Tutor</Button>
                </div>
            </div>
        </ClientLayout>
    )
}