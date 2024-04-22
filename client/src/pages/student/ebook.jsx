import { Link } from "react-router-dom";
import { Button } from "../../components/button/button";
import { ClientLayout } from "../../components/layout/layout";
import '../../assets/styles/ebook.css'

export default function Ebook() {
    return (
        <ClientLayout>
            <section className="ebook">
                <div className="textSection">
                    <h1>
                        Get Your Ebook Now
                    </h1>
                    <h2>
                        For an amazing price give your kids materials needed to improve your Igbo skills
                    </h2>
                    <br />
                    <Link to="/u/pricing">
                        <Button>View Pricing</Button>
                    </Link>
                </div>

                <div className="ebook-imgSection">

                </div>

            </section>
        </ClientLayout>
    )
}