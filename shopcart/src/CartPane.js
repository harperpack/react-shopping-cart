import React from 'react';
import './App.css';

import "rbx/index.css";
import { Notification, Title, Box, Tile, Column, Level, Delete } from 'rbx';

import getCostString from './getCostString.js';
import makeRef from './makeRef.js';

const CartPane = ({ prod, delItem }) => (
    <div className="open-s">
        <Tile vertical kind="ancestor">
            <Tile kind="parent">
                <Tile as={Notification} kind="child" color="dark">
                    <Box className="boxPane" marginless>
                        <Column.Group gapless>
                            <Column size="one-fifth">
                                <img className="cartImg" src={makeRef(prod.sku)} alt="Cart"/>
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

export default CartPane;