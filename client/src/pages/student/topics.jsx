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

                {
                    lesson.map((item) => {
                        return (
                            <div key={item.level} className="topicBox">
                                <div className="card-topic">
                                    <h2 className="level-topic">
                                        level {item.level}
                                    </h2>
                                    <h1 className="title-topic">
                                        {item.title}
                                    </h1>
                                    <p className="pah-topic">
                                        Get your bacis solid by learning the
                                        basiscs of Igbo
                                    </p>
                                </div>
                                <Link to={"/u/lesson/" + item.level}>
                                    <Button>Start Lesson</Button>
                                </Link>
                            </div>
                        )
                    })
                }
                

            </section>
        </ClientLayout>
    )
}