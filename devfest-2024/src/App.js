import "./App.css";
import React, { useState, useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MainContainer,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import OpenAI from "openai";
import logo from "./logo.png";
//import home from "./Home.jsx";
function App() {
  return (
    <>
      <Logo />
      <br></br>
      <Chat />
    </>
  );
}

export default App;

function Logo() {
  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <img src={logo} alt="Logo" style={{ maxWidth: "100px" }} />
    </div>
  );
}

function Chat() {
  //VARIABLES-------------------------------------------------------------------
  // const [openai, setOpenAI] = useState("");
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const [typing, setTyping] = useState(false);
  let splitMessages = [];
  const [messages, setMessages] = useState([
    {
      message: "What did you eat today?",
      sender: "bot",
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
    const animal = "turtle";
    const messageToSystem = {
      role: "system",
      content: `My pet is a ${animal} If I do not answer with what I ate today, Do not respond. 
      Please tell me that my input is invalid and ask me 'What did you eat today?'. 
      Tell me the effect my eating habits has on on the environment. 
      Will the environmental effect be postiive or negative for my ${animal} and if 
      the outcome is positive or negative for the environment itself
      The food is only for me not for my${animal} Tell me the consequences as a story in which my ${animal} is a character.
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
        console.log(data);
        splitMessages = data.choices[0].message.content.split("\n");
      });
    for (const message of splitMessages) {
      await printMessages(message);
    }
    setTyping(false);
    splitMessages = [];
  }

  async function printMessages(message) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage = {
          message: message,
          sender: "bot",
          direction: "incoming",
        };

        if (message.length > 0) {
          setMessages((chatMessages) => [...chatMessages, newMessage]);
        }
        resolve();
      }, 1000);
    });
  }

  // useEffect(() => {
  //   console.log(9);
  //   fetch("/api/key", {
  //     method: "GET",
  //     mode: "cors",
  //   })
  //     .then((response) => console.log(response))
  //     .then((data) => {
  //       console.log(data);
  //       console.log(8);

  //       setOpenAI(
  //         new OpenAI({ apiKey: data.key, dangerouslyAllowBrowser: true })
  //       );
  //     })
  //     .catch((error) => console.error("Error:", error));
  // }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "550px",
        backgroundColor: "#F8F8F8",
      }}
    >
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              typing ? <TypingIndicator content="Bot is typing" /> : null
            }
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput
            placeholder={"Type your message here"}
            onSend={handleSendMessage}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
