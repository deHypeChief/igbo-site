import { Link } from 'react-router-dom'
import '../../assets/styles/topics.css'
import { Button } from '../../components/button/button'
import Navbar from '../../components/navbar/navbar'
import { ClientLayout } from '../../components/layout/layout'
import { getUserData } from '../../utilis/authManger'
import { useEffect, useState } from 'react'

export default function Topics() {
    const [lesson, setLesson] = useState([])

    useEffect(() => {
        document.getElementById("dasboardTitle").innerText = "Topics"
        getUserData('/lesson/').then((data) => {
            console.log(data.data.data);
            setLesson(data.data.data)
        })
    }, [])

    return (
        <ClientLayout>
            <section className="topicWrap">
                <div className="moveBttns">
                    <div className="topicMove_bttn disabled"></div>
                </div>
                <div className="topicArea">
                    {
                        lesson.map((item, index) => {
                            return (
                                <>
                                    <div key={"less" + index} className="topicInfo">
                                        <h2>Level {index += 1}</h2>
                                        <h1>
                                            {item.title}
                                        </h1>
                                        <p>Get your bacis solid by learning the
                                            basiscs of Igbo</p>
                                        <div className="topic-bttnWrap">
                                            <Link to={"/u/lesson/" + item.level}>
                                                <Button>Start Lesson</Button>
                                            </Link>
                                            <Link to={`/u/quiz/${item.level}`} >
                                                <Button>Take Quiz</Button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="topicSubComp"></div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="moveBttns">
                    <div className="topicMove_bttn"></div>
                </div>
            </section>
        </ClientLayout>
    )
}