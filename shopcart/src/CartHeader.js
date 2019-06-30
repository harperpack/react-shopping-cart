import React from 'react';
import './App.css';

import "rbx/index.css";
import { Button, Notification, Title, Level } from 'rbx';

import getCostString from './getCostString.js';

const showCheckout = (user, checkout) => (
    user !== null ? <Button fullwidth color="warning" onClick={() => checkout()}>CHECKOUT</Button> : <Button fullwidth disabled color="dark" onClick={() => checkout()}>PLEASE SIGN IN TO CHECKOUT</Button>
);

const CartHeader = ({ close, items, checkout, user }) => (
    <div className="cartHead">
        <Notification color="dark">
            <Level>
                <Level.Item align="left">
                    <Title textColor="warning">SUBTOTAL</Title>
                </Level.Item>
                <Level.Item align="right">
                    <Title textColor="warning">
                        ${getCostString(items.reduce(
                                function(acc, item){return acc + item.price * item.quantity}, 0))}
                    </Title>
                </Level.Item>
            </Level>
            <Button.Group>
                <Button fullwidth outlined color="warning" onClick={() => close()}>CLOSE CART</Button>
                {showCheckout(user, checkout)}
            </Button.Group>
        </Notification>
    </div>
);

export default CartHeader;