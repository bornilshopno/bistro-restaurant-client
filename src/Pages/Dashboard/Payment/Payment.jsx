import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutform from "./CheckOutform";

const stripePromise= loadStripe (import.meta.env.VITE_Payment_Gateway_PK); //task balance
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please Pay to Eat"></SectionTitle>
            <h2 className="font-bold text-4xl text-center">Pay for your Items</h2>   
            <Elements stripe={stripePromise}>
                <CheckOutform></CheckOutform>
            </Elements>
        </div>
    );
};

export default Payment;