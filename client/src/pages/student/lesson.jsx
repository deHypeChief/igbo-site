import '../../assets/styles/lesson.css'
import { ClientLayout } from "../../components/layout/layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postUserData, userSigned } from "../../utilis/authManger";
import { Button } from "../../components/button/button";

export default function Lesson() {
    const [lessonData, setLessonData] = useState({
        level: "loading lessons",
        title: "--",
        note: "--"
    })
    const { id } = useParams()
    const navTo = useNavigate()
    useEffect(() => {
        if (!userSigned()) {
            navTo('/signin')
        } else {
            postUserData('/lesson/oneLesson', { level: id }).then((data) => {
                console.log(data.data.data);
                setLessonData(data.data.data)
                document.getElementById("dasboardTitle").innerText = data.data.data.title
            }).catch(error => {
                console.log(error);
            })
        }
    })

    return (
        <ClientLayout>
            <section className="lessons">
                <h2>Level {lessonData.level}</h2>
                <h1>
                    {lessonData.title}
                </h1>
                <div className="lessonBox">
                    {
                        lessonData.note.map((item, index)=>{
                            if(item.type === "h1"){
                                return(
                                    <h1 key={"a"+index}>{item.content}</h1>
                                )
                            }
                            if(item.type === "h2"){
                                return(
                                    <h2 key={"a"+index}>{item.content}</h2>
                                )
                            }
                            if(item.type === "p"){
                                return(
                                    <p key={"a"+index}>{item.content}</p>
                                )
                            }
                        })
                    }

                </div>
                <Link to={'/u/quiz/' + parseInt(lessonData.level) }>
                    <Button>Start Quiz</Button>
                </Link>

            </section>
        </ClientLayout>
    )
}