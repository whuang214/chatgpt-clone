import { useState } from "react";

import { AiOutlineSend } from "react-icons/ai";
import styles from "./ChatInput.module.css";

import chatService from "../../utils/chatService";

export default function ChatInput({ currentChat }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      return;
    }
    console.log(message);
  };

  return (
    <div className={styles.chatInputContainer}>
      <form onSubmit={handleSubmit} className={styles.chatInputForm}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={styles.chatInput}
          placeholder="Send a message..."
        />
        <button type="submit" className={styles.sendButton}>
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
}
