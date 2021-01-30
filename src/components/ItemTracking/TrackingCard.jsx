import React from "react";
import { Table, Card, Container, Row, Col, ListGroup, Image, Media, Button } from 'react-bootstrap'
import Heart from "./Heart"
import CategoryBar from "../CategoryBar"

// xs={6} md={4}  style={{ flexGrow: '3'}}
const TrackingCard = props => {

        return(
            <>
            <Card  className="text-item-center" style={{ width: '200px', height: '340px', margin: '10px'}}>
                <Card.Img style={{ width: '198px', height: '200px', overflow: 'hidden' }} variant="top" src={`/items/${props.itemImg}`}
                alt={props.itemImg} />
                <Card.Body>
                    <Card.Title style={{ width: '200px', height: '10px'}}>{props.itemName}</Card.Title>
                    <Card.Text>
                    {props.itemDescription}
                    </Card.Text>
                    <Card.Text>
                    ${props.itemPrice}
                    </Card.Text>
                    <Button variant="primary" onClick={props.handleClick} style={{ marginRight: '3px'}}>add to cart</Button>
                    <Heart  itemId={props.itemId}/>
                </Card.Body>
            </Card> 
        </>


            )
}

export default TrackingCard;