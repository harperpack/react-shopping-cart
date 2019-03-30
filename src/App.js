import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import './App.css';
import './Static/Data/products.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.cartUniques = [];
        this.cartWCounts = [];
    }
  
  addToCart(item) {
      if (this.cartUniques.indexOf(item) >= 0) {
          for (let i = 0; i < this.cartWCounts.length; i++) {
              if (this.cartWCounts[i][0] === item) {
                  this.cartWCounts[i][1] += 1;
                  break;
              }
          }
      } else {
          this.cartUniques.push(item);
          let itemCount = [item, 1];
          this.cartWCounts.push(itemCount);
      }
    }
    
  render() {
    return (
      <div className="shop">
        <div className="product-panel">
          <p>
            Test does this work?
          </p>
          <ProductPanel 
                products={PRODUCTS}
                addToCart={function(product){this.addToCart(product)}}
          />
        </div>
        <div className="cart-panel">
          <Cart cart={this.cartWCounts}/>
        </div>
      </div>
    );
  }
}

class ProductPanel extends Component {
    
    itemClick(product) {
        this.props.addToCart(product);
    }
    
    render() {
        const rows = [];
        const number = this.props.products.length;
        let productRow = [];
        
        for (let i = 0; i < this.props.products.length; i++) {
            if (productRow.length > 3) {
                rows.push(
                           <ProductRow products={productRow}/>
                         );
                productRow = [];
            } 
            productRow.push(this.props.products[i]);
            if (i + 1 === this.props.products.length) {
                rows.push(
                           <ProductRow 
                                products={productRow}
                                itemClick={function(item){this.itemClick(item)}}
                            />
                         );
                productRow = [];
            }
        }
        
        return (
                <div>
                    <p>{number} Product(s) found.</p>
                    <div>{rows}</div>
                </div>
               );
    }
}

class ProductRow extends Component {
    
    isClick(product) {
            this.props.itemClick(product);
    }
    
    render() {
        const columns = [];
        
        this.props.products.forEach(function(product) {
           columns.push(
                        <ProductPane 
                            product={product}
                            onClick={function(){this.isClick(product)}}
                        />
           ); 
        });
        
        return(
            <div>{columns}</div>
        );
    }
}

class ProductPane extends Component {
    render() {
        return(
            <div className="product-pane" 
                 onClick={this.props.onClick()}
            >
                <ProductSpecs product={this.props.product}/>
                <button>Add to cart</button>
            </div>
        );
    }
}

class ProductSpecs extends Component {
    
    renderTag() {
        return(
            <button className='shipping-tag'>Free shipping</button>
        );
    }
    
    render() {
        
        let imgPath = './Static/Images/' + this.props.product.sku + '_1.jpg';
        
        if (this.props.product.isFreeShipping === true) {
            renderTag();
        }
        
        return(
            <img src={imgPath}>
            <p className='product-title'>{this.props.product.title}</p>
            <p>{this.props.product.currencyFormat}{this.props.product.price}</p>
        );
    }
}

class Cart extends Component {
    // TBD
}

const PRODUCTS = [
    {
      "id": 12,
      "sku": 12064273040195392,
      "title": "Cat Tee Black T-Shirt",
      "description": "4 MSL",
      "style": "Black with custom print",
      "price": 10.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 13,
      "sku": 51498472915966370,
      "title": "Dark Thug Blue-Navy T-Shirt",
      "description": "",
      "style": "Front print and paisley print",
      "price": 29.45,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 14,
      "sku": 10686354557628304,
      "title": "Sphynx Tie Dye Wine T-Shirt",
      "description": "GPX Poly 1",
      "style": "Front tie dye print",
      "price": 9.0,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 15,
      "sku": 11033926921508488,
      "title": "Skuul",
      "description": "Treino 2014",
      "style": "Black T-Shirt with front print",
      "price": 14.0,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 11,
      "sku": 39876704341265610,
      "title": "Wine Skul T-Shirt",
      "description": "",
      "style": "Wine",
      "price": 13.25,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 16,
      "sku": 10412368723880252,
      "title": "Short Sleeve T-Shirt",
      "description": "",
      "style": "Grey",
      "price": 75.0,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 0,
      "sku": 8552515751438644,
      "title": "Cat Tee Black T-Shirt",
      "description": "14/15 s/nº",
      "style": "Branco com listras pretas",
      "price": 10.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 1,
      "sku": 18644119330491310,
      "title": "Sphynx Tie Dye Grey T-Shirt",
      "description": "14/15 s/nº",
      "style": "Preta com listras brancas",
      "price": 10.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 2,
      "sku": 11854078013954528,
      "title": "Danger Knife Grey",
      "description": "14/15 s/nº",
      "style": "Branco com listras pretas",
      "price": 14.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 3,
      "sku": 876661122392077,
      "title": "White DGK Script Tee",
      "description": "2014 s/nº",
      "style": "Preto com listras brancas",
      "price": 14.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 4,
      "sku": 9197907543445676,
      "title": "Born On The Streets",
      "description": "14/15 s/nº - Jogador",
      "style": "Branco com listras pretas",
      "price": 25.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": false
    },

    {
      "id": 5,
      "sku": 10547961582846888,
      "title": "Tso 3D Short Sleeve T-Shirt A",
      "description": "14/15 + Camiseta 1º Mundial",
      "style": "Preto",
      "price": 10.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": false
    },

    {
      "id": 6,
      "sku": 6090484789343891,
      "title": "Man Tie Dye Cinza Grey T-Shirt",
      "description": "Goleiro 13/14",
      "style": "Branco",
      "price": 49.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 7,
      "sku": 18532669286405344,
      "title": "Crazy Monkey Black T-Shirt",
      "description": "1977 Infantil",
      "style": "Preto com listras brancas",
      "price": 22.5,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 8,
      "sku": 5619496040738316,
      "title": "Tso 3D Black T-Shirt",
      "description": "",
      "style": "Azul escuro",
      "price": 18.7,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": false
    },

    {
      "id": 9,
      "sku": 11600983276356164,
      "title": "Crazy Monkey Grey",
      "description": "",
      "style": "",
      "price": 134.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 10,
      "sku": 27250082398145996,
      "title": "On The Streets Black T-Shirt",
      "description": "",
      "style": "",
      "price": 49.0,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    }
  ];

export default App;


// OLD APP CODE
//class App extends Component {
//  render() {
//    return (
//      <div className="App">
//        <header className="App-header">
//          <img src={logo} className="App-logo" alt="logo" />
//          <p>
//            Edit <code>src/App.js</code> and save to reload.
//          </p>
//          <a
//            className="App-link"
//            href="https://reactjs.org"
//            target="_blank"
//            rel="noopener noreferrer"
//          >
//            Learn React
//          </a>
//        </header>
//      </div>
//    );
//  }
//}