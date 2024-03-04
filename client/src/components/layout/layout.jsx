import Navbar from "../navbar/navbar"
import './style.css'

export function ClientLayout(props) {
    return (
        <>
            <main className="ClientLayout">
                <div className="backlay">


                </div>
                <Navbar />
                {props.children}
            </main>
        </>
    )
}

export function AdminLayout(props) {
    return (
        <main className="AdminLayout">
            {props.children}
        </main>
    )
}