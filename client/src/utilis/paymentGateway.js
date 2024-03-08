import PayazaCheckout from "@payaza/web-sdk";
import {v1} from 'uuid'
const uuidV1 = v1();


export function paymentHandler(email, phoneNumber, firstName, lastName, price, transRef) {
    return new PayazaCheckout({
        merchant_key: "PZ78-PKLIVE-F27F32E5-6866-4D55-8A8A-19A71D57E8D7",
        connection_mode: "Live", // Live || Test
        checkout_amount: Number(parseInt(price)),
        currency_code: "USD", 
        email_address: email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        transaction_reference: `${transRef}-${uuidV1}`,
        onClose: function () {
            console.log("Closed")
        },
        callback: function (callbackResponse) {
            console.log(callbackResponse)
        }
    })
}


