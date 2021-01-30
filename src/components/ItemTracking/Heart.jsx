import React, { useState, useEffect } from "react";
import { Table, Card, Container, Row, Col, ListGroup, Image, Media, Button } from "react-bootstrap";
import "./heart.css"


function Heart(props) {
    const [myHeart, setmyHeart] = useState(false)

    async function insertWishListToDb(wishList) {
        const request = new Request(`http://localhost:3002/itemTracking/add`, {
            method: "POST",
            body: JSON.stringify(wishList),
            headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
            }),
        })

        console.log("After JSON: ", JSON.stringify(wishList))

        const response = await fetch(request)
        // const data = await response.json()
    }

    async function removeWishListFromDb(wishList) {
        const request = new Request(`http://localhost:3002/itemTracking/del`, {
            method: "DELETE",
            body: JSON.stringify(wishList),
            headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
            }),
        })

        console.log("After JSON: ", JSON.stringify(wishList))

        const response = await fetch(request)
        // const data = await response.json()
    }

    return (
        <>
            {myHeart ? (
                
                <i style={{margin: '5px',
               
                
            color: '#F8C3CD'}}
                className="far fa-heart fa-lg heart-animation"
                onClick={() => {
                    insertWishListToDb({
                        username: props.username,
                        itemId: props.itemId,
                        itemPrice: props.itemPrice 
                    });
                    setmyHeart(!myHeart)
                }}></i>
            ) : (
                    <i style={{margin: '5px',
                    transform: 'scale( 1.25 )',
                    transition: '.2',
                    color: '#F8C3CD'}}
                    className="fas fa-heart fa-lg heart-animation" aria-hidden="true"
                    onClick={() => {
                        removeWishListFromDb({
                            username: props.username,
                            itemId: props.itemId
                        });

                        setmyHeart(!myHeart)
                        console.log(props.itemId)
                    }}></i>
                )}
        </>
    )
}

export default Heart;