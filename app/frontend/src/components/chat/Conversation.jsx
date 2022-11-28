import "../../css/Conversation.css"
import userImage from "../../assets/img/userImage.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const ApiHeroku=import.meta.env.VITE_API

const baseUrl = ApiHeroku+'api/users';

export default function Conversation({ conversation, userId }) {

  const [user, setUser] = useState(null);

  const friendId = conversation.members.find((member) => member !== userId);

  const getUser = async () => {
    try {
      const res = await axios.get(baseUrl + `?userId=${friendId}`);
      setUser(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser();
  }, [conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={userImage}></img>
      <span className="conversationName">{user?.name}</span>
    </div>
  )
}
