import { useEffect, useState } from "react";
import { ClientLayout } from "../../components/layout/layout";
import './../../assets/styles/pricing.css'
import { paymentHandler } from "../../utilis/paymentGateway";
import { userSigned } from "../../utilis/authManger";
import { useNavigate } from "react-router-dom";

export default function Pricing() {

    const [toPayment, setToPayment] = useState(false)


    function handlePricing(paymentObject) {
        setToPayment(paymentObject)
    }

    const pricingList = [
        {
            image: "",
            title: "Group Coaching",
            pargh: `This is weekend class of 10-12
                    students for 3 months`,
            badges: [
                {
                    badgeImg: "",
                    badgeText: "1 hour per day"
                },
                {
                    badgeImg: "",
                    badgeText: "Zoom"
                }
            ],
            pricing: 38
        },
        {
            image: "",
            title: "1on1 Coaching",
            pargh: `For a personalized teaching class tailored to you for 6 weeks`,
            badges: [
                {
                    badgeImg: "",
                    badgeText: "30mins, 2 times a week"
                },
                {
                    badgeImg: "",
                    badgeText: "As preferred"
                }
            ],
            pricing: 100
        },
        {
            image: "",
            title: "Interactive Website",
            pargh: `For parent who require resources for engaging their children contains 12 modules for beginners`,
            badges: [
                {
                    badgeImg: "",
                    badgeText: "Subcription per Month"
                },
                {
                    badgeImg: "",
                    badgeText: "Online"
                }
            ],
            pricing: 10
        }
    ]

    return (
        <ClientLayout>

            <section className="pricing">

                {
                    !toPayment ? (
                        <>
                            <h1>Pricing</h1>

                            <div className="priceListWrap pricingTop">
                                {
                                    pricingList.map((item, index) => {
                                        return (
                                            <div key={"p-" + index} className="p-card p-card-group">
                                                <div className="p-card-top">
                                                    <div className="p-image"></div>
                                                    <h2 className="p-cardTitle">
                                                        {item.title}
                                                    </h2>
                                                    <p className="p-cardPargh">
                                                        {item.pargh}
                                                    </p>
                                                    <div className="p-badges">
                                                        {
                                                            item.badges.map((badge, indexB) => {
                                                                return (
                                                                    <div key={"badge" + indexB} className="badge-info">
                                                                        <div className="badgeIcon"></div>
                                                                        <p>{badge.badgeText}</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="p-price">
                                                    <h3 className="price">
                                                        ${item.pricing}
                                                    </h3>
                                                    <button onClick={() => {
                                                        handlePricing(item)
                                                    }}>
                                                        Get Service
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <br />
                            <h1>Other Services</h1>


                            <div className="priceListWrap otheServices-Pricing">
                                <div className="p-card">
                                    <div className="p-image"></div>
                                    <h2 className="p-cardTitle">
                                        Igbo E-books
                                    </h2>
                                    <p className="p-cardPargh">
                                        They are written in simple to read,
                                        everyday language
                                    </p>
                                    <div className="p-badges"></div>
                                    <div className="p-price">
                                        <h3 className="price">
                                            $10
                                        </h3>
                                        <button onClick={() => {
                                            handlePricing({
                                                title: "Igbo E-books",
                                                pargh: `They are written in simple to read,
                                                everyday language`,
                                                pricing: 10
                                            })
                                        }}>
                                            Get Service
                                        </button>
                                    </div>
                                </div>
                                <div className="p-card">
                                    <div className="p-image"></div>
                                    <h2 className="p-cardTitle">
                                        Engaging Videos
                                    </h2>
                                    <p className="p-cardPargh">
                                        For parents who require support
                                        for engaging their children
                                    </p>
                                    <div className="p-badges"></div>
                                    <div className="p-price">
                                        <h3 className="price">
                                            $2
                                        </h3>
                                        <button onClick={() => {
                                            handlePricing({
                                                title: "Engaging Videos",
                                                pargh: `For parents who require support
                                                for engaging their childrene`,
                                                pricing: 2
                                            })
                                        }}>
                                            Get Service
                                        </button>
                                    </div>
                                </div>
                                <div className="p-card">
                                    <div className="p-image"></div>
                                    <h2 className="p-cardTitle">
                                        Book a session for more details
                                    </h2>
                                    <br />
                                    <div className="p-book">
                                        <div className="p-info">
                                            <p>Via Whatsapp</p>
                                            <p>+234 </p>
                                        </div>
                                        <div className="p-info">
                                            <p>Via Instagram</p>
                                            <p>@learnigbo </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </>
                    ) : (
                        <MakePayment payAction={setToPayment} payObject={toPayment ? toPayment : {}} />
                    )
                }
            </section>

        </ClientLayout>
    )
}


function MakePayment(props) {
    const { payObject, payAction } = props

    const navTo = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        price: payObject.pricing
    })
    useEffect(() => {
        if (!userSigned()) {
            navTo('/signin')
        }0
    }, [])


    function handleInput(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const { email, firstName, lastName, phoneNumber, price } = formData
        console.log(formData);
        paymentHandler(email, firstName, lastName, phoneNumber, price, "test2").showPopup()
    }

    function closePayment(event) {
        event.preventDefault()

        alert("Are about to leave the payment page")
        payAction(false)
    }


    return (
        <div className="paymentPopUp">
            <form className="paymentWrap" onSubmit={handleSubmit}>
                <div className="payInfo">
                    <div className="infoSection">
                        <div className="productIcon"></div>
                        <h1 className="payTitle">
                            {payObject?.title}
                        </h1>
                        <p className="payDesText">
                            {payObject?.pargh}
                        </p>
                        <div className="p-badges">
                            <div className="badge-info">
                                <div className="badgeIcon"></div>
                                <p>Some needed text</p>
                            </div>

                        </div>


                    </div>
                    <div className="payaction">
                        <button>
                            Make Payment
                        </button>

                        <div className="payTotal">
                            <p>Total</p>
                            <h1>${payObject?.pricing}</h1>
                        </div>
                    </div>
                </div>

                <div className="infoForm">
                    <h2>Persoanl Info</h2>
                    <div className="PayInputWrap">
                        <input type="text" name="firstName" onChange={handleInput} value={formData.firstName} required placeholder="First Name" />
                        <input type="text" name="lastName" onChange={handleInput} value={formData.lastName} required placeholder="Last Name" />
                        <input type="text" name="email" onChange={handleInput} value={formData.email} required placeholder="Email Address" />
                        <input type="text" name="phoneNumber" onChange={handleInput} value={formData.phoneNumber} required placeholder="Phone Number" />
                    </div>
                    <br /><br />
                    <div className="payaction">
                        <button onClick={closePayment}>
                            Cancel Payment
                        </button>

                    </div>
                </div>


            </form>
        </div>
    )
}