import { Link } from 'react-router-dom'
import '../../assets/styles/topics.css'
import { Button } from '../../components/button/button'
import Navbar from '../../components/navbar/navbar'
import { ClientLayout } from '../../components/layout/layout'
import { getUser, getUserData, userSigned } from '../../utilis/authManger'
import { useEffect, useState } from 'react'

export default function Topics() {
    const [lesson, setLesson] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        getUser("/user/me", userSigned().token).then((data) => {
            // console.log(data);
            setUser(data.data.data, userSigned().token)
        })
        document.getElementById("dasboardTitle").innerText = "Topics"
        getUserData('/lesson/').then((data) => {
            // console.log(data.data.data);
            setLesson(data.data.data)
        })

    }, [])

    const objective = [
        (
            <>
                <ul>
                    <li>Objetive One</li>
                </ul>
            </>
        ),

    ]

    return (
        <ClientLayout>
            <section className="topicWrap">
                {
                    user ? (
                        lesson.map((item, index) => {
                            if (item.level == user.level) {
                                return (
                                    <div key={item.level} className="topicBox">
                                        <div className="card-topic">
                                            <div className="card-info-top">
                                                <h2 className="level-topic">
                                                    level {item.level}
                                                </h2>
                                                {index >= 0 && index < 4 ? (<h2>  Beginner Level</h2>) : (
                                                    index >= 4 && index < 8 ? <h2> Intermediate Level</h2> : (
                                                        index >= 8 ? <h2> Advanced Level </h2> : <></>
                                                    )
                                                )}
                                            </div>
                                            <br />
                                            <h1 className="title-topic">
                                                {item.title}
                                            </h1>
                                            <p className="pah-topic">
                                                Get your bacis solid by learning the
                                                basiscs of Igbo
                                            </p>
                                        </div>
                                        <br />
                                        <Link to={"/u/lesson/" + item.level}>
                                            <Button>Start Lesson</Button>
                                        </Link>
                                    </div>
                                )
                            } else {
                                if (item.level > user.level) {
                                    return (
                                        <div key={item.level} className="topicBox">
                                            <div className="card-topic">
                                                <div className="card-info-top">
                                                    <h2 className="level-topic">
                                                        level {item.level}
                                                    </h2>
                                                    {index >= 0 && index < 4 ? (<h2>  Beginner Level</h2>) : (
                                                        index >= 4 && index < 8 ? <h2> Intermediate Level</h2> : (
                                                            index >= 8 ? <h2> Advanced Level </h2> : <></>
                                                        )
                                                    )}
                                                </div>
                                                <br />
                                                <h1 className="title-topic">
                                                    {item.title}
                                                </h1>
                                                <p className="pah-topic">
                                                    Get your bacis solid by learning the
                                                    basiscs of Igbo
                                                </p>
                                            </div>
                                            <br />
                                            <Button>Locked</Button>
                                        </div>
                                    )
                                } else {
                                    if (item.level < user.level) {
                                        return (
                                            <div key={item.level} className="topicBox">
                                                <div className="card-topic">
                                                    <div className="card-info-top">
                                                        <h2 className="level-topic">
                                                            level {item.level}
                                                        </h2>
                                                        {index >= 0 && index < 4 ? (<h2>  Beginner Level</h2>) : (
                                                            index >= 4 && index < 8 ? <h2> Intermediate Level</h2> : (
                                                                index >= 8 ? <h2> Advanced Level </h2> : <></>
                                                            )
                                                        )}
                                                    </div>
                                                    <br />
                                                    <h1 className="title-topic">
                                                        {item.title}
                                                    </h1>
                                                    <p className="pah-topic">
                                                        Get your bacis solid by learning the
                                                        basiscs of Igbo
                                                    </p>
                                                </div>
                                                <br />
                                                <Link to={"/u/lesson/" + item.level}>
                                                    <Button>Lesson Done</Button>
                                                </Link>
                                            </div>
                                        )
                                    }
                                }
                            }
                        })
                    ) : (
                        lesson?.map((item, index) => {
                            return (
                                <>
                                    <div key={item.level} className="topicBox">
                                        <div className="card-topic">
                                            <div className="card-info-top">
                                                <h2 className="level-topic">
                                                    level {item.level}
                                                </h2>
                                                {index >= 0 && index < 4 ? (<h2>  Beginner Level</h2>) : (
                                                    index >= 4 && index < 8 ? <h2> Intermediate Level</h2> : (
                                                        index >= 8 ? <h2> Advanced Level </h2> : <></>
                                                    )
                                                )}
                                            </div>
                                            <br />

                                            <h1 className="title-topic">
                                                {item.title}
                                            </h1>
                                            <p className="pah-topic">
                                                Get your bacis solid by learning the
                                                basiscs of Igbo
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    )
                }


            </section>
        </ClientLayout>
    )
}