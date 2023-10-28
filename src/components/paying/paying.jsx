import React, {useContext} from 'react'
import Paypalpayment from "../paypal";
import {Amount} from "../paycontext/paycontext";
import "./paying.css";
const Paying = () => {
    const { projectid, amount } = useContext(Amount);
  return (<div className='paying-content'>
    <p>The amount is: <u>{amount}</u> $</p>
    <Paypalpayment id={projectid} amount={amount} />
    </div>
  )
}

export default Paying