import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";


const CheckOutform = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const[transactionId,setTransactionId]= useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart,refetch] = useCart();
    const{user}=useAuth();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
      if(totalPrice>0){
        axiosSecure.post("/create-payment-intent", { price: totalPrice })
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
      }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log("payment method", error);
            setError(error.message)

        }
        if (paymentMethod) {
            console.log("payment method", paymentMethod);
            setError("")
        }

        //confirm payment
        const {paymentIntent, error:cardConfirmError} =await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if(cardConfirmError){
            console.log("confirm error", cardConfirmError)
        }
        else{
            console.log("paymentIntent", paymentIntent)
            if (paymentIntent.status==="succeeded"){
                console.log('transaction Id',paymentIntent.id )
                setTransactionId(paymentIntent.id)

                //now save the payment in the database

                const payment={
                    email:user.email,
                    price:totalPrice,
                    transactionId:paymentIntent.id,
                    date: new Date(),//utc date convert. use moment js
                    cartIds: cart.map(item=> item._id),
                    menuItemIds: cart.map(item=>item.menuId),
                    status:"pending"
                }

                const res= await axiosSecure.post("/payments", payment)
                console.log('payment saved',res);
                refetch();
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Done Successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }

            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}>

            </CardElement>
            <button type="submit" className="btn btn-sm btn-primary mt-4" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
          { transactionId && <p className="text-green-600">Your Transaction Id: {transactionId}</p> }
        </form>
    );
};

export default CheckOutform;