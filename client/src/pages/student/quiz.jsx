/* eslint-disable react/prop-types */
import '../../assets/styles/quiz.css'
import { useEffect, useRef, useState } from "react"
import { Button } from "../../components/button/button"

import successImg from "../../assets/images/9486910-removebg-preview 1.png"
import failImg from "../../assets/images/9479419-removebg-preview 1.png"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ClientLayout } from "../../components/layout/layout"
import { getUser, postUser, postUserData, userSigned } from '../../utilis/authManger'

import old from "../../assets/images/old_igbo_man_da7737e6-18aa-4cbb-af3f-7f4ac8120bbd-removebg-preview.png"
import successImg1 from "../../assets/images/a_cartoon_Igbo__f22b054e-e1b7-4124-bc0b-6e0c09990fdf-removebg-preview.png"
import successImg2 from "../../assets/images/a_happy_little__596c32f0-ff9d-445b-8399-011f4cf18db3-removebg-preview.png"

let failedQuestions = []

export default function Quiz() {
    const [passed, setPassed] = useState(null)
    const { id } = useParams()
    const navTo = useNavigate()

    const [questions, setQuestions] = useState([])
    const [test, setTest] = useState([])
    const moveBar = useRef()

    let userAns = []
    let correct_ans = 0

    useEffect(() => {

        if (userSigned().token) {
            getUser("/user/me", userSigned().token).then((data) => {
                if (data.data.data.level > parseInt(id)) {
                    // alert("You have passed this level")
                    navTo("/u")
                }
            })
        }

        postUserData('/test/testLevel', { level: id }).then((data) => {
            setTest(data.data.data)
            setQuestions(JSON.parse(data.data.data.questions))
        })
    }, [])

    function GetAns(ans, idTarget) {
        userAns.push(ans)
        moveBar.current.style.width = `${(userAns.length / questions.length) * 100}%`
        document.getElementById(idTarget).style.display = "none"

        if (userAns.length === questions.length) {
            // console.log("done");
            questions.forEach((data, index) => {
                if (data.correctAnswer.toLowerCase().trim() === userAns[index].toLowerCase().trim()) {
                    correct_ans += 1
                }
                else {
                    failedQuestions.push({
                        questionNum: index,
                        questionData: questions[index],
                        selectedAnswer: userAns[index]
                    })
                }
                // console.log(data.correctAnswer.toLowerCase().trim(),"/",userAns[index].toLowerCase().trim(), correct_ans);
            })
            if (correct_ans == questions.length) {
                console.log(id);
                if (parseInt(id) > 1) {
                    // console.log("bong");
                    postUser("/user/exp", { exp: test.xp }, userSigned().token).then(() => {
                        setPassed(true)
                    })
                } else {
                    setPassed(true)
                }
            } else {
                // console.log(failedQuestions); //On complete show an array of all question failed
                setPassed(false)
            }

        }
    }
    return (
        <ClientLayout>


            {passed ? <Success id={id} /> : (
                passed == false ? <Failed id={id} questionTotal={questions.length} failedList={failedQuestions} /> : <></>
            )}
            <section className="quiz">
                <div className="quizBar">
                    <div className="quizLength">
                        <div className="moveBar" ref={moveBar}>
                            <div className="moveShadow"></div>
                        </div>
                    </div>
                </div>
                {
                    questions.map((items, indexMain) => {
                        let rads = []
                        let indexNum = indexMain
                        return (
                            <div key={"quz" + indexMain} id={"quz" + indexMain} className="quizInfo">

                                {
                                    items.imageUrl == "" || items.imageUrl == "-" ? (
                                        <></>
                                    ) : (
                                        <div className="imageSectionQuiz">
                                            <img src={items.imageUrl} alt="quizImage" />
                                        </div>
                                    )
                                }
                                <div className="quizOtherInfo">
                                    <div className="quizTopSection">
                                        <h2>Question {indexMain += 1}</h2>
                                        <h1>{items.question}</h1>
                                    </div>
                                    <div className="quizOptions">
                                        {
                                            items.options.split(",").map((ans, index) => {
                                                do {
                                                    let radNumber = Math.floor(Math.random() * items.options.split(",").length)

                                                    if (rads.includes(radNumber)) {
                                                        radNumber = Math.floor(Math.random() * items.options.split(",").length)
                                                    } else {
                                                        rads.push(radNumber)
                                                        return <Button action={() => { GetAns(items.options.split(",")[radNumber], "quz" + indexNum) }} key={"ans" + index}>{items.options.split(",")[radNumber]}</Button>
                                                    }
                                                } while (rads.length < 4);
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </section>
        </ClientLayout >
    )
}

function Success(props) {
    const { id } = props

    return (
        <>
            <section className="qBox">
                <div className="imgSucessPerson">
                    <img className='im-left' src={successImg1} alt="" />
                    <img className="im-right" src={successImg2} alt="" />
                </div>
                <div className="qBoxWrap">
                    <img src={successImg} alt="" />
                    {
                        parseInt(id) === 1 ? (
                            <>
                                <h1>Hurray You Won</h1>
                                <p>Improve your igbo skill by creating an account </p>
                                <Link to="/signup">
                                    <Button>Create an Account</Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <h1>Hurray You Won</h1>
                                <p>Nice job lets move
                                    over to the next lesson</p>
                                <Link to="/u/topics">
                                    <Button>Next Lesson</Button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </section>
        </>
    )
}

function Failed(props) {
    const { id, questionTotal, failedList } = props
    return (
        <>
            <section className="qBox">
                {/* <div className="imgSucessPerson">
                    <img className='im-fail' src={old} alt="" />
                </div> */}

                <div className="qBoxWrap">
                    <div className="fWrap">
                        <br />
                        <img src={failImg} alt="" />
                        {
                            parseInt(id) == 1 ? (
                                <>
                                    <h1>You Lost</h1>
                                    <p>Create an account to improve your igbo skills </p>
                                    <div className="qButtons">
                                        <Link to={"/signup"}>
                                            <Button>Learn Igbo</Button>
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1>You Lost</h1>
                                    <p>Try harder next time</p>
                                    <div className="qButtons">
                                        <Link to={"/u/lesson/" + id}>
                                            <Button>Retake Lesson </Button>
                                        </Link>
                                    </div>
                                </>
                            )
                        }
                    </div>

                    <div className="questionFailed">
                        <div className="fHeader">
                            <h2>Questions Failed</h2>
                            <p className='fpara'>You failed {failedList.length} out of {questionTotal}.</p>
                        </div>
                        {
                            failedList.map((item, index) => {
                                return (
                                    <div key={index + "failedQuest"} className="block">
                                        <p>Question {item.questionNum + 1}</p>
                                        <h2>
                                            {item.questionData.question}?
                                        </h2>
                                        <p className='wrongBlock'>You selected: {item.selectedAnswer}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


            </section>


        </>
    )
}
