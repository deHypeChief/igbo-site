import { Button } from "../components/button/button";
import '../assets/styles/teacher.css'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import imgThecher from "./../assets/images/IMG-20240224-WA0011.jpg"
export default function TeacherPopUp(props) {


    return (
        <>
            <div className="teahPop" id="teachPop">
                <div className="teachWrap">
                    <h2>About the Tutor</h2>
                    <div className="tutorImg">
                        <img src={imgThecher} alt="" />
                    </div>
                    <h1>Mrs Nneka Agu</h1>
                    <p>Discover the new possibility in the way she approaches Igbo learning. She is a well seasoned instructor with a vast knowledge in Igbo learning</p>
                    <div className="tutorBttnWrap">
                        <Link to={'/u/pricing'}>
                            <Button>Get Tutor</Button>
                        </Link>
                        <Button action={props.action}>Home</Button>
                    </div>
                </div>
            </div>
        </>
    )
}