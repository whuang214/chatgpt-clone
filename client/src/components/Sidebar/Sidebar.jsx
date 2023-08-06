import { useState, useEffect } from "react";

import chatService from "../../utils/chatService";

import { FaPlus } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import styles from "./Sidebar.module.css";

export default function Sidebar({ onLogout, currentChat, setCurrentChat }) {
  const [chats, setChats] = useState([]);

  async function getChats() {
    const chats = await chatService.getAllChats();
    setChats(chats);
  }

  useEffect(() => {
    getChats();
  }, [currentChat]);

  function handleChatClick(chat) {
    chat ? setCurrentChat(chat) : setCurrentChat(null);
  }

  async function handleDeleteChat() {
    // console.log("Delete: ", currentChat._id);
    await chatService.deleteChat(currentChat._id);
    setCurrentChat(null);
  }
  function handleEditChatTitle() {
    console.log("Edit: ", currentChat._id);
  }

  return (
    <nav className={styles.sidebar}>
      <button
        onClick={() => handleChatClick(null)}
        className={styles.addChatButton}
      >
        <FaPlus /> New Chat
      </button>
      <div className={styles.chatHistory}>
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={
              chat._id === currentChat?._id
                ? styles.conversationSelected
                : styles.conversation
            }
            onClick={() => handleChatClick(chat)}
          >
            {chat.title}
            {chat._id === currentChat?._id && (
              <div className={styles.iconContainer}>
                <button
                  className={styles.editIcon}
                  onClick={handleEditChatTitle}
                >
                  <AiOutlineEdit size={17} />
                </button>
                <button
                  className={styles.deleteIcon}
                  onClick={handleDeleteChat}
                >
                  <AiOutlineDelete size={17} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
