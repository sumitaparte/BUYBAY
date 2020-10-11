import React, { Component } from 'react'
import {Button, Nav} from "react-bootstrap";

export default class PayButton extends Component {
    render() {
        return (
            <div class="paybuttons" style = {{transform: 'translate(63rem, -8rem)'}}>
                {/*<input class="paybutton" type="submit" name="submit" value="Process and Pay" />*/}
                <Nav.Link href="/payment"><Button className="navbarbtn" type="submit">Process and Pay</Button></Nav.Link>
            </div>
        )
    }
}
