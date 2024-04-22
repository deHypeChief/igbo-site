/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { ClientLayout } from "../../components/layout/layout";
import '../../assets/styles/ebook.css'
import './../../assets/styles/pricing.css'


import eImage from "../../assets/images/learnigbo_ebook_cover.jpg"
import { useEffect, useState } from "react";

export default function Ebook() {
    const [openPricing, setOpenPricing] = useState(false)
    useEffect(() => {
        document.getElementById("dasboardTitle").innerText = "Ebook Store"

    })
    return (
        <ClientLayout>
            {
                openPricing ? (
                    <Pricing close={setOpenPricing} />
                ) : (
                    <section className="ebook">
                        <div className="textSection">
                            <h1>
                                Get Your Ebook Now
                            </h1>
                            <h2>
                                For an amazing price give your kids the materials needed to improve your Igbo skills
                            </h2>
                            <br />
                            <Button action={() => { setOpenPricing(true) }}>Get Ebook</Button>
                        </div>

                        <div className="ebook-imgSection">
                            <img src={eImage} alt="" />
                        </div>

                    </section>
                )
            }


        </ClientLayout>
    )
}

function Pricing(props) {
    const { close } = props
    const [toPayment, setToPayment] = useState(false)

    function handlePricing(paymentObject) {
        setToPayment(paymentObject)
    }
    return (
        <>
            {
                !toPayment ? (
                    <section className="pricePop">
                        <div className="cloesBox" onClick={() => { close(false) }}>
                            <button>Close</button>
                        </div>
                        <div className="popSection">
                            <div className="p-card">
                                <div className="p-image">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 36 36"><path fill="#553788" d="M15 31c0 2.209-.791 4-3 4H5c-4 0-4-14 0-14h7c2.209 0 3 1.791 3 4z" /><path fill="#9266cc" d="M34 33h-1V23h1a1 1 0 1 0 0-2H10c-4 0-4 14 0 14h24a1 1 0 1 0 0-2" /><path fill="#ccd6dd" d="M34.172 33H11c-2 0-2-10 0-10h23.172c1.104 0 1.104 10 0 10" /><path fill="#99aab5" d="M11.5 25h23.35c-.135-1.175-.36-2-.678-2H11c-1.651 0-1.938 6.808-.863 9.188C9.745 29.229 10.199 25 11.5 25" /><path fill="#269" d="M12 8a4 4 0 0 1-4 4H4C0 12 0 1 4 1h4a4 4 0 0 1 4 4z" /><path fill="#55acee" d="M31 10h-1V3h1a1 1 0 1 0 0-2H7C3 1 3 12 7 12h24a1 1 0 1 0 0-2" /><path fill="#ccd6dd" d="M31.172 10H8c-2 0-2-7 0-7h23.172c1.104 0 1.104 7 0 7" /><path fill="#99aab5" d="M8 5h23.925c-.114-1.125-.364-2-.753-2H8C6.807 3 6.331 5.489 6.562 7.5C6.718 6.142 7.193 5 8 5" /><path fill="#f4900c" d="M20 17a4 4 0 0 1-4 4H6c-4 0-4-9 0-9h10a4 4 0 0 1 4 4z" /><path fill="#ffac33" d="M35 19h-1v-5h1a1 1 0 1 0 0-2H15c-4 0-4 9 0 9h20a1 1 0 1 0 0-2" /><path fill="#ccd6dd" d="M35.172 19H16c-2 0-2-5 0-5h19.172c1.104 0 1.104 5 0 5" /><path fill="#99aab5" d="M16 16h19.984c-.065-1.062-.334-2-.812-2H16c-1.274 0-1.733 2.027-1.383 3.5c.198-.839.657-1.5 1.383-1.5" /></svg>
                                </div>
                                <h2 className="p-cardTitle">
                                    Igbo E-book 1
                                </h2>
                                <p className="p-cardPargh">
                                    Easy to read everyday conversation in igbo with translation.
                                </p>
                                <div className="p-badges"></div>
                                <div className="p-price">
                                    <h3 className="price">
                                        $1.49
                                    </h3>
                                    <button onClick={() => {
                                        handlePricing({
                                            title: "Igbo E-book 1",
                                            pargh: `Easy to read everyday conversation in igbo with translation.`,
                                            pricing: 1.49,
                                            monthly: false
                                        })
                                    }}>
                                        Get Service
                                    </button>
                                </div>
                            </div>
                            <div className="p-card">
                                <div className="p-image">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 36 36"><path fill="#553788" d="M15 31c0 2.209-.791 4-3 4H5c-4 0-4-14 0-14h7c2.209 0 3 1.791 3 4z" /><path fill="#9266cc" d="M34 33h-1V23h1a1 1 0 1 0 0-2H10c-4 0-4 14 0 14h24a1 1 0 1 0 0-2" /><path fill="#ccd6dd" d="M34.172 33H11c-2 0-2-10 0-10h23.172c1.104 0 1.104 10 0 10" /><path fill="#99aab5" d="M11.5 25h23.35c-.135-1.175-.36-2-.678-2H11c-1.651 0-1.938 6.808-.863 9.188C9.745 29.229 10.199 25 11.5 25" /><path fill="#269" d="M12 8a4 4 0 0 1-4 4H4C0 12 0 1 4 1h4a4 4 0 0 1 4 4z" /><path fill="#55acee" d="M31 10h-1V3h1a1 1 0 1 0 0-2H7C3 1 3 12 7 12h24a1 1 0 1 0 0-2" /><path fill="#ccd6dd" d="M31.172 10H8c-2 0-2-7 0-7h23.172c1.104 0 1.104 7 0 7" /><path fill="#99aab5" d="M8 5h23.925c-.114-1.125-.364-2-.753-2H8C6.807 3 6.331 5.489 6.562 7.5C6.718 6.142 7.193 5 8 5" /><path fill="#f4900c" d="M20 17a4 4 0 0 1-4 4H6c-4 0-4-9 0-9h10a4 4 0 0 1 4 4z" /><path fill="#ffac33" d="M35 19h-1v-5h1a1 1 0 1 0 0-2H15c-4 0-4 9 0 9h20a1 1 0 1 0 0-2" /><path fill="#ccd6dd" d="M35.172 19H16c-2 0-2-5 0-5h19.172c1.104 0 1.104 5 0 5" /><path fill="#99aab5" d="M16 16h19.984c-.065-1.062-.334-2-.812-2H16c-1.274 0-1.733 2.027-1.383 3.5c.198-.839.657-1.5 1.383-1.5" /></svg>
                                </div>
                                <h2 className="p-cardTitle">
                                    Igbo E-book 2
                                </h2>
                                <p className="p-cardPargh">
                                    Easy to read everyday conversation in igbo with translation.
                                </p>
                                <div className="p-badges"></div>
                                <div className="p-price">
                                    <h3 className="price">
                                        $1.49
                                    </h3>
                                    <button onClick={() => {
                                        handlePricing({
                                            title: "Igbo E-book 2",
                                            pargh: `Easy to read everyday conversation in igbo with translation.`,
                                            pricing: 1.49,
                                            monthly: false
                                        })
                                    }}>
                                        Get Service
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <MakePayment payAction={setToPayment} payObject={toPayment ? toPayment : {}} />
                )
            }
        </>
    )
}

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { postUser, userSigned } from "../../utilis/authManger";

