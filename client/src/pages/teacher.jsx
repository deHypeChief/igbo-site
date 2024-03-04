import { Button } from "../components/button/button";
import '../assets/styles/teacher.css'
import { Link } from "react-router-dom";
export default function TeacherPopUp() {
    return (
        <>
            <div className="teahPop">
                <div className="teachWrap">
                    <h2>About the Tutor</h2>
                    <div className="tutorImg"></div>
                    <h1>Mrs John Doe</h1>
                    <p>Discover the new possibility in the way she approaches Igbo learning. She is a well seasoned instructor with a vast knowledge in Igbo learning</p>
                    <div className="tutorBttnWrap">
                        <Button>Get Tutor</Button>
                        <Link to={'/'}><Button>Home</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}