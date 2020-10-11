import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./css/Pay.css";

//Author Jasper Jiao

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.
// const stripePromise = loadStripe(
//   "pk_test_51H8aQ9IGlOWie6gERUA3ulgLxyospXwLLfPcCbLoVfdwPOLfXeB3eQseTtOTeJ9bTQsXgQDE28dMhc8Fw3JYcF5D00EPxzb9mn"
// );
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const InjectedCheckoutForm = () => (
    <ElementsConsumer>
        {({ stripe, elements }) => (
            <CheckoutForm stripe={stripe} elements={elements} />
        )}
    </ElementsConsumer>
);

export default class Pay extends Component {
    render() {
        return (
            <div className="form-pay" style = {{transform: 'translate(24rem, -2rem)'}}>
                <Elements stripe={stripePromise}>
                    <InjectedCheckoutForm />
                </Elements>
            </div>
        );
    }
}
