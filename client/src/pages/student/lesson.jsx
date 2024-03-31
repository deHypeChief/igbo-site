import '../../assets/styles/lesson.css'
import { ClientLayout } from "../../components/layout/layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, postUser, postUserData, userSigned } from "../../utilis/authManger";
import { Button } from "../../components/button/button";


import lessonHuman1 from '../../assets/images/a_cartoon_Igbo__f22b054e-e1b7-4124-bc0b-6e0c09990fdf-removebg-preview.png'
import lessonHuman2 from '../../assets/images/a_happy_little__596c32f0-ff9d-445b-8399-011f4cf18db3-removebg-preview.png'

export default function Lesson() {
    const [lessonData, setLessonData] = useState({
        level: "loading lessons",
        title: "--",
        note: "--"
    })
    const [noteData, setNoteData] = useState([])
    const [loading, setLoading] = useState(false)
    const [plan, setPlan] = useState(null)
    const [data, setData] = useState()

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
                setData(data.data.data)
            })


            postUserData('/lesson/oneLesson', { level: id }).then((data) => {
                eval('obj = ' + data.data.data.note)
                setNoteData(SplitLesson(obj, 9))
                setLessonData(data.data.data)
                document.getElementById("dasboardTitle").innerText = data.data.data.title 
            }).catch(error => {
                console.log(error);
            })
        }
    }, [])

    function SplitLesson(data, chunkSize) {
        const chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }
        return chunks;
    }

    function TrailPropmt() {
        return (
            <>
                <div className="trialBox">
                    <div className="trialBox-mail">
                        <h1>Unlock the level</h1>
                        <p>Level is locked to access the level upgrade your plan</p>
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

    const radImage = [
        lessonHuman1,
        lessonHuman2
    ]
    function updateExp() {
        setLoading(true)
        if(parseInt(id) >= data.level){
            postUser("/user/exp", { exp: 200 }, userSigned().token).then(() => {
                setLoading(false)
                navTo('/u/topics')
            })
        }else
        {       
            navTo('/u/topics')
        }
    }

    return (
        <ClientLayout>
            {plan === "Trial" && parseInt(lessonData.level) >= 3 ? <TrailPropmt /> : <></>}
            <section className="lessons">

                <div className="lessonBoxArea">
                    <div className="lessonInfoArea">

                        {
                            noteData?.map((item, index) => {
                                return (
                                    <div className='lessonNoteWrap' key={"note" + index} id={"note" + index} >
                                        <div className="lessonTextSection">
                                            <div className="lessonTextArea">
                                                {
                                                    item?.map((text, textIndex) => {
                                                        return (
                                                            <text.type className={text.type + "note"} key={"text" + textIndex}>{text.content}</text.type>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="lessonActionButton">
                                            {
                                                index == 0 ? <></> : (
                                                    <Button action={
                                                        ()=>{
                                                            console.log(`note${parseInt(index) - 1}`);
                                                            document.getElementById(`note${parseInt(index) - 1}`).style.display = "block"
                                                        }
                                                    }>
                                                        Back
                                                    </Button>
                                                )
                                            }

                                            <Button state={loading} action={() => {
                                                if (index < noteData.length - 1) {
                                                    document.getElementById("note" + index).style.display = "none"
                                                } else {
                                                    if (id === "4" || id === "8" || id === "12") {
                                                        navTo("/u/quiz/" + id)
                                                    } else {
                                                        updateExp()
                                                    }
                                                }
                                            }}>
                                                {loading ? "loading..." : (
                                                    index < noteData.length - 1 ? "Next" : (
                                                        id === "4" || id === "8" || id === "12" ? "Take Quiz" : "Next Lesson"
                                                    )
                                                )}
                                            </Button>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="lessonHuman">
                        <img src={radImage[Math.floor(Math.random() * radImage.length)]} alt="" />
                    </div>
                </div>

            </section>
        </ClientLayout>
    )
}