function MakePayment(props) {
    const { payObject, payAction } = props
    const [loading, setLoading] = useState()

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
        }
    }, [])


    const LiveFLW = "FLWPUBK-fa49406e32189f8acb64f52a17ad78ca-X"
    const TestFLW = "FLWPUBK_TEST-7d71b3dd5e9a92d9cbd29ddb66a61685-X"
    const f_KEY = LiveFLW

    // setup config for both normal and monthly pay
    const config = {
        public_key: f_KEY,
        tx_ref: Date.now(),
        amount: payObject?.pricing,
        currency: 'USD',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: formData.email,
            phone_number: formData.phoneNumber,
            name: `${formData.firstName} ${formData.lastName}`,
        },
        customizations: {
            title: payObject?.title,
            description: 'Payment for ' + payObject?.title,
        },
    }
    const configForMonthlyPay = {
        public_key: f_KEY,
        tx_ref: Date.now(),
        amount: payObject?.pricing,
        currency: 'USD',
        payment_options: "card",
        payment_plan: "63659",
        customer: {
            email: formData.email,
            phone_number: formData.phoneNumber,
            name: `${formData.firstName} ${formData.lastName}`,
        },
        customizations: {
            title: payObject?.title,
            description: `Payment for ${payObject?.title}`,
        },
    };


    // manage state based on the payment seleted
    const handleFlutterPayment = useFlutterwave(payObject.monthly ? configForMonthlyPay : config);

    function handleInput(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    // close payment modal
    function closePayment(event) {
        event.preventDefault()
        alert("Are about to leave the payment page")
        payAction(false)
    }


    return (
        <div className="paymentPopUp">
            <form className="paymentWrap" onSubmit={
                (e) => {
                    e.preventDefault()
                    setLoading(true)
                    handleFlutterPayment({
                        callback: (response) => {
                            console.log(response);
                            if (response.status == "successful") {
                                if (payObject.title === "Igbo E-book 1") {
                                    console.log("Download Ebook 1");
                                    let a = document.createElement('a');
                                    a.href = 'https://1drv.ms/b/s!AlRvf77wSjNDa5-K0W55UWBtiII?e=gdk6td';
                                    a.style.display = 'none';
                                    a.click();

                                    alert("Redirecting you to the ebook 1 site")
                                } else {
                                    if (payObject.title === "Igbo E-book 2") {
                                        console.log("Download Ebook 2");
                                        let a = document.createElement('a');
                                        a.href = 'https://1drv.ms/b/s!AlRvf77wSjNDcXTYqI_0kyQDwkk?e=d7u3Ye ';
                                        a.style.display = 'none';
                                        a.click();

                                        alert("Redirecting you to the ebook 2 site")
                                    } else {
                                        postUser("user/recPayment", { paymentType: payObject.title }, userSigned().token)
                                            .then((data) => {
                                                setLoading(false)
                                                alert("your payment was " + response.status)
                                                navTo("/u")
                                            })
                                    }
                                }
                            } else {
                                alert("Error making payment")
                            }
                            closePaymentModal() // this will close the modal programmatically
                        },
                        onClose: () => {
                            setLoading(false)
                        },
                    });
                }
            }>
                <div className="payInfo">
                    <div className="infoSection">
                        {/* <div className="productIcon"></div> */}
                        <h1 className="payTitle">
                            {payObject?.title}
                        </h1>
                        <p className="payDesText">
                            {payObject?.pargh}
                        </p>
                        <div className="p-badges">
                            <div className="badge-info">
                                <div className="badgeIcon"></div>
                                {/* <p>Some needed text</p> */}
                            </div>

                        </div>


                    </div>
                    <div className="payaction-n">


                        <div className="payTotal">
                            <p>Total</p>
                            <h1>${payObject?.pricing}</h1>
                        </div>
                    </div>
                </div>

                <div className="infoForm">
                    <h2>Personal Info</h2>
                    <div className="PayInputWrap">
                        <input type="text" name="firstName" onChange={handleInput} value={formData.firstName} required placeholder="First Name" />
                        <input type="text" name="lastName" onChange={handleInput} value={formData.lastName} required placeholder="Last Name" />
                        <input type="text" name="email" onChange={handleInput} value={formData.email} required placeholder="Email Address" />
                        <input type="text" name="phoneNumber" onChange={handleInput} value={formData.phoneNumber} required placeholder="Phone Number" />
                    </div>
                    <br /><br />
                    <div className="payaction-">
                        <div className="paySecButton">
                            <button>
                                {loading ? "loading..." : "Make Payment"}
                            </button>
                            <button onClick={closePayment}>
                                Cancel Payment
                            </button></div>

                    </div>
                </div>


            </form>
        </div>
    )
}