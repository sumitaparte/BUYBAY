import React, { Component } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import "./css/Payment.css"
import "./css/Pay.css"

// Author Jasper Jiao
class CheckoutForm extends Component {
    state = {
        succeeded: false,
        error: null,
        processing: "",
        disabled: true,
        clientSecret: "",
    };

    componentDidMount() {
        // Create PaymentIntent as soon as the page loads
        //change http://localhost:5000 to heroku develop root
        axios
            .post("https://csci5709-a4-webgroup18.herokuapp.com/payment-api/create-payment-intent", {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
            })
            .then((res) => {
                this.setState({ clientSecret: res.data.clientSecret });
            });
    }

    handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        this.setState({ disabled: event.empty });
        this.setState({ error: event.error ? event.error.message : "" });
    };

    handleSubmit = async (ev) => {
        ev.preventDefault();
        this.setState({ processing: true });
        const { stripe, elements } = this.props;

        const payload = await stripe.confirmCardPayment(this.state.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: ev.target.name.value,
                },
            },
        });

        if (payload.error) {
            this.setState({ error: `Payment failed ${payload.error.message}` });
            this.setState({ processing: false });
        } else {
            this.setState({ error: null });
            this.setState({ processing: false });
            this.setState({ succeeded: true });
        }
        setTimeout( () => {
            this.props.history.push("/home")
        }
    ,5000);}


    render() {
        const cardStyle = {
            style: {
                base: {
                    color: "#32325d",
                    fontFamily: "Arial, sans-serif",
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#32325d",
                    },
                },
                invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                },
            },
        };

        const { processing, disabled, succeeded, error } = this.state;

        return (
            <form id="payment-form" onSubmit={this.handleSubmit}>
                <CardElement
                    id="card-element"
                    options={cardStyle}
                    onChange={this.handleChange}
                />
                <button disabled={processing || disabled || succeeded} id="submit" style={{background: '#5469d4',
                    fontFamily: 'Arial, sans-serif',
                    color: '#ffffff',
                    borderRadius: '0 0 4px 4px',
                    border: 0,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    fontWeight: 600,
                    //cursor: 'pointer',
                    display: 'block',
                    //transition: all 0.2s ease;
                    //box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07),
                    width: '100%',}}>
                  <span id="button-text">
                    {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
                  </span>
                </button>
                {/* Show any error that happens when processing the payment */}
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                {/* Show a success message upon completion */}
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded, see the result in your
                    <a href={`https://dashboard.stripe.com/test/payments`}>
                        {" "}
                        Stripe dashboard.
                    </a>{" "}
                    Refresh the page to pay again.
                </p>
            </form>
        );
    }
}

export default withRouter(CheckoutForm);