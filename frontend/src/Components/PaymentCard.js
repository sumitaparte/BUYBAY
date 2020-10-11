import React, { Component } from 'react'
//import "../css/Payment.css"

export default class PaymentCard extends Component {
    render() {
        return (
            <div class="payment-container">
                <div class="payment-card">
                    <div class="payment-plan">
                        1 Year Plan
                    </div>
                    <div class="patment-sign">
                        CAD$
                    </div>
                    <div class="payment-amount">
                        3.99
                    </div>
                </div>

                <div class="payment-card">
                    <div class="payment-plan">
                        3 Month Plan
                    </div>
                    <div class="patment-sign">
                        CAD$
                    </div>
                    <div class="payment-amount">
                        6.99
                    </div>
                </div>


                <div class="payment-card">
                    <div class="payment-plan">
                        1 Month Plan
                    </div>
                    <div class="patment-sign">
                        CAD$
                    </div>
                    <div class="payment-amount">
                        9.99
                    </div>
                </div>
            </div>
        )
    }
}
