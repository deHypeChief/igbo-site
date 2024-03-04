/* eslint-disable react/prop-types */
import '../../assets/styles/admin/admin.css'
import { Icon } from '@iconify/react';
import logo from '../../assets/images/logo/learn_igbo_logo.svg'
import mainLady from '../../assets/images/IMG-20240224-WA0011.jpg'
import { useEffect, useRef, useState } from 'react';
import { adminGet, adminSigned, adminPost } from '../../utilis/authManger';
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
    }, [])

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
                                    <Icon icon="material-symbols:admin-panel-settings-rounded" style={{ fontSize: '20px' }} />
                                </div>
                                <p>Admin</p>
                            </div>
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
                        dashboardTitle == "Overview" && userData && lessonData && testData ? <Overview userPayload={userData} lessonPayload={lessonData} /> :
                            (dashboardTitle === "Users" ? <Users userPayload={userData} /> :
                                dashboardTitle === "Lessons" ? <Lesson lessonPayload={lessonData} /> :
                                    dashboardTitle === "Excerises" ? <Excerises exePayload={testData} /> : "Loading resources")
                    }
                </div>
            </div>
        </>
    )
}


function Overview(props) {
    const { userPayload, lessonPayload } = props

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
                            <h1>20</h1>
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
    const { userPayload } = props
    return (
        <>
            <div className="topSection">
                <div className="shadowBox tSection special">
                    <h2>Total Users</h2>
                    <h1>{userPayload ? userPayload.length : " loading..."}</h1>
                </div>
                <div className="shadowBox tSection">
                    <h2>Total Lessons</h2>
                    <h1>{userPayload ? userPayload.length : " loading..."}</h1>
                </div>
                <div className="shadowBox tSection">
                    <h2>Total Excerises</h2>
                    <h1>20</h1>
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
                        <div className="baseBox-name bs-button-user">
                            <p></p>
                        </div>
                    </div>
                    <br />

                    <div className="listStats-base">
                        {
                            userPayload.map((item) => {
                                return (
                                    <>
                                        <div className="listStats">
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
                                            <div className="baseBox-name bs-button-user">
                                                <button>View Student</button>
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


import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';

function Lesson(props) {
    const editorRef = useRef(null);

    function closeForm() {
        document.getElementById("lessonEditor").style.display = "none"
        cleanupEditor
    }
    function openExeEditor() {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: 'editorjs-container',
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: ['marker', 'link']
                    }
                },
                placeholder: 'Let`s write an awesome story!'
            });
        }
        document.getElementById("lessonEditor").style.display = "flex"
    }


    const cleanupEditor = () => {
        if (editorRef.current && editorRef.current.destroy) {
            editorRef.current.destroy();
        }
    };


    const handleSave = async () => {
        try {
            const savedData = await editorRef.current.save();
            console.log('Content saved:', savedData);
            // Here you can handle the JSON data, e.g., send it to the server, store it in state, etc.
        } catch (error) {
            console.error('Save failed:', error);
        }
    };


    const { lessonPayload } = props
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
                                    <p>Lesson</p>
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
                                    lessonPayload.map((item, index) => {
                                        return (
                                            <div key={'ex' + index} className="listStats">
                                                <div className="baseBox-name bS-name-lesson">
                                                    <p>{item.title}</p>
                                                </div>
                                                <div className="baseBox-name">
                                                    <p>{item.level}</p>
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
                Create Lesson
            </button>


            <div className="lesson-editor" id='lessonEditor'>
                <div className="lessonWrap-editor">
                    <div className="lessonTop">
                        <div className="lessTopInfp">
                            <h1>Lesson Title</h1>
                            <p>Level 1</p>
                        </div>
                        <div className="icoRExe" onClick={closeForm}>
                            <Icon icon="mingcute:close-fill" width="1.2em" height="1.2em" />
                        </div>
                    </div>
                    <div className="lessonEdit" id='editorjs-container'></div>
                    <div className="lessonAction">
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}



function Excerises(props) {
    const { exePayload } = props
    const [quizCount, setQuizCount] = useState(2)
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
        console.log(formPayload);
        adminPost("test/ad/createTest", formPayload, adminSigned().token)
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
                            <input type="text" placeholder='Marks for the Quiz' />

                            <select name="" >
                                <option value="Select Level" id='LessonType'>Select Exercise Type</option>
                                <option value="quiz">Quiz</option>
                                <option value="assigment">Assigment</option>
                            </select>
                            <select name="">
                                <option value="Select Level" id='lessonLevel'>Select Level</option>
                                <option value="1">Level 1</option>
                                <option value="2">Level 1</option>
                                <option value="3">Level 1</option>
                            </select>
                        </div>

                        <div id="quizFormWrap">
                            <div className="qusetionBlock">
                                <div className="bl">
                                    <p>Question 1</p>
                                    <input type="text" />
                                </div>

                                <div className="bl">
                                    <p>Answers|  Seprate answers with commas, max of FOUR answers</p>
                                    <input type="text" />
                                </div>
                                <div className="bl">
                                    <p>Correct Answer</p>
                                    <input type="text" />
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