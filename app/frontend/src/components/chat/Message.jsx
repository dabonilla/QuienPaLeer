import "../../css/Message.css"
import userImage from "../../assets/img/userImage.png";
import {format, register} from "timeago.js";
import localeFunc from "./localLang";

register('my-locale', localeFunc);

export default function Message({ message ,own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src={userImage} alt="" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt, 'my-locale')}</div>
    </div>
  )
}
