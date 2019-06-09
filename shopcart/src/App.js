import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/database';

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
// 2. 

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

const troduct = {
    name: "Great Shirt"
};

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
    { products.map(product => <Pane product={ product } />) }
  </div>
);

const Sizes = ({ sizes }) => (
    <div>
        { sizes.map(size => <Size size={size}/>)}
    </div>
);

const Size = ({ size }) => (
    <p className="availableSizes">{size}</p>
);

const MakeRef = (sku) => (
    "../public/data/products/" + sku + "_1.jpg"
);

const ShirtPic = ({ sku }) => (
    <img src={MakeRef(sku)} className="shirtPic"/>
);

const TestPath = () => (
    <img src="../public/data/products/12064273040195392_1.jpg"/>
);

const Pane = ({ product }) => (
  <div className="pane">
    <h3 className="title"> { product.title } </h3>
    <ShirtPic sku={product.sku}/>
    <h4 className="price">${ product.price }</h4>
    <Sizes sizes={product.availableSizes}/>
  </div>
);

console.log('Test Firebase Pull');
console.log(allProducts);

const App = () => (
    <div>
        <h1>Shopping Cart</h1>
        <Panes products={localProds} />
    </div>
);

export default App;
