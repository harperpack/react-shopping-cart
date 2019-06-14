import React, { useState } from 'react';
import './App.css';

import "rbx/index.css";
import { Button, Title, Box, Column, Image } from 'rbx';

import getCostString from './getCostString.js';
import makeRef from './makeRef.js';

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

const ShirtPic = ({ sku }) => (
    <Image.Container>
        <Image src={makeRef(sku)} className="shirtPic" alt="Shirt"/>
    </Image.Container>
);

const Pane = ({ product, addProd }) => {
  const [selected, setSelected] = useState('');
  const selectSize = s => {
      selected !== s ? setSelected(s) : setSelected('');
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
        <Button fullwidth color={selected !== '' ? "danger" : ''} onClick={() => addToCart()}>
            Add to Cart
        </Button>
    </Box>
  </Column>
  )
};

export default Pane;