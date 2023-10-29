import React, { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';

const PayPalButton = (props) => {
  const navigate = useNavigate();
  const [show,setShow] = useState(false);

  const createOrder = (data) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${localStorage.getItem("fund-token")}`,
      },
      credentials: "include",
      body: JSON.stringify({ id: props.id, amount: Number(props.amount) }),
    })
      .then((response) => { return response.json();})
      .then((order) => {
        if (order.id) {
          return order.id;
        } else {
          throw new Error("Order creation failed");
        }
      });
  };

  const onApprove = (data) => {
    return fetch(`$${process.env.REACT_APP_BASE_URL}/api/orders/${data.orderID}/capture/${props.id}/${props.amount}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${localStorage.getItem("fund-token")}`,
      },
      credentials: "include",
    })
      .then((response) => {
        setShow(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
        return response.json()});
  };

  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
     {show? <p style={{color:"green"}}>Done Successfully!</p>:null}
    </div>
  );
};

export default PayPalButton;
