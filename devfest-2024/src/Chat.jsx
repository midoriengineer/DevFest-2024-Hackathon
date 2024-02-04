
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
import Header from "./Header.jsx";


  function Chat() {
    //VARIABLES-------------------------------------------------------------------
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
      const name = "Sally"
      const animal = "turtle";
      let health = 0
      const messageToSystem = {
        role: "system",
        content: `You have asked me 'What did you eat today?'. 
        If my response does not answer the question, do not respond. 
        Please tell me that my input is invalid and ask me 'What did you eat today?'. 

        My pet is a ${animal} named ${name}. The current health of the environment is ${health}.

        Based on what I ate, tell me the positive or negative effect my eating habits had on the environment,
        and how the effected environment affected my ${animal} in the form of a short story in the past tense.
        Please describe a extremely specific scenario rather than using general language. This story is only to be 1-2 sentences long.



        If ${health} is less than 3, there is a random chance that my ${animal} will die.
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
  
    return (
        <>
        <Header/>

        <br></br>

        
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
      </>
    );
  }export default Chat;
  