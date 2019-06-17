import React, { useState } from 'react';
import './App.css';

import "rbx/index.css";
import { Button, Title, Box, Column, Image } from 'rbx';

import getCostString from './getCostString.js';
import makeRef from './makeRef.js';

const CartButton = ({ selected, available, addItem }) => {
    if (available > 0) {
        return(
            <Button fullwidth color={selected !== '' ? "danger" : ''} onClick={() => addItem()}>
                Add to Cart
            </Button>
        );
    } else {
        return(
            <Button fullwidth disabled color={"light"}>
                <b>OUT OF STOCK</b>
            </Button>
        );
    }
};

const Size = ({ size, addSize, clicked }) => {
    if (clicked !== size) {
        return(
            <Button color={"light"} onClick={() => addSize(size)}>{size}</Button>
        )
    } else {
        return(
           <Button outlined color={"danger"} onClick={() => addSize(size)}>{size}</Button> 
        )
    }
};

const ShirtPic = ({ sku, available }) => (
    <div>
    <Image.Container>
        <Image src={makeRef(sku)} className={available > 0 ? "shirtPic" : "shirtOut"} alt="Shirt"/>
    </Image.Container>
    </div>
);

const Pane = ({ product, addProd, sizes }) => {
  const [selected, setSelected] = useState('');
  const selectSize = s => {
      selected !== s ? setSelected(s) : setSelected('');
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
  const inStock = (product, inventory) => {
    if (typeof inventory !== 'undefined') {
        return Object.keys(inventory).filter(size => inventory[size] > 0)
    } else {
        return [];
    }
  };
  const outOfStock = (sizes) => {
      if (typeof sizes === 'undefined') {
          return 0;
      } else {
          return Object.keys(sizes).reduce(function(acc, size){return acc + sizes[size]}, 0);
      }
  };
  return(
  <Column size="one-third">
    <Box>
        <Title className="prodTitle" size={4}> { product.title } </Title>
        <ShirtPic sku={product.sku} available={outOfStock(sizes)}/>
        <Title className="price" size={5} spacing="false">${ getCostString(product.price) }</Title>
        <Button.Group>
            { inStock(product, sizes).map(size => 
             <Size size={size} key={size} addSize={(s) => selectSize(s)} clicked={selected}/>)}
        </Button.Group>
        <CartButton selected={selected} addItem={() => addToCart()} available={outOfStock(sizes)}/>
    </Box>
  </Column>
  )
};

export default Pane;