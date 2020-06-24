import React from 'react'
import {
  Table,
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Media,
  Button,
} from 'react-bootstrap'
import Heart from './Heart'

const TrackingCard = (props) => {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          variant="top"
          src={`/items/${props.itemImg}`}
          alt={props.itemImg}
        />
        <Card.Body>
          <Card.Title>{props.itemName}</Card.Title>
          <Card.Text>{props.itemDescription}</Card.Text>
          <Card.Text>{props.itemPrice}</Card.Text>
          <Button variant="primary" onClick={props.handleClick}>
            add to cart
          </Button>
          <Heart itemId={props.itemId} />
        </Card.Body>
      </Card>
    </>
  )
}

export default TrackingCard
