/* eslint-disable react/prop-types */
import '../../assets/styles/admin/admin.css'
import { Icon } from '@iconify/react';
import logo from '../../assets/images/logo/learn_igbo_logo.svg'
import mainLady from '../../assets/images/IMG-20240224-WA0011.jpg'
import { useEffect, useState } from 'react';
import { adminGet, adminSigned, adminPost, adminLogOut } from '../../utilis/authManger';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navTo = useNavigate()
    const [dashboardTitle, setDashboardTitle] = useState("Overview")
    const [userData, setUserData] = useState()
    const [lessonData, setLessonData] = useState([])
    const [testData, setTestData] = useState([])


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('admin')).token
        adminGet('/user/ad/users', token)
            .then((data) => {
                setUserData(data.data.data)
            }).catch((error) => {
                if (error.response.status == 401) {
                    navTo('/admin')
                    adminLogOut()
                }
            })

        adminGet('/lesson/ad/lessons', token)
            .then((data) => {
                setLessonData(data.data.data)
            })

        adminGet('/test/ad/test', token)
            .then((data) => {
                setTestData(data.data.data)
            })

    })

    function handleSideButton(e) {
        const otherButtons = document.getElementsByClassName("sActive")

        for (let item = 0; item < otherButtons.length; item++) {
            const element = otherButtons[item];
            element.classList.remove("sActive")
        }

        e.target.classList.add("sActive")
        setDashboardTitle(e.target.children[1].innerText)
    }


    return (
        <>
            <div className="adminBoard">
                <div className="screenNotSuported">
                    <h1>
                        Screen size is not supported
                    </h1>
                    <p>Use a laptop for editing lessons</p>
                </div>

                <div className="SideBar">
                    <div className="sideBar">
                        <div className="logoSection">
                            <img src={logo} alt="" />
                        </div>
                        <div className="sideButtons">
                            <div className="sbutton sActive" onClick={handleSideButton}>
                                <div className="sImage">
                                    <Icon icon="ic:round-dashboard" style={{ fontSize: '20px' }} />
                                </div>
                                <p>Overview</p>
                            </div>
                            <div className="sbutton" onClick={handleSideButton}>
                                <div className="sImage">
                                    <Icon icon="solar:user-bold" style={{ fontSize: '20px' }} />
                                </div>
                                <p>Users</p>
                            </div>
                            <div className="sbutton" onClick={handleSideButton}>
                                <div className="sImage">
                                    <Icon icon="iconoir:book-solid" style={{ fontSize: '20px' }} />
                                </div>
                                <p>Lessons</p>
                            </div>
                            <div className="sbutton" onClick={handleSideButton}>
                                <div className="sImage">
                                    <Icon icon="flowbite:pen-solid" style={{ fontSize: '20px' }} />
                                </div>
                                <p>Excerises</p>
                            </div>
                            <div className="sbutton" onClick={handleSideButton}>
                                <div className="sImage">
                                    <Icon icon="ic:outline-payments" style={{ fontSize: '20px' }} />
                                </div>
                                <p>Payments</p>
                            </div>
                            {/* <div className="sbutton" onClick={handleSideButton}>
                                <div className="sImage">
                                    <Icon icon="material-symbols:admin-panel-settings-rounded" style={{ fontSize: '20px' }} />
                                </div>
                                <p>Admin</p>
                            </div> */}

                        </div>
                    </div>
                </div>
                <div className="WorkSpace">
                    <div className="utitlsBar">
                        <div className="workIntro">
                            <h1>{dashboardTitle}</h1>
                            <p>Welcome back, Admin</p>
                        </div>
                        <div className="utilsWrap">
                            <div className="search">
                                <input type="text" placeholder='Search' />
                            </div>
                            <div className="currentUser">
                                <img src={mainLady} alt="" />
                            </div>
                        </div>
                    </div>
                    {
                        dashboardTitle == "Overview" && userData && lessonData && testData ? <Overview userPayload={userData} lessonPayload={lessonData} exePayload={testData} /> :
                            (dashboardTitle === "Users" ? <Users userPayload={userData} lessonPayload={lessonData} exePayload={testData} /> :
                                dashboardTitle === "Lessons" ? <Lesson lessonPayload={lessonData} /> :
                                    dashboardTitle === "Excerises" ? <Excerises exePayload={testData} /> :
                                        dashboardTitle === "Payments" ? <Payments exePayload={testData} /> : "Loading resources...")
                    }
                </div>
            </div>
        </>
    )
}


