// Import React and the components from React Bootstrap
import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import Header from "./Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";

// Import the images of the animals from the assets folder
import penguinImage from "./assets/penguin.gif";
import turtleImage from "./assets/turtle.gif";
import bunnyImage from "./assets/bunny.gif";
import { useNavigate } from "react-router-dom";
function Shop() {
  const navigate = useNavigate();
  // Define a function that handles the adoption of an animal
  const handleAdopt = (animal) => {
    // Perform some actions, such as adding the animal to the cart, updating the state, or navigating to another page
    localStorage.setItem("animal", JSON.stringify(animal));
    navigate("/chat");
  };

  return (
    <>
      <Header />
      <br></br>

      <div className="background-container">
        <br></br>

        <br></br>
        <Container className="home-container" style={{maxWidth:"1000px !important"}}>
          <h1 className="title" style={{ fontWeight: "500" }}>
            Choose a Pet:
          </h1>

          <Row>
            <Col>
              <Card className="align-items-center">
                <Image
                  src={penguinImage}
                  alt="Penguin"
                  style={{ height: 200, width: 200 }}
                  rounded
                />

                <Card.Body>
                  <Card.Title>
                    <h1 className="title">Oscar the Penguin</h1>
                  </Card.Title>
                  <Card.Text>
                    Penguins are flightless birds that live in the Southern
                    Hemisphere. They are excellent swimmers and feed on fish and
                    krill. They are social and live in large colonies.
                  </Card.Text>

                  <Button
                    className="shop-button"
                    variant="primary"
                    size="lg"
                    onClick={() =>
                      handleAdopt({
                        animal: "penguin",
                        name: "Oscar",
                        image:"./assets/penguin.gif"
                      })
                    }
                  >
                    Adopt me!
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="align-items-center">
                <Image
                  src={turtleImage}
                  alt="Turtle"
                  style={{ height: 200, width: 200 }}
                  rounded
                />
                <Card.Body>
                  <Card.Title>
                    <h1 className="title">Sally The Turtle</h1>
                  </Card.Title>
                  <Card.Text>
                    Turtles are reptiles that have a hard shell to protect them
                    from predators. They can live in freshwater, saltwater, or
                    on land. They are omnivorous and eat plants and animals.
                  </Card.Text>
                  <Button
                    className="shop-button"
                    variant="primary"
                    size="lg"
                    onClick={() =>
                      handleAdopt({
                        animal: "turtle",
                        name: "Sally",
                        image:"./assets/turtle.gif"
                      })
                    }
                  >
                    Adopt me!
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="align-items-center">
                <Image
                  src={bunnyImage}
                  alt="Bunny"
                  style={{ height: 200, width: 200 }}
                  rounded
                />
                <Card.Body>
                  <Card.Title>
                    <h1 className="title">Kuromi the Bunny</h1>
                  </Card.Title>
                  <Card.Text>
                    Bunnies are small mammals that belong to the order
                    Lagomorpha. They have long ears, fluffy tails, and strong
                    hind legs. They are herbivorous and eat grass, hay, and
                    vegetables.
                  </Card.Text>
                  <Button
                    className="shop-button"
                    variant="primary"
                    size="lg"
                    onClick={() =>
                      handleAdopt({
                        animal: "bunny",
                        name: "Kuromi",
                        image:"./assets/bunny.gif"
                      })
                    }
                  >
                    Adopt me!
                  </Button>
                </Card.Body>
              </Card>
              <br></br>
              <br></br>
            </Col>
          </Row>
        </Container>
        <br></br>
        <br></br>
      </div>
    </>
  );
}

export default Shop;
