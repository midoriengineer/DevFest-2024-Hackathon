// Import React and the components from React Bootstrap
import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import Header from "./Header";

// Import the images of the animals from the assets folder
import penguinImage from "./assets/penguin.gif";
import turtleImage from "./assets/turtle.gif";
import bunnyImage from "./assets/bunny.gif";

function Shop() {
  // Define a function that handles the adoption of an animal
  const handleAdopt = (animal) => {
    // Perform some actions, such as adding the animal to the cart, updating the state, or navigating to another page
    console.log(`You have adopted a ${animal}!`);
  };

  return (
<>
    <Header/>
      <br></br>

    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <Card>
            <Image
              src={penguinImage}
              alt="Penguin"
              style={{ height: 300, width: 300 }}
              rounded
            />

            <Card.Body>
              <Card.Title><h1 className="title">Oscar the Penguin</h1></Card.Title>
              <Card.Text>
                Penguins are flightless birds that live in the Southern
                Hemisphere. They are excellent swimmers and feed on fish and
                krill. They are social and live in large colonies.
              </Card.Text>

              <Button
              className="shop-button"
                variant="primary"
                size="lg"
                onClick={() => handleAdopt("penguin")}
              >
                Adopt me!
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card>
            <Image
              src={turtleImage}
              alt="Turtle"
              style={{ height: 300, width: 300 }}
              rounded
            />
            <Card.Body>
              <Card.Title><h1 className="title">Sally The Turtle</h1></Card.Title>
              <Card.Text>
                Turtles are reptiles that have a hard shell to protect them from
                predators. They can live in freshwater, saltwater, or on land.
                They are omnivorous and eat plants and animals.
              </Card.Text>
              <Button
              className="shop-button"
                variant="primary"
                size="lg"
                onClick={() => handleAdopt("turtle")}
              >
                Adopt me!
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Image
              src={bunnyImage}
              alt="Bunny"
              style={{ height: 300, width: 300 }}
              rounded
            />
            <Card.Body>
              <Card.Title><h1 className="title">Kuromi the Bunny</h1></Card.Title>
              <Card.Text>
                Bunnies are small mammals that belong to the order Lagomorpha.
                They have long ears, fluffy tails, and strong hind legs. They
                are herbivorous and eat grass, hay, and vegetables.
              </Card.Text>
              <Button
              className="shop-button"
                variant="primary"
                size="lg"
                onClick={() => handleAdopt("bunny")}
              >
                Adopt me!
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Shop;
