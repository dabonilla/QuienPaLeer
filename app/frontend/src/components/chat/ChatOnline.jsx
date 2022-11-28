import "../../css/ChatOnline.css";
import userImage from "../../assets/img/userImage.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const ApiHeroku=import.meta.env.VITE_API

const baseUrl = ApiHeroku+'api/users';

export default function ChatOnline({ onlineUsers, conversations, currentId, setCurrentChat }) {

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const getFriendsIds = () => {
    let friendsIds = [];
    conversations.forEach(conversation => {
      const friendId = conversation.members.find((member) => member !== currentId);
      friendsIds.push(friendId);
    });
    return friendsIds;
  }


  useEffect(() => {

    const getInfoFriends = async () => {
      let friendsInformation = [];
      let friendsId = getFriendsIds();

      for (const friendId of friendsId){
        try {
          const res = await axios.get(baseUrl + `?userId=${friendId}`);
          friendsInformation.push({ ...res.data, _id: friendId });
        } catch (error) {
          console.log(error);
        }
      }

      setFriends(friendsInformation);
    };

    getInfoFriends();

  }, [conversations]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
  }, [friends, onlineUsers]);


  return (
    <div className="chatOnline">
      {onlineFriends.map((friendOnline) => (
        <div className="chatOnlineFriend" key={friendOnline._id}>
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={userImage} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{`${friendOnline.name} ${friendOnline.lastName}`}</span>
        </div>))}
    </div>
  )
}


