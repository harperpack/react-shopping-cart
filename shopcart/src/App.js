import React, { useState, useEffect } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/database';

import "rbx/index.css";
import {Column } from 'rbx';

import Sidebar from "react-sidebar";

import CartHeader from './CartHeader.js';
import CartPane from './CartPane.js';
import Header from './PageHeader.js';
import Pane from './ItemPane.js';
import getCostString from './getCostString.js';

const firebaseConfig = {
  apiKey: "AIzaSyAtoMUvXMS2hE8bDmWt2iMjPY7QlLRhRrI",
  authDomain: "react-shop-cart.firebaseapp.com",
  databaseURL: "https://react-shop-cart.firebaseio.com",
  projectId: "react-shop-cart",
  storageBucket: "react-shop-cart.appspot.com",
  messagingSenderId: "221872793920",
  appID: "1:221872793920:web:c2d43a0e2eea2c9e",
};

// QUESTIONS FOR RIESBECK
// 1. How do I wait until the Firebase has fetched before I use its data? 
// 4. How to format for mobile?
// 3. How can I change the margin on price?
// 4. how exactly does the () => func work?
// #. Why do we no longer declare function(){}?
// #. Was there a better way to AddtoCart?
// #. Why didn't my ? operator work for button switching?
// #. Why was the upper left corner such a nightmare?
// 5. Why does Travis say I'm still failing?
// 6. Why do I have these security vulnerabilities?
// 7. Why do we put spaces between words and curly braces?

// inventory minus what's in the cart - can't checkout until we have space for everything

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref();

const App = () => {
    const [visible, setVisible] = useState(false);
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState({});
    const [stock, setStock] = useState({});
    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) {
                let data = snap.val();
                setItems(data["products"]);
                setStock(data["inventory"]);
//                console.log("HERE IS ITEMS");
//                console.log(items);
//                console.log("HERE IS THE SNAP VAL");
//                console.log(snap.val());
//                console.log("HERE IS INVENTORY");
//                console.log(stock);
            }
        }
        db.on('value', handleData, error => alert(error));
        return () => { db.off('value', handleData); };
        }, []);
    const checkoutCart = () => {
        if (cart.length === 0) {
            alert('Please add items to your cart in order to checkout.')
            return;
        }
        firebase.database().ref("/inventory").on("value", snap => {
            if (snap.val()) {
                let curStock = snap.val();
                let newCart = cart.slice();
                let unfulfilled = newCart.filter(item => {
                        let cartQuant = item["quantity"];
                        let s = item["availableSizes"];
                        let sku = item["sku"].toString();
                        let curQuant = curStock[sku][s];
                        return(cartQuant > curQuant);
                    });
                let fulfilled = newCart.filter(item => unfulfilled.indexOf(item) === -1);
                let totalCost = getCostString(fulfilled.reduce(
                                function(acc, item){return acc + item.price * item.quantity}, 0));
                if (unfulfilled.length > 0) {
                    let names = unfulfilled.map(prod => prod.title);
                    alert('Due to inventory shortages, only part of your order was completed.');
                    alert('The following items were excluded from your purchase: ' + names);
                    alert('Your account was only charged $' + totalCost);
                } else {
                    alert('Thank you for your purchase!  Your account was charged $' + totalCost);
                }
                setCart([]);
            }
        }, error => {
            console.log('Error')
        });  
    };
    const itemInCart = checkItem => {
        if (cart.length === 0) {
            return -1
        } else {
            for (let x = 0; x < cart.length; x++) {
                if (cart[x].sku === checkItem.sku && 
                    cart[x].availableSizes === checkItem.availableSizes) {
                    return x
                }
            }
            return -1
        }
    };
    const addItem = (item) => {
        let newCart = cart.slice();
        let cartIndex = itemInCart(item);
        if (cartIndex >= 0) {
            newCart[cartIndex].quantity++;
        } else {
            item.quantity = 1;
            newCart.push(item);
        }
        updateStock(item, 'adding');
        setCart(newCart);
        setVisible(true);
    };
    const removeItem = (item) => {
        let newCart = cart.slice();
        let cartIndex = itemInCart(item);
        newCart[cartIndex].quantity--;
        if (newCart[cartIndex].quantity === 0) {
            newCart.splice(cartIndex, 1);
        }
        updateStock(item, 'removing');
        setCart(newCart);
    };
    const updateStock = (item, spec) => {
        let newStock = Object.assign({}, stock);
        let sku = item["sku"];
        let s = item["availableSizes"];
        if (spec === 'adding') {
            newStock[sku][s]--;
        } else if (spec === 'removing') {
            newStock[sku][s]++;
        }
        setStock(newStock);
    };
    return(
    <div>
        <Sidebar 
            sidebar=<div className="side-s">
                    <CartHeader close={() => setVisible(false)} items={cart} checkout={() => checkoutCart()}/>
                    {cart.map(item => <CartPane prod={item} delItem={(i) => removeItem(i)} key={item["sku"] + item["availableSizes"]}/>)} 
                    </div>
            open={visible} 
            pullRight={true}>
        </Sidebar>
        <Header cart={cart} open={visible} unfurl={() => setVisible(true)}/>
        <Column.Group multiline>
            { Object.keys(items).map(product => 
                <Pane product={ items[product] } 
                      key={items[product].sku} addProd={(i) => addItem(i)} sizes={stock[product]} />) 
            }
        </Column.Group>
    </div>
    )
};

export default App;
