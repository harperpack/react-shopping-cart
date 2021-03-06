import React from 'react';
import './App.css';

import "rbx/index.css";
import { Button, Title, Image, Message } from 'rbx';

import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import SignIn from './Login.js';
import Welcome from './Welcome.js';

const TwoDigCart = ({ len }) => (
    <p className="cartFull">{len}</p>
);
         
const OneDigCart = ({ len }) => (
    <p className={len !== 0 ? "cartFull" : "cartEmp"}>&nbsp;&nbsp;{len}</p>
);
        
const Header = ({ cart, open, unfurl, user }) => (
    <div className={open !== true ? "header" : "open-h"}>
        <Button.Group>
            <div className="cartInfo" onClick={() => unfurl()}>
                <Button.Group>
                    <Image.Container size={64}>
                        <Image src="/data/cart-grey.png"/>
                    </Image.Container>
                    {cart.length > 9 ? 
                        <TwoDigCart len={cart.length}/> : 
                        <OneDigCart len={cart.length}/>}
                </Button.Group>
            </div>
            <Title>&nbsp;Unsightly Men's T-Shirts</Title>
            <Title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Title>
            { user ? <Welcome user={ user } /> : <SignIn /> }
        </Button.Group>
        <hr className="sep"/>
    </div>
);

export default Header;