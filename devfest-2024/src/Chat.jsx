import React, { useState, useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Line } from 'rc-progress';
import {
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    MainContainer,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import OpenAI from "openai";
import Header from "./Header.jsx";
import { Row, Col, Container } from "react-bootstrap";
import penguinImage from "./assets/penguin.gif";
import turtleImage from "./assets/turtle.gif";
import bunnyImage from "./assets/bunny.gif";
import deadImage from "./assets/dead.png";


function Chat() {
    //VARIABLES-------------------------------------------------------------------
    const [health, setHealth] = useState(100);
    const [dead, setDead] = useState(false)
    const animal = JSON.parse(localStorage.getItem("animal"));
    console.log(animal.image);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const [typing, setTyping] = useState(false);
  let resMessages = [];
  const [messages, setMessages] = useState([
    {
      message: `Congratulations on adopting ${animal.name}! I know you will give them a great life. 
To get started, why don't you tell me what you ate today?`,
      sender: "NutriPet",
    },
  ]);
  
    //FUNCTIONS-------------------------------------------------------------------

    async function handleSendMessage(message) {
        const newMessage = {
            message: message,
            sender: "You",
            direction: "outgoing",
        };
        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setTyping(true);

        await handleMessage(newMessages);
    }

    async function handleMessage(chatMessages) {
        let messagesFromApi = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "You") {
                role = "user";
            } else {
                role = "assistant";
            }
            return {
                role: role,
                content: messageObject.message,
            };
        });

        const messageToSystem = {
            role: "system",
            content: `
      ${JSON.stringify(messages)}.\n The above is our conversation history. 
      I am the sender "You" and you are the sender "NutriPet." 
      Please reference our previous messages when creating new messages. \n

        If my response is off-topic or fails to answer the question you asked, please tell me that my input is invalid and ask me 'What did you eat today?@'. \n

        My pet is a ${animal.animal} named ${animal.name}.\n

        Based on what I ate, tell me the positive or negative effect my eating habits had on the environment,
        and how the effected environment affected my ${animal.animal} in the form of a short story in the past tense;
        The story should avoid general language.
        The story should be an extremely specific with details and should only be 1-2 sentences long maximum. \n

        The responses have to make sense based on the kind of animal ${animal.name} is. 
        Also, if I don't mention the food is grass-fed, cage-free, sustainable, local, etc., assume it is not. 
        Omit information that involves how the story was created or breaks the immersion of the story, such as "scores", "story", "I asked you to tell me the positive or negative affects" or " there is a random chance that ${animal.name} will die." 
        Each story much be unique and different from previous messages.\n

        For the story, only one of the following three sentences is true:\n
        If ${health} is greater than 69, the enviornmental damage is minimal.\n
        If ${health} is less than 70 and ${health} is greater than 40, the the enviornmental damage is moderate.\n
        If ${health} is less than 41, the the enviornmental damage is severe and ${animal.name} will die.\n

        
        End of ALL of your responses with a JSON object as a string structured EXACTLY as shown below(including the @ symbol):\n
        @{
            isPetDead: true or false,
            isEnvironmentalEffectNegative: true or false
        }

        `,
        };

        const requestToApi = {
            model: "gpt-3.5-turbo",
            messages: [messageToSystem, ...messagesFromApi],
        };
        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${openai.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestToApi),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                resMessages = data.choices[0].message.content.split("@");
            });
        
        await printMessages(resMessages[0]);
        console.log(resMessages)
        console.log(resMessages[1])
        if (resMessages[1] != undefined && resMessages[1] != null && resMessages[1] != "") {
            if(JSON.parse(resMessages[1]).isPetDead){
                setDead(true);
            }
            if(JSON.parse(resMessages[1]).isEnvironmentalEffectNegative){
                let newHealth = health - 40;
                if(newHealth < 0){
                    setHealth(0);
                    setDead(true)
                }
                else{
                    setHealth(newHealth);
                }
            }
            else{
                setHealth(health + 10);
            }
        }
        
        setTyping(false);
        resMessages = [];
    }

    async function printMessages(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newMessage = {
                    message: message,
                    sender: "NutriPet",
                    direction: "incoming",
                };

                if (message.length > 0) {
                    setMessages((chatMessages) => [...chatMessages, newMessage]);
                }
                resolve();
            }, 1000);
        });
    }

    return (
        <>
              <div className="background-container" style={{height:"120px", backgroundPosition: "top", filter: `grayscale(${100-health}%)`}}>

            <Header />
            </div>

            <br></br>


<Container>
    <Col>
    <Row style={{justifyContent:"center"}}>
                {animal.animal === "penguin" && !dead? <img
                    src={penguinImage}
                    alt={animal.animal}
                    style={{ height: 300, width: 300 }}
                /> : null}
                {animal.animal === "turtle"  && !dead? <img
                    src={turtleImage}
                    alt={animal.animal}
                    style={{ height: 300, width: 300 }}
                /> : null}
                {animal.animal === "bunny" && !dead ? <img
                    src={bunnyImage}
                    alt={animal.animal}
                    style={{ height: 300, width: 300 }}
                /> : null}
                {dead ? <img
                    src={deadImage}
                    alt={animal.animal}
                    style={{ height: 300, width: 300 }}
                /> : null}

            </Row>
            <Row style={{justifyContent:"center"}}>
            <div style={{ padding: "0 20px" }}><h3>Environment Health {health > 40 ? "☺" : "☹"}</h3>
                    <Line percent={health} strokeWidth={1} strokeColor={health > 40 ? "#4caf50" : "#b60000"} />
                    </div>
                <br></br>
                </Row>
    <Row>
                

                <div
                    style={{
                        position: "relative",
                        height: "150px",
                        width: "100%",
                    }}
                >
                    <MainContainer>
                        <ChatContainer>
                            <MessageList
                                typingIndicator={
                                    typing ? <TypingIndicator content="NutriPet is typing" /> : null
                                }
                            >
                                <Message model={messages[messages.length-1]} />
                            
                            </MessageList>
                            <MessageInput
                                placeholder={"Enter food here"}
                                onSend={handleSendMessage}
                                attachButton={false}
                                disabled={dead}
                            />
                        </ChatContainer>
                    </MainContainer>
                </div>
            </Row>
            
            </Col>
            </Container>
        </>
    );
}
export default Chat;
