import { useEffect } from "react";
import { useState } from "react";
import "../../css/Messenger.css";
import ChatOnline from "./ChatOnline";
import Conversation from "./Conversation";
import Spinner from '../SpinnerCircular'
import Message from "./Message";
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { useRef } from "react";


const conversationsURL = 'http://127.0.0.1:5000/api/chat/conversations';
const messagesURL = 'http://127.0.0.1:5000/api/chat/messages';

export default function Messenger() {

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  // const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userIdDeletedConversation, setUserIdDeletedConversation] = useState(null); // id de un usuario que eliminó una conversación desde otra cuenta
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();


  const context = useOutletContext();
  const [user, setUser] = context.userContext;
  const socket = context.socket;


  useEffect(() => {
    socket.current?.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    });
    socket.current?.on("deleteConversation", (data) => {
      setUserIdDeletedConversation({
        sender: data.senderId
      })
    });
  }, [])

  useEffect(() => {
    if (userIdDeletedConversation && conversations){
      setConversations(conversations.filter((c) => !c.members.includes(userIdDeletedConversation.sender))) 
      if(currentChat?.members.includes(userIdDeletedConversation.sender)){
        setCurrentChat(null)
      }
    }

  }, [userIdDeletedConversation, conversations, currentChat])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat])


  useEffect(() => {
    user && socket.current?.emit("addUser", user?._id);
    socket.current?.on("getUsers", users => {
      setOnlineUsers(users.map((o) => o.userId));
    })
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(conversationsURL, { withCredentials: true });
        setConversations(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getConversations();
  }, [user])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(messagesURL + `/${currentChat?._id}`, { withCredentials: true });
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, [currentChat])


  const handleSumbit = async (e) => {
    e.preventDefault();
    const message = {
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find(member => member !== user._id)

    socket.current?.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage
    });

    try {
      const res = await axios.post(messagesURL, message, { withCredentials: true });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

  };

  const deleteConversation = async(conversation) => {
    try {
      const receiverId = conversation.members.find(member => member !== user._id);
      const res = await axios.delete(`${conversationsURL}/${conversation._id}`, {withCredentials: true});
      setConversations(conversations.filter((conversation) => conversation._id !== conversation._id));
      setCurrentChat(null);
      socket.current?.emit("deleteConversation", {
        senderId: user._id,
        receiverId,
      });
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages]);

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
      }}>
        <Spinner />
      </div>
    )
  } else {
    return (
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Buscar chats" className="chatMenuInput" />
            {conversations.map((conversation) => (
              <div className="row align-items-center mt-3">
                <div className="col-8" onClick={() => setCurrentChat(conversation)}>
                  <Conversation conversation={conversation} userId={user?._id} />
                </div>
                <div className="col-4">
                  <span onClick={() => deleteConversation(conversation)} className="conversationDelete"><i class="bi bi-trash"></i></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ?
                <>
                  <div className="chatBoxTop">
                    {
                      messages.map((m) =>
                        <div ref={scrollRef}>
                          <Message message={m} own={m.sender === user._id} />
                        </div>
                      )
                    }
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="Escribe tu mensaje..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSumbitButton" onClick={handleSumbit}>Enviar</button>
                  </div>
                </>
                : <span className="noConversationText">Abre una conversación para ver el chat</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              conversations={conversations}
              currentId={user._id}
              setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    )
  }


}