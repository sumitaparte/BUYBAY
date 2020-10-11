import React, { Component } from 'react'
import PayButtom from './PayButtom'
import PaymentCard from './PaymentCard'
import PaymentHead from "./PaymentHead";

export default class Upgrade extends Component {
    render() {
        return (
            <div>
                <PaymentHead/>
                <PaymentCard/>
                <PayButtom/>
            </div>
        )
    }
}
