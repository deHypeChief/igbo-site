import '../../assets/styles/lesson.css'
import { ClientLayout } from "../../components/layout/layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, postUser, postUserData, userSigned } from "../../utilis/authManger";
import { Button } from "../../components/button/button";

export default function Lesson() {
    const [lessonData, setLessonData] = useState({
        level: "loading lessons",
        title: "--",
        note: "--"
    })
    const [noteData, setNoteData] = useState([])
    const [loading, setLoading] = useState(false)
    const [plan, setPlan] = useState(null)

    let obj

    const { id } = useParams()
    const navTo = useNavigate()
    useEffect(() => {
        if (!userSigned()) {
            navTo('/signin')
        } else {
            getUser("/user/me", userSigned().token).then((data) => {
                console.log(data);
                setPlan(data.data.data.userPayment)
            })


            postUserData('/lesson/oneLesson', { level: id }).then((data) => {
                eval('obj = ' + data.data.data.note)
                setNoteData(obj)

                setLessonData(data.data.data)
                document.getElementById("dasboardTitle").innerText = data.data.data.title
            }).catch(error => {
                console.log(error);
            })
        }
    }, [])

    function TrailPropmt(){
        return (
            <>
                <div className="trialBox">
                    <div className="trialBox-mail">
                        <h1>Unlock the level</h1>
                        <p>Level is locke to access the level upgrade your plan</p>
                        <div className="trialGroup">
                            <Link to={"/u/pricing"}>
                                <Button>View Pricing</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    function updateExp(){
        setLoading(true)
        postUser("/user/exp", { exp: 200}, userSigned().token).then(() => {
            setLoading(false)
            navTo('/u/topics')
        })
    }


    return (
        <ClientLayout>
            {plan === "Trial" || plan === "Trial plan"  && parseInt(lessonData.level) >= 3 ? <TrailPropmt/> : <></> }
            <section className="lessons">
                <h2>Level {lessonData.level}</h2>
                <h1>
                    {lessonData.title}
                </h1>
                <div className="lessonBox">
                    {
                        noteData?.map((item, index) => {
                            if (item.type === "h1") {
                                return (
                                    <h1 className="h1head" key={"a" + index}>{item.content}</h1>
                                )
                            }
                            if (item.type === "h2") {
                                return (
                                    <h2 className="h2head" key={"a" + index}>{item.content}</h2>
                                )
                            }
                            if (item.type === "p") {
                                return (
                                    <p className="phead" key={"a" + index}>{item.content}</p>
                                )
                            }
                        })
                    }
                </div>


                {
                    lessonData.level === 4 || lessonData.level === 8 || lessonData.level === 12 ? (
                        <Link to={'/u/quiz/' + parseInt(lessonData.level)}>
                            <Button>Start Quiz</Button>
                        </Link>
                    ) : (
                            loading ? (
                                <Button>Loading</Button>
                            ): (
                                <Button action={updateExp}>Next Lesson</Button>
                            )
                    )
                }

            </section>
        </ClientLayout>
    )
}

