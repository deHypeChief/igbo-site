import '../../assets/styles/quiz.css'
import { useState } from "react"
import { Button } from "../../components/button/button"
import successImg from "../../assets/images/9486910-removebg-preview 1.png"
import { Link, useParams } from "react-router-dom"
import { ClientLayout } from "../../components/layout/layout"

export default function Quiz() {
    const [passed, setPassed] = useState(null)
    const { id } = useParams()

    const [questions, setQuestions] = useState([
        {
            que: "what is iri abuo",
            correctAns: "12",
            answers: [
                "12",
                "40",
                "15",
                "30"
            ]
        },
        {
            que: "what is iri abuo",
            correctAns: "12",
            answers: [
                "12",
                "40",
                "15",
                "30"
            ]
        },
        {
            que: "what is iri abuo",
            correctAns: "12",
            answers: [
                "12",
                "40",
                "15",
                "30"
            ]
        },
        {
            que: "what is iri abuo",
            correctAns: "12",
            answers: [
                "12",
                "40",
                "15",
                "30"
            ],
        }
    ])

    let userAns = []
    let correct_ans = 0


    function GetAns(ans, id) {
        userAns.push(ans)
        document.getElementById(id).style.display = "none"
        console.log(userAns, document.getElementById(id).id);
        if (userAns.length == questions.length) {

            console.log("done");
            questions.forEach((data, index) => {
                if (data.correctAns == userAns[index]) {
                    correct_ans += 1
                }
            })
            if (correct_ans == questions.length) {
                setPassed(true)
            } else {
                setPassed(false)
            }

        }
    }

    return (
        <ClientLayout>


            {passed ? <Success id={id} /> : (
                passed == false ? <Failed id={id} /> : <></>
            )}
            <section className="quiz">
                {
                    questions.map((items, indexMain) => {
                        let rads = []
                        let indexNum = indexMain
                        return (
                            <div key={"quz" + indexMain} id={"quz" + indexMain} className="quizInfo">
                                <div className="quizTopSection">
                                    <h2>Question {indexMain += 1}</h2>
                                    <h1>{items.que}</h1>
                                </div>
                                <div className="quizOptions">
                                    {
                                        items.answers.map((ans, index) => {
                                            do {
                                                let radNumber = Math.floor(Math.random() * items.answers.length)

                                                if (rads.includes(radNumber)) {
                                                    radNumber = Math.floor(Math.random() * items.answers.length)
                                                } else {
                                                    rads.push(radNumber)
                                                    return <Button action={() => { GetAns(items.answers[radNumber], "quz" + indexNum) }} key={"ans" + index}>{items.answers[radNumber]}</Button>
                                                }
                                            } while (rads.length < 4);
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }

            </section>
        </ClientLayout>
    )
}

function Success(props) {
    const { id } = props

    return (
        <>
            <section className="qBox">
                <div className="qBoxWrap">
                    <img src={successImg} alt="" />
                    <h1>Hurray You Won</h1>
                    <p>Nice job lets move
                        over to the next lesson</p>
                    <Link to="/u/topics">
                        <Button>Next Lesson</Button>
                    </Link>
                </div>
            </section>
        </>
    )
}

function Failed(props) {
    const { id } = props
    return (
        <>
            <section className="qBox">
                <div className="qBoxWrap">
                    <img src={successImg} alt="" />
                    <h1>Omo Serious Mess up</h1>
                    <p>Y fee try again</p>
                    <div className="qButtons">
                        <Link to={'/u/quiz/' + id}>
                            <Button>Try Again</Button>
                        </Link>
                        <Link to={"/u/lesson/" + id}>
                            <Button>Retake Lesson</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}