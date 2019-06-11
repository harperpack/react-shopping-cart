import React, { useState, useEffect } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/database';

import "rbx/index.css";
import { Button, Container, Title, Box, Tile, Column, Image, Tag } from 'rbx';

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
//   1b. How would I get the product sizes?
//
// 3. How to make pictures smaller?
// 4. How to format for mobile?
// 3. How can I change the margin on price?
// 4. 
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

let localProds = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];

const Panes = ({ products }) => (
  <div>
    <Column.Group multiline>
     { products.map(product => <Pane product={ product } key={product.sku} />) }
    </Column.Group>
  </div>
);

const Sizes = ({ sizes }) => (
    <Button.Group>
        <Button inverted color={"black"} state="hovered" className="txtBtn">
            <Title subtitle size={5}>Add to Cart:</Title>
        </Button>
        { sizes.map(size => <Size size={size} key={size}/>)}
    </Button.Group>
);

const Size = ({ size }) => (
    <Button as="a" className="availableSizes" color={"light"}>{size}</Button>
);

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

const Pane = ({ product }) => (
  <Column size="one-third">
    <Box>
        <Title className="title" size={4}> { product.title } </Title>
        <ShirtPic sku={product.sku}/>
        <Title className="price" size={5} spacing="false">${ getCostString(product.price) }</Title>
        <Sizes sizes={product.availableSizes}/>
    </Box>
  </Column>
);

const Header = () => (
    <Button.Group>
        <Image.Container size={96}>
            <Image className="header" src="/data/cart-icon.png"/>
        </Image.Container>
        <Title>Shopping Cart</Title>
    </Button.Group>
);

console.log('Test Firebase Pull');
console.log(allProducts);

const App = () => {
    const [visible, setVisible] = useState(false);
    const [cart, setCart] = useState([]);
    return(
    <div>
        <Header/>
        <Panes products={localProds} />
    </div>
    )
};

export default App;
