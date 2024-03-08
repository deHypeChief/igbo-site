import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { SignIn, SignUp } from "./pages/auth";
import TeacherPopUp from "./pages/teacher";
import StudentDashboard from "./pages/student/dashboard";
import Topics from "./pages/student/topics";
import Lesson from "./pages/student/lesson";
import Quiz from "./pages/student/quiz";
import AdminAuth from "./pages/admin/adminAuth";
import Admin from "./pages/admin/adminBoard";
import Pricing from "./pages/student/pricing";

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' >
                        <Route index element={<Home />}/>
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/teacher' element={<TeacherPopUp />} />
                        <Route path='/demo/:id' element={<Quiz/>}/>
                    </Route>

                    <Route path='/u'>
                        <Route index element={<StudentDashboard />} />
                        <Route path='/u/topics' element={<Topics />} />
                        <Route path='/u/lesson/:id' element={<Lesson/>}/>
                        <Route path='/u/quiz/:id' element={<Quiz/>}/>
                        <Route path="/u/pricing" element={<Pricing/>}/>
                    </Route>

                    <Route path='/admin'>
                        <Route index element={<AdminAuth />} />
                        <Route path='/admin/dashboard' element={<Admin/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}