function Overview(props) {
    const { userPayload, lessonPayload, exePayload } = props

    return (
        <>

            <div className="overWrap">

                <div className="leftOver">

                    <div className="topSection">
                        <div className="shadowBox tSection special">
                            <h2>Total Users</h2>
                            <h1>{userPayload ? userPayload.length : " loading..."}</h1>
                        </div>
                        <div className="shadowBox tSection">
                            <h2>Total Lessons</h2>
                            <h1>{lessonPayload ? lessonPayload.length : " loading..."}</h1>
                        </div>
                        <div className="shadowBox tSection">
                            <h2>Total Excerises</h2>
                            <h1>{exePayload ? exePayload.length : "loading..."}</h1>
                        </div>
                    </div>

                    <div className="topUsersLevel">
                        <div className="topQuickInfo">
                            <h2>User Rankings</h2>
                            <p>
                                Take a glance at your top performing students
                            </p>
                        </div>
                        <div className="rankBox">

                            {
                                userPayload.map((item, index) => {
                                    if (index < 3) {
                                        return (
                                            <div key={'rank-' + index} className="shadowBox rBox">
                                                <div className="rPofile">
                                                </div>
                                                <div className="rProfilSub">
                                                    <div className="rProfileBox">
                                                        <p className="rName">{item.name}</p>
                                                        <p className="rEmail">{item.email}</p>
                                                    </div>
                                                    <div className="rLvl">
                                                        <Icon icon="noto:1st-place-medal" style={{ fontSize: "40px" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>

                    <div className="baseModule">
                        <div className="topQuickInfo">
                            <h2>Students Activites</h2>
                            <p>
                                Overview of students activites on the site
                            </p>
                        </div>

                        <div className="shadowBox baseStat">
                            <div className="topNames">
                                <div className="baseBox-name bS-name">
                                    <p>Student Name</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Level</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Exp</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Rank</p>

                                </div>
                                <div className="baseBox-name">
                                    <p>Status</p>
                                </div>
                            </div>
                            <br />
                            <div className="listStats-base">

                                {
                                    userPayload.map((item, index) => {
                                        return (
                                            <div key={'stu' + index} className="listStats">
                                                <div className="baseBox-name bS-name">
                                                    <p>{item.name}</p>
                                                </div>
                                                <div className="baseBox-name">
                                                    <p>{item.level}</p>
                                                </div>
                                                <div className="baseBox-name">
                                                    <p>{item.exp}</p>
                                                </div>
                                                <div className="baseBox-name gold">
                                                    <Icon icon="noto:1st-place-medal" style={{ fontSize: "30px" }} />
                                                </div>
                                                <div className="baseBox-name greenA">
                                                    <p>Active</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
function Users(props) {
    const { userPayload, lessonPayload, exePayload } = props
    return (
        <>
            <div className="topSection">
                <div className="shadowBox tSection special">
                    <h2>Total Users</h2>
                    <h1>{userPayload ? userPayload.length : " loading..."}</h1>
                </div>
                <div className="shadowBox tSection">
                    <h2>Total Lessons</h2>
                    <h1>{lessonPayload ? lessonPayload.length : " loading..."}</h1>
                </div>
                <div className="shadowBox tSection">
                    <h2>Total Excerises</h2>
                    <h1>{exePayload ? exePayload.length : "loading..."}</h1>
                </div>
            </div>

            <br />
            <br />
            <br />
            <div className="userList">
                <div className="topQuickInfo">
                    <h2>All Students</h2>
                    <p>
                        Take a glance at your top performing students
                    </p>
                </div>
                <div className="shadowBox baseStat">

                    <div className="topNames">
                        <div className="baseBox-name bS-name">
                            <p>Student Name</p>
                        </div>
                        <div className="baseBox-name bs-mail">
                            <p>Email</p>

                        </div>
                        <div className="baseBox-name">
                            <p>Level</p>
                        </div>
                        <div className="baseBox-name">
                            <p>Exp</p>
                        </div>

                        <div className="baseBox-name">
                            <p>Rank</p>

                        </div>
                    </div>
                    <br />

                    <div className="listStats-base">
                        {
                            userPayload.map((item) => {
                                return (
                                    <>
                                        <div key={item} className="listStats">
                                            <div className="baseBox-name bS-name">
                                                <p>{item.name}</p>
                                            </div>
                                            <div className="baseBox-name bs-mail">
                                                <p>{item.email}</p>
                                            </div>
                                            <div className="baseBox-name">
                                                <p>{item.level}</p>
                                            </div>
                                            <div className="baseBox-name">
                                                <p>{item.exp}</p>
                                            </div>


                                            <div className="baseBox-name gold">
                                                <p>Gold</p>

                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </>
    )
}
function Lesson(props) {
    const [isUpdate, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const { lessonPayload } = props
    function closeForm() {
        clearEditor()
    }
    function openExeEditor() {
        clearEditor()
        document.getElementById("lessonEditor").style.display = "flex"
    }


    const editorTools = [
        {
            type: "H1",
            action: () => { createBlock("h1", "Main header") }
        },
        {
            type: "H2",
            action: () => { createBlock("h2", "Sub header") }
        },
        {
            type: "P",
            action: () => { createBlock("p", "Text") }
        }
    ]

    function createBlock(type, text) {
        const element = document.createElement(type)
        const absTools = document.getElementById("abs-Tools")


        element.classList.add('ri-Blocks')
        element.contentEditable = true
        element.innerText = text
        document.getElementById("ri-Editor").append(element)


        let x = element.offsetLeft
        let y = element.offsetTop
        let elementHeight = element.clientHeight
        let offset = 8
        absTools.style.top = `${y + elementHeight + offset}px`
        absTools.style.right = `${x}px`

        element.addEventListener('click', (e) => {

            let x = e.target.offsetLeft
            let y = e.target.offsetTop
            let elementHeight = e.target.clientHeight
            let offset = 8

            absTools.style.top = `${y + elementHeight + offset}px`
            absTools.style.right = `${x}px`
        })
    }

    async function saveLesson() {
        let documentData = []
        setLoading(true)
        const Body = document.getElementById('ri-Editor').children
        console.log(Body);

        for (let i = 1; i < Body.length; i++) {
            const element = Body[i];
            let tags = {
                type: element.localName,
                content: element.innerText
            }

            documentData.push(tags)
        }

        await adminPost('lesson/ad/createLesson', {
            title: document.getElementById('lessonTitle-editor').value,
            level: parseInt(document.getElementById('lessonLevel-editor').value),
            note: JSON.stringify(documentData)
        }, adminSigned().token).then((data) => {
            setLoading(false)
            alert("Lesson Uplaoded")
            clearEditor()
            console.log(data);
        }).catch((error) => {
            alert(error.response.data.message)
        })
    }

    function clearEditor() {
        document.getElementById('lessonTitle-editor').value = "";
        document.getElementById('lessonLevel-editor').value = "";

        const editorContent = document.getElementById("ri-Editor").children;
        for (let i = 1; i <= editorContent.length; i++) {
            const element = editorContent[i];
            console.log(element, "removed");
            element.parentNode.removeChild(element);

            if (i === editorContent.length) {
                document.getElementById("lessonEditor").style.display = "none"
            }
        }
    }

    function OpenCreatedLesson(getLevel) {
        setUpdate(true)
        console.log(getLevel);
        openExeEditor()

        const targetLesson = lessonPayload[getLevel -= 1]
        let obj

        document.getElementById('lessonTitle-editor').value = targetLesson.title;
        document.getElementById('lessonLevel-editor').value = targetLesson.level;

        eval('obj = ' + targetLesson.note)
        obj.forEach((item) => {
            console.log(item);
            createBlock(item.type, item.content)
        })

        console.log(obj);

    }

    async function handleUpdate() {
        setLoading(true)
        let documentData = []
        const Body = document.getElementById('ri-Editor').children
        console.log(Body);

        for (let i = 1; i < Body.length; i++) {
            const element = Body[i];
            let tags = {
                type: element.localName,
                content: element.innerText
            }

            documentData.push(tags)
        }

        await adminPost('lesson/ad/updatelesson', {
            level: parseInt(document.getElementById('lessonLevel-editor').value),
            newNote: JSON.stringify(documentData)
        }, adminSigned().token).then((data) => {
            setLoading(false)
            alert("Lesson Updated")
            clearEditor()
            console.log(data);
        }).catch((error) => {
            alert(error.response.data.message)
        })
    }

    function submitAction(e) {
        e.preventDefault()
        isUpdate ? handleUpdate() : saveLesson()
    }


    return (
        <>
            <div className="lessonWrap">
                <div className="lessonLeft">
                    <div className="userList">

                        <div className="shadowBox baseStat">

                            <div className="topNames">
                                <div className="baseBox-name bS-name-lesson">
                                    <p>Title</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Module</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Action</p>
                                </div>
                            </div>
                            <br />

                            <div className="listStats-base">
                                {
                                    lessonPayload.map((item, index) => {
                                        return (
                                            <>
                                                {index === 0 ? (<h2>Beginner Level</h2>) : (
                                                    index === 5 ? <h2>Intermediate Level</h2> :(
                                                        index === 9 ? <h2>Advanced Level </h2> : <></>
                                                    )
                                                )}
                                                <div key={'ex' + index} className="listStats" onClick={() => { OpenCreatedLesson(item.level) }}>
                                                    <div className="baseBox-name bS-name-lesson">
                                                        <p>{item.title}</p>
                                                    </div>
                                                    <div className="baseBox-name">
                                                        <p>{item.level}</p>
                                                    </div>

                                                    <div className="baseBox-name">
                                                        <Icon icon="ic:baseline-delete" />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <button className="createLeesonBttn" onClick={openExeEditor}>
                Create Lesson
            </button>


            <div className="lesson-editor" id='lessonEditor'>
                <form className="lessonWrap-editor" onSubmit={submitAction}>
                    <div className="lessonTop">
                        <div className="exrText">
                            <h1>Lesson Editor</h1>
                            <p>Create and manage your lessons to engage your students</p>
                        </div>
                        <div className="icoRExe" onClick={closeForm}>
                            <Icon icon="mingcute:close-fill" width="1.2em" height="1.2em" />
                        </div>
                    </div>
                    <br />
                    <div className="formHeaderInputSec">
                        <input type="text" placeholder='Lesson Title' required id='lessonTitle-editor' />
                        <input type="text" placeholder='Lesson Level' required id='lessonLevel-editor' />
                    </div>


                    <div className="lessonEditorBox" id="editorjs-container">
                        <div className="ri-Editor" id="ri-Editor">

                            <div className="abs-Tool" id="abs-Tools">
                                {
                                    editorTools.map((item) => {
                                        return (
                                            <div key={item.type} onClick={item.action} className="abs-too-block">
                                                <p>{item.type}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>

                        <button>{
                            loading ? "Submitting..." : (
                                isUpdate ? "Update Lesson" : "Save Lesson"
                            )
                        }</button>
                    </div>
                </form>
            </div>
        </>
    )
}
function Excerises(props) {
    const { exePayload } = props
    const [quizCount, setQuizCount] = useState(2)
    // const [avLesson, setAvLesson] = useState()

    useEffect(() => {
    }, [])

    const formPayload = {
        testType: "",
        questions: "",
        xp: 0,
        lesson: 0
    }

    function closeForm() {
        document.getElementById("lessonEditor").style.display = "none"
    }
    function openExeEditor() {
        document.getElementById("lessonEditor").style.display = "flex"
    }

    function handleQuestion(e) {
        e.preventDefault()
        const htmForm = document.getElementById("quizFormWrap")
        const htmlString = `
        <div class="qusetionBlock">
            <div class="bl">
                <p>Question ${quizCount}</p>
                <input type="text" />
            </div>
            
            <div class="bl">
                <p>Answers|  Seprate answers with commas, max of FOUR answers</p>
                <input type="text" />
            </div>
            <div class="bl">
                <p>Correct Answer</p>
                <input type="text" />
            </div>

        </div>
        `
        htmForm.insertAdjacentHTML('beforeend', htmlString)
        setQuizCount(prevCount => prevCount + 1)
    }


    const exceriseGroup = []

    function handleSubmit(e) {
        e.preventDefault()
        const formData = e.target

        for (let i = 0; i < formData.length - 2; i += 3) {

            if (i >= 3) {
                const groupObj = {
                    question: formData[i].value,
                    options: formData[i + 1].value,
                    correctAnswer: formData[i + 2].value,
                };

                // Append the object to the groupedData array
                exceriseGroup.push(groupObj);
            } else {
                formPayload.testType = formData[i + 1].value
                formPayload.lesson = parseInt(formData[i + 2].value)
                formPayload.xp = parseInt(formData[i].value)
            }
        }
        formPayload.questions = JSON.stringify(exceriseGroup)

        adminPost("test/ad/createTest", formPayload, adminSigned().token)
            .then((data) => {
                console.log(data);
                alert("Exersice Created")
                clearEditor()
            }).catch((error) => {
                alert(error.response.data.message);
            })
    }

    function clearEditor() {
        document.getElementById('quizLevel').value = "";
        document.getElementById('quizMark').value = "";
        document.getElementById('quizType').value = "Select Level";
        document.getElementById('que-exe').value = "";
        document.getElementById('cor-exe').value = "";
        document.getElementById('opp-exe').value = "";


        setQuizCount(2)
        let editorContent = document.getElementById("quizFormWrap").children;
        for (let i = 1; i < editorContent.length; i++) {
            const element = editorContent[i];
            console.log(element);

            element.parentNode.removeChild(element);
        }
        document.getElementById("lessonEditor").style.display = "none"
    }

    return (
        <>
            <div className="lessonWrap">
                <div className="lessonLeft">
                    <div className="userList">

                        <div className="shadowBox baseStat">

                            <div className="topNames">
                                <div className="baseBox-name bS-name-lesson">
                                    <p>Lesson</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Type</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Exp</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Action</p>
                                </div>
                            </div>
                            <br />

                            <div className="listStats-base">
                                {
                                    exePayload.map((item, index) => {
                                        return (
                                            <div key={"exe" + index} className="listStats">
                                                <div className="baseBox-name bS-name-lesson">
                                                    <p>{item.lesson}</p>
                                                </div>
                                                <div className="baseBox-name">
                                                    <p>{item.testType}</p>
                                                </div>
                                                <div className="baseBox-name">
                                                    <p>{item.xp}</p>
                                                </div>
                                                <div className="baseBox-name">
                                                    <Icon icon="ic:baseline-delete" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <button className="createLeesonBttn" onClick={openExeEditor}>
                Create Exercise
            </button>
            <div className="lessonEditor" id='lessonEditor'>
                <div className="editor editorExe">
                    <div className="topexe">
                        <div className="exrText">
                            <h1>New Exercise</h1>
                            <p>Add the questions and the relivant answers to create an exercise</p>
                        </div>
                        <div className="icoRExe" onClick={closeForm}>
                            <Icon icon="mingcute:close-fill" width="1.2em" height="1.2em" />
                        </div>
                    </div>

                    <br />
                    <form action="" id={'quizFrom'} onSubmit={handleSubmit}>
                        <div className="formHeaderInputSec">
                            <input type="text" id={"quizMark"} placeholder='Marks for the Quiz' />

                            <select required id="quizType" name="" >
                                <option value="Select Level" id='LessonType'>Select Exercise Type</option>
                                <option value="quiz">Quiz</option>
                                <option value="assigment">Assigment</option>
                            </select>
                            <input type="text" id={"quizLevel"} placeholder='Level of the Quiz' />

                        </div>

                        <div id="quizFormWrap">
                            <div className="qusetionBlock">
                                <div className="bl">
                                    <p>Question 1</p>
                                    <input type="text" id="que-exe" />
                                </div>

                                <div className="bl">
                                    <p>Answers|  Seprate answers with commas, max of FOUR answers</p>
                                    <input type="text" id="opp-exe" />
                                </div>
                                <div className="bl">
                                    <p>Correct Answer</p>
                                    <input type="text" id="cor-exe" />
                                </div>

                            </div>
                        </div>

                        <div className="formExAction">
                            <button className="addQuestion" onClick={handleQuestion}>
                                Add Question
                            </button>
                            <button className="submitEx" type='submit'>
                                Done
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

function Payments(props) {
    const { exePayload } = props

    return (
        <>
            <div className="lessonWrap">
                <div className="lessonLeft">
                    <div className="userList">

                        <div className="shadowBox baseStat">

                            <div className="topNames">
                                <div className="baseBox-name bS-name-lesson">
                                    <p>Payment Type</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Email</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Paid For</p>
                                </div>
                                <div className="baseBox-name">
                                    <p>Amount</p>
                                </div>
                            </div>
                            <br />

                            <div className="listStats-base">
                                {
                                    exePayload.map((item, index) => {
                                        return (
                                            <div key={"exe" + index} className="listStats">
                                                <div className="baseBox-name bS-name-lesson">
                                                    <p>{item.lesson}</p>
                                                </div>
                                                <div className="baseBox-name">
                                                    <p>{item.testType}</p>
                                                </div>
                                                <div className="baseBox-name">
                                                    <p>{item.xp}</p>
                                                </div>
                                                <div className="baseBox-name">
                                                    <Icon icon="ic:baseline-delete" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}