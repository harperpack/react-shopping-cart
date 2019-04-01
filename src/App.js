import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import './App.css';
import './Static/Data/products.json';

// WHAT IS STATE?  AN INVESTIGATION, CONSIDERING OUR DATA:
// -products (never changes)
// -products shown (determined by size selections + products)
// -size of cart (determined by cart)
// -item quantities (determined by cart)
// -order total (determined by cart and products)
// >>> cart [cart icon, cart pane, order pane, summary pane]
// >>> cart pane existence [cart icon, cart pane]
// >>> size selections [product panel]
// >>> order by selection [product panel]

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: {},
            cartPane: false,
            sizeFilter: [],
            viewSort: null,
        }
    }
  
  addToCart(item) {
      let entries = this.state.cart.keys(this.state.cart);
      if (entries.some(function(entry) {return entry === item.sku})) {
          newQuantity = 1 + this.state.cart[item.sku]["quantity"];
          newTotal = this.state.cart[item.sku]["orderTotal"] + this.state.cart[item.sku]["price"];
          this.setState({
              cart[item.sku]["quantity"]: newQuantity,
              cart[item.sku]["orderTotal"]: newTotal,
              cartPane: true,
          })
      } else {
          this.setState({
              cart[item.sku]: item,
              cart[item.sku]["quantity"]: 1,
              cart[item.sku]["orderTotal"]: item.price,
              cartPane: true,
          })
      }
  }
  
  renderSizeButton(size) {
      return(
          <button className="size-button" onClick={this.setFilters(size)}>
            {size}
          </button>
      );
  }
  
  setFilters(size) {
      let filters = this.state.sizeFilter.slice();
      let found = this.state.sizeFilter.indexOf(size);
      if (found >= 0) {
          filters.splice(found, 1);
          this.setState({
              sizeFilter: filters,
          });
      } else {
          filters.push(size)
          this.setState({
              sizeFilter: filters,
          });
      }
  }

  swapCartVisual() {
      this.setState({
          cartPane: !this.state.cartPane,
      });
  }

  removeFromCart(item) {
      let copy = Object.assign({}, this.state.cart);
      delete copy[item.sku];
      this.setState({
          cart: copy,
      });
  }
  
  const allSizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
  let sizeButtons = [];
  let productsShown = PRODUCTS.slice();
  let productsHiddden = [];
  let toHide; // for products to be hidden from view based on filtering activity
  let toShow; // for products to be added to the view based on filtering activity
  let testRemove;
  let testAdd;
    
  render() {
    
    if (this.state.sizeFilter.length > 0) {
        for (let i = 0; i < productsShown.length; i++) {
            // if none of sizes are in available sizes, it is removed
            testRemove = productsShown[i].availableSizes.some(function(size){return this.state.sizeFilter.includes(size)});
            if (!testRemove) {
                toHide = productsShown[i];
                productsHiddden.push(toHide);
                productsShown.splice(i, 1);
            }
        }
        for (let j = 0; j < productsHidden.length; j++) {
            // if any of sizes are in available sizes, it is added
            testAdd = productsHidden[j].availableSizes.some(function(size){return this.state.sizeFilter.includes(size)});
            if (testAdd) {
                toAdd = productsHidden[j];
                productsShown.push(toAdd);
                productsHidden.splice(j, 1);
            }
        }
    } else {
        // if nothing in sizeFilter, we default to showing all products
        productsShown = PRODUCTS.slice();
        productsHiddden = [];
    }
      
        // setState for sorting
        // manage products according to viewSort
        // DONE make cart icon
        // DONE make cart icon flip with x icon, have clicking setState
        // make cart panel
        // >>make orderitem pane(s)
        // >>>add x icon to order pane(s), have clicking setState -> remove from Cart
        // >>make total pane
        // DONE set addtocart button to multiple buttons for each size 
        // DONE have each size as its own product - maybe via appending size to SKU?
        // DONE setState for sizes - add on click, remove on click
        // DONE buttons for sizes on page
        // DONE adjust page display
        // DONE add to cart
        // DONE view cartPane when adding item to cart
    
    return (
      <div className="shop">
        <div className="size-filters">
            {this.renderSizeButton("XS")}
            {this.renderSizeButton("S")}
            {this.renderSizeButton("M")}
            {this.renderSizeButton("ML")}
            {this.renderSizeButton("L")}
            {this.renderSizeButton("XL")}
            {this.renderSizeButton("XXL")}
        </div>
        <div className="product-panel">
          <p>
            Test does this work?
          </p>
          <ProductPanel 
                products={productsShown}
                addToCart={function(product){this.addToCart(product)}}
          />
        </div>
        <div className="cart-panel">
          <CartIcon cart={this.state.cart} onClick={this.swapCartVisual}/>
          <CartPanel cart={this.state.cart} onClick={this.removeFromCart}/>
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
    
    isClick(item) {
            this.props.itemClick(item);
    }
    
    render() {
        const columns = [];
        
        this.props.products.forEach(function(product) {
           columns.push(
                        <ProductPane 
                            product={product}
                            onClick={function(item){this.isClick(item)}}
                        />
           ); 
        });
        
        return(
            <div>{columns}</div>
        );
    }
}

class ProductPane extends Component {
    
    renderButtons(product) {
        product.availableSizes.forEach(
            function(size){
              let copy = Object.assign({}, product);
              let sizeProd = Object.assign(copy, {
                                sku: product.sku + size,
                                availableSizes: size,
                             });
              return(
                        <button className"order-by-size-button" onClick={this.props.onClick(sizeProd)}>
                            {size}
                        </button>
                  );
            })
    }
            
    render() {
        return(
            <div className="product-pane">
                <ProductSpecs product={this.props.product}/>
                <h4>Add a size to cart:</h4>
                <div className='size-order'>
                    {this.renderButtons(this.props.product)}
                </div>
            </div>
        );
    }
}

class ProductSpecs extends Component {
    
    renderTag(product) {
        if (this.props.product.isFreeShipping === true) {
            return(
                <button className='shipping-tag'>Free shipping</button>
            );
        } else {
            return;
        }
    }
    
    render() {
        
        let imgPath = './Static/Images/' + this.props.product.sku + '_1.jpg';
        
        return(
            <div className="div-shipping-tag">
                {this.renderTag(this.props.product)}
            </div>
            <img src={imgPath}>
            <p className='product-title'>{this.props.product.title}</p>
            <p>{this.props.product.currencyFormat}{this.props.product.price}</p>
        );
    }
}

class CartIcon extends Component {
    render() {
        
        let cartCount = this.state.cart.keys(this.state.cart).length;
        
        if (!this.state.cartPane) {
            return(
                <div className="cart-closed" onClick={this.props.onClick}>
                    <img src="./Static/Icons/bag-icon.png">
                    <button className="cart-count">{cartCount}</button>
                </div>
                );
        } else {
            return(
                <div className="cart-open">
                    <img src="./Static/Icons/sprite_delete-icon.png">
                </div>
                );   
        }
    }
}

class CartPane extends Component {
    render() {
        if (!this.state.cartPane) {
            return;
        } else {
            
            let cartCount = this.state.cart.keys(this.state.cart).length;
            
            let subTotal;
            for (let item in this.state.cart) {
                subTotal += item["orderTotal"];
            }
            
            return(
                <div className="cart-menu">
                    <CartSummary cartCount={cartCount}/>
                    <CartContents cart={this.state.cart}/>
                    <CartTotal total={subTotal}/>
                </div>
            );
        }
    }
}

class CartSummary extends Component {
    render() {
        return(
            <div className="cart-summ">
                <img src="./Static/Icons/bag-icon.png">
                <button className="cart-count">{this.props.cartCount}</button>
            </div>
        );
    }
}

class CartContents extends Component {
    
    renderOrders(cart) {
        for (let item in cart) {
            return(
                <OrderPane item={item}/>
            );
        }
    }
    
    render() {
        return(
            <div className="order-panel">
                {this.renderOrders(this.state.cart)}
            </div>
        );
    }
}

class OrderPane extends Component {
    render() {
        return(
            <div className="order-pane">
                <img src=
            </div>
        );
    }
}


const PRODUCTS = [
    {
      "id": 12,
      "sku": 12064273040195392,
      "title": "Cat Tee Black T-Shirt",
      "description": "4 MSL",
      "availableSizes": ["S", "XS"],
      "style": "Black with custom print",
      "price": 10.9,
      "installments": 9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 13,
      "sku": 51498472915966370,
      "title": "Dark Thug Blue-Navy T-Shirt",
      "description": "",
      "availableSizes": ["M"],
      "style": "Front print and paisley print",
      "price": 29.45,
      "installments": 5,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 14,
      "sku": 10686354557628304,
      "title": "Sphynx Tie Dye Wine T-Shirt",
      "description": "GPX Poly 1",
      "availableSizes": ["X", "L", "XL"],
      "style": "Front tie dye print",
      "price": 9.0,
      "installments": 3,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 15,
      "sku": 11033926921508488,
      "title": "Skuul",
      "description": "Treino 2014",
      "availableSizes": ["X", "L", "XL", "XXL"],
      "style": "Black T-Shirt with front print",
      "price": 14.0,
      "installments": 5,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 11,
      "sku": 39876704341265610,
      "title": "Wine Skul T-Shirt",
      "description": "",
      "availableSizes": ["X", "L"],
      "style": "Wine",
      "price": 13.25,
      "installments": 3,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 16,
      "sku": 10412368723880252,
      "title": "Short Sleeve T-Shirt",
      "description": "",
      "availableSizes": ["XS", "X", "L", "ML", "XL"],
      "style": "Grey",
      "price": 75.0,
      "installments": 5,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 0,
      "sku": 8552515751438644,
      "title": "Cat Tee Black T-Shirt",
      "description": "14/15 s/nº",
      "availableSizes": ["X", "L", "XL", "XXL"],
      "style": "Branco com listras pretas",
      "price": 10.9,
      "installments": 9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 1,
      "sku": 18644119330491310,
      "title": "Sphynx Tie Dye Grey T-Shirt",
      "description": "14/15 s/nº",
      "availableSizes": ["X", "L", "XL", "XXL"],
      "style": "Preta com listras brancas",
      "price": 10.9,
      "installments": 9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 2,
      "sku": 11854078013954528,
      "title": "Danger Knife Grey",
      "description": "14/15 s/nº",
      "availableSizes": ["X", "L"],
      "style": "Branco com listras pretas",
      "price": 14.9,
      "installments": 7,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 3,
      "sku": 876661122392077,
      "title": "White DGK Script Tee",
      "description": "2014 s/nº",
      "availableSizes": ["X", "L"],
      "style": "Preto com listras brancas",
      "price": 14.9,
      "installments": 7,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 4,
      "sku": 9197907543445676,
      "title": "Born On The Streets",
      "description": "14/15 s/nº - Jogador",
      "availableSizes": ["XL"],
      "style": "Branco com listras pretas",
      "price": 25.9,
      "installments": 12,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": false
    },

    {
      "id": 5,
      "sku": 10547961582846888,
      "title": "Tso 3D Short Sleeve T-Shirt A",
      "description": "14/15 + Camiseta 1º Mundial",
      "availableSizes": ["X", "L", "XL"],
      "style": "Preto",
      "price": 10.9,
      "installments": 9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": false
    },

    {
      "id": 6,
      "sku": 6090484789343891,
      "title": "Man Tie Dye Cinza Grey T-Shirt",
      "description": "Goleiro 13/14",
      "availableSizes": ["XL", "XXL"],
      "style": "Branco",
      "price": 49.9,
      "installments": 0,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 7,
      "sku": 18532669286405344,
      "title": "Crazy Monkey Black T-Shirt",
      "description": "1977 Infantil",
      "availableSizes": ["S"],
      "style": "Preto com listras brancas",
      "price": 22.5,
      "installments": 4,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 8,
      "sku": 5619496040738316,
      "title": "Tso 3D Black T-Shirt",
      "description": "",
      "availableSizes": ["XL"],
      "style": "Azul escuro",
      "price": 18.7,
      "installments": 4,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": false
    },

    {
      "id": 9,
      "sku": 11600983276356164,
      "title": "Crazy Monkey Grey",
      "description": "",
      "availableSizes": ["L", "XL"],
      "style": "",
      "price": 134.9,
      "installments": 5,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },

    {
      "id": 10,
      "sku": 27250082398145996,
      "title": "On The Streets Black T-Shirt",
      "description": "",
      "availableSizes": ["L", "XL"],
      "style": "",
      "price": 49.0,
      "installments": 9,
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