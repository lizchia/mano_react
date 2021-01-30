import React, { useState, useEffect } from "react";
import { Table, Card, Container, Row, Col, ListGroup, Image, Media, Button } from "react-bootstrap"



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
                
                <Button onClick={() => {
                    insertWishListToDb({
                        "itemId": props.itemId
                    });
                    setmyHeart(!myHeart)
                }} ><i className="far fa-heart"></i></Button>
            ) : (
                    <Button onClick={() => {
                        removeWishListFromDb({
                            "itemId": props.itemId
                        });
                        setmyHeart(!myHeart)
                        console.log(props.itemId)
                    }}><i className="fas fa-heart" aria-hidden="true"></i></Button>
                )}
        </>
    )
}

export default Heart;