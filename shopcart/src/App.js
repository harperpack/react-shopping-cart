import React, { useState, useEffect } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/database';

import "rbx/index.css";
import { Button, Notification, Title, Box, Tile, Column, Image, Tag, Level, Delete } from 'rbx';

import Sidebar from "react-sidebar"

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


// what is state?
// > cart open/closed
// > what is in cart
// > 

firebase.initializeApp(firebaseConfig);

let allProducts = [];

firebase.database().ref("/products").on('value', snap => {
  if (snap.val()) {
    console.log('Success!');
    let allProducts = snap.val();
    console.log(allProducts);
  }
}, error => {
    console.log('Big sad');
});

let localItems = {"products": 
 {
  "12064273040195392": {
    "sku": 12064273040195392,
    "title": "Cat Tee Black T-Shirt",
    "description": "4 MSL",
    "availableSizes": ["S", "XS"],
    "style": "Black with custom print",
    "price": 10.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "51498472915966370": {
    "sku": 51498472915966370,
    "title": "Dark Thug Blue-Navy T-Shirt",
    "description": "",
    "availableSizes": ["M"],
    "style": "Front print and paisley print",
    "price": 29.45,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "10686354557628304": {
    "sku": 10686354557628304,
    "title": "Sphynx Tie Dye Wine T-Shirt",
    "description": "GPX Poly 1",
    "availableSizes": ["X", "L", "XL"],
    "style": "Front tie dye print",
    "price": 9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "11033926921508488": {
    "sku": 11033926921508488,
    "title": "Skuul",
    "description": "Training 2014",
    "availableSizes": ["X", "L", "XL", "XXL"],
    "style": "Black T-Shirt with front print",
    "price": 14,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "39876704341265610": {
    "sku": 39876704341265610,
    "title": "Wine Skul T-Shirt",
    "description": "",
    "availableSizes": ["X", "L"],
    "style": "Wine",
    "price": 13.25,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "10412368723880252": {
    "sku": 10412368723880252,
    "title": "Short Sleeve T-Shirt",
    "description": "",
    "availableSizes": ["XS", "X", "L", "ML", "XL"],
    "style": "Grey",
    "price": 75,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "8552515751438644": {
    "sku": 8552515751438644,
    "title": "Cat Tee Black T-Shirt",
    "description": "14/15 unnumbered",
    "availableSizes": ["X", "L", "XL", "XXL"],
    "style": "White with black stripes",
    "price": 10.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "18644119330491310": {
    "sku": 18644119330491310,
    "title": "Sphynx Tie Dye Grey T-Shirt",
    "description": "14/15 unnumbered",
    "availableSizes": ["X", "L", "XL", "XXL"],
    "style": "Black with white stripes",
    "price": 10.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "11854078013954528": {
    "sku": 11854078013954528,
    "title": "Danger Knife Grey",
    "description": "14/15 unnumbered",
    "availableSizes": ["X", "L"],
    "style": "White with black stripes",
    "price": 14.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "876661122392077": {
    "sku": 876661122392077,
    "title": "White DGK Script Tee",
    "description": "2014 unnumbered",
    "availableSizes": ["X", "L"],
    "style": "Black with white stripes",
    "price": 14.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "9197907543445676": {
    "sku": 9197907543445676,
    "title": "Born On The Streets",
    "description": "14/15 unnumbered - Player",
    "availableSizes": ["XL"],
    "style": "White with black stripes",
    "price": 25.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": false
  },
  "10547961582846888": {
    "sku": 10547961582846888,
    "title": "Tso 3D Short Sleeve T-Shirt A",
    "description": "14/15 + 1st World T-Shirt",
    "availableSizes": ["X", "L", "XL"],
    "style": "Black",
    "price": 10.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": false
  },
  "6090484789343891": {
    "sku": 6090484789343891,
    "title": "Man Tie Dye Cinza Grey T-Shirt",
    "description": "Goalkeeper 13/14",
    "availableSizes": ["XL", "XXL"],
    "style": "White",
    "price": 49.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "18532669286405344": {
    "sku": 18532669286405344,
    "title": "Crazy Monkey Black T-Shirt",
    "description": "1977 Child",
    "availableSizes": ["S"],
    "style": "Black with white stripes",
    "price": 22.5,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "5619496040738316": {
    "sku": 5619496040738316,
    "title": "Release 3D Black T-Shirt",
    "description": "",
    "availableSizes": ["XL"],
    "style": "Dark blue",
    "price": 18.7,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": false
  },
  "11600983276356164": {
    "sku": 11600983276356164,
    "title": "Crazy Monkey Grey",
    "description": "",
    "availableSizes": ["L", "XL"],
    "style": "",
    "price": 134.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "27250082398145996": {
    "sku": 27250082398145996,
    "title": "On The Streets Black T-Shirt",
    "description": "",
    "availableSizes": ["L", "XL"],
    "style": "",
    "price": 49,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  }
}
}

const junk = {
    "sku": 27250082398145996,
    "title": "On The Streets Black T-Shirt",
    "description": "",
    "availableSizes": ["L", "XL"],
    "style": "",
    "price": 49,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  }

const Size = ({ size, addSize, clicked }) => {
    if (clicked != size) {
        return(
            <Button color={"light"} onClick={() => addSize(size)}>{size}</Button>
        )
    } else {
        return(
           <Button outlined color={"danger"} onClick={() => addSize(size)}>{size}</Button> 
        )
    }
};

const makeRef = (sku) => (
    "/data/products/" + sku + "_1.jpg"
);

const ShirtPic = ({ sku }) => (
    <Image.Container>
        <Image src={makeRef(sku)} className="shirtPic" alt="Shirt"/>
    </Image.Container>
);

const getCostString = (cost) => {
    let costString = cost.toString();
    let decimalPlace = costString.indexOf('.');
    if (decimalPlace === -1) {
        let properFormat = costString + '.00';
        return properFormat
    } else if (decimalPlace === costString.length - 2) {
        let properFormat = costString +'0';
        return properFormat
    } else {
        return costString
    }
};

const Pane = ({ product, addProd }) => {
  const [selected, setSelected] = useState('');
  const selectSize = s => {
      selected != s ? setSelected(s) : setSelected('');
      console.log(s);
  };
  const addToCart = () => {
      if (selected === '') {
          alert('Please select a size.');
      } else {
          let newProd = Object.assign({}, product);
          newProd.availableSizes = selected;
          addProd(newProd);
          setSelected('');
      }
  };
  return(
  <Column size="one-third">
    <Box>
        <Title className="title" size={4}> { product.title } </Title>
        <ShirtPic sku={product.sku}/>
        <Title className="price" size={5} spacing="false">${ getCostString(product.price) }</Title>
        <Button.Group>
            { product.availableSizes.map(size => 
             <Size size={size} key={size} addSize={(s) => selectSize(s)} clicked={selected}/>)}
        </Button.Group>
        <Button fullwidth color={selected != '' ? "danger" : ''} onClick={() => addToCart()}>
            Add to Cart
        </Button>
    </Box>
  </Column>
  )
};
         
const TwoDigCart = ({ len }) => (
    <p className="cartFull">{len}</p>
);
         
const OneDigCart = ({ len }) => (
    <p className={len != 0 ? "cartFull" : "cartEmp"}>&nbsp;&nbsp;{len}</p>
);
        
const Header = ({ cart, open, unfurl }) => (
    <div className={open != true ? "header" : "open-h"}>
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
        </Button.Group>
        <hr className="sep"/>
    </div>
);

console.log('Test Firebase Pull');
console.log(allProducts);

const CartHeader = ({ close, items, cost }) => (
    <div className="cartHead">
        <Notification color="dark">
            <Level>
                <Level.Item align="left">
                    <Title textColor="warning">SUBTOTAL</Title>
                </Level.Item>
                <Level.Item align="right">
                    <Title textColor="warning">
                        ${cost}
                    </Title>
                </Level.Item>
            </Level>
            <Button.Group>
                <Button fullwidth outlined color="warning" onClick={() => close()}>CLOSE CART</Button>
                <Button fullwidth focused color="warning">CHECKOUT</Button>
            </Button.Group>
        </Notification>
    </div>
);

const CartPane = ({ prod, delItem }) => (
    <div className="open-s">
        <Tile vertical kind="ancestor">
            <Tile kind="parent">
                <Tile as={Notification} kind="child" color="dark">
                    <Box className="boxPane" marginless>
                        <Column.Group gapless>
                            <Column size="one-fifth">
                                <img className="cartImg" src={makeRef(prod.sku)}/>
                            </Column>
                            <Column size="four-fifths">
                                <Title size={5} className="cartTitle"><b>{prod.title}</b></Title>
                                <Title subtitle>
                                    &nbsp;{prod.availableSizes} | Quantity: {prod.quantity}
                                </Title>
                                <Level className="closer">
                                    <Level.Item align="left">
                                    <Title textColor="danger" as="p" size={4} align="left">
                                        ${ getCostString(prod.price) }
                                    </Title>
                                    </Level.Item>
                                    <Level.Item align="right">
                                        <Delete size={"medium"} align="right" onClick={() => delItem(prod)}/>
                                    </Level.Item>
                                </Level>
                            </Column>
                        </Column.Group>
                    </Box>
                </Tile>
            </Tile>
        </Tile>
    </div>
);

const App = () => {
    const [visible, setVisible] = useState(false);
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState(localItems);
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
            console.log("IN CART")
        } else {
            item.quantity = 1;
            newCart.push(item);
        }
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
        setCart(newCart);
    };
//    const subtotal = (item, currentVal) => {
//        return(item.quantity * item.price + currentVal)
//    };
    const subtotal = () => {
        let total = 0.00;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].quantity * cart[i].price;
        }
        return total
    };
    return(
    <div>
        <Sidebar 
            sidebar=<div className="side-s">
                    <CartHeader close={() => setVisible(false)} items={cart} cost={subtotal()}/>
                    {cart.map(item => <CartPane prod={item} delItem={(i) => removeItem(i)}/>)} 
                    </div>
            open={visible} 
            pullRight={true}>
        </Sidebar>
        <Header cart={cart} open={visible} unfurl={() => setVisible(true)}/>
        <Column.Group multiline>
            { Object.keys(localItems["products"]).map(product => 
                <Pane product={ localItems["products"][product] } 
                      key={localItems["products"][product].sku} addProd={(i) => addItem(i)} />) 
            }
        </Column.Group>
    </div>
    )
};

export default App;
