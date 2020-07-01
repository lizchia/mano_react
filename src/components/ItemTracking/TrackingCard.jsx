import React from "react";
import { Table, Card, Container, Row, Col, ListGroup, Image, Media, Button } from 'react-bootstrap'
import Heart from "./Heart"
import "./trackingCard.css"

const TrackingCard = props => {

    return (
        <>
            <div className="track-card">
                <a href={`http://localhost:3000/mall/itemDetail/shop/categoryId=1?itemId=${props.itemId}`}>
                    <img className="track-photo" variant="top" src={`/items/${props.itemImg}`}
                    alt={props.itemImg} />
                </a>
                <div className="heart-position">
                    <Heart
                        className=""
                        itemId={props.itemId}
                        username={props.username}
                        itemPrice={props.itemPrice} />

                </div>
                <div className="track-card-body">
                    <h5 className="trackingCard-item-name">
                        {props.itemName}
                    </h5>
                    <div className="d-flex">
                        <h5 className="trackingCard-item-price">${props.itemPrice}</h5>
                        <Button
                            variant="btn btn-outline-success"
                            onClick={props.handleClick}
                            style={{
                                marginLeft: '45px',
                                padding: '1px',
                                backgroundcolor: '#5C6447',
                            }}>
                            add to cart
                    </Button>
                    </div>

                </div>

            </div>
        </>

    )
}

export default TrackingCard;