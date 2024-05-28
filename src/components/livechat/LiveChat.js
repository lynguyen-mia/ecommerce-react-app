import { useRef, useState, useEffect } from "react";
import styles from "./LiveChat.module.css";
import openSocket from "socket.io-client";
import { getVariable } from "../../utils/getLocalVars";

const LiveChat = () => {
  const socket = openSocket("https://ecommerce-node-app-sfau.onrender.com");

  const messageRef = useRef();
  const iconRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [openLiveChat, setOpenLiveChat] = useState(false);

  // Get current user details
  const curUser = getVariable("user");

  const room = localStorage.getItem("roomNum");
  const [roomNum, setRoomNum] = useState(room || null);

  useEffect(() => {
    // Listen to events from server
    const handleChatRes = (data) => {
      if (roomNum === data.roomId) {
        // messages = [{content, name, role, userId}, {}...]
        setMessages((prevState) => [...prevState, data.message]);
      }
    };
    const endChat = (data) => {
      if (roomNum === data.roomId) {
        setMessages([]);
        setOpenLiveChat(false);
        localStorage.removeItem("roomNum");
        setRoomNum(null);
      }
    };
    socket.on("chatRes", handleChatRes);
    socket.on("endChat", endChat);

    // Prevent duplicate messages
    return () => {
      socket.off("chatRes", handleChatRes);
      socket.off("endChat", endChat);
    };
  }, [socket]);

  useEffect(() => {
    if (openLiveChat) {
      async function fetchRoomId() {
        const res = await fetch(
          `https://ecommerce-node-app-sfau.onrender.com/client/chat/roomid?id=${roomNum}`,
          {
            credentials: "include"
          }
        );

        if (res.status === 401) {
          window.alert("Your session has expired, please log in again");
          return window.location.replace("/login");
        }

        const results = await res.json();
        const roomId = results.roomId;
        // console.log(roomId);
        setRoomNum(roomId);

        localStorage.setItem("roomNum", roomId);
      }

      async function fetchRoom() {
        const res = await fetch(
          `https://ecommerce-node-app-sfau.onrender.com/client/chat/room?id=${roomNum}`,
          {
            credentials: "include"
          }
        );

        const results = await res.json();
        // Fetch previous conversation
        const messages = [];
        results.room?.messages?.forEach((messObj) => {
          messages.push(messObj);
        });
        setMessages(messages);
      }

      if (!roomNum) {
        // If there's no room in local storage, fetch 1 room ID from server
        fetchRoomId();
      } else {
        // If there's existing room, fetch previous conversation
        fetchRoom();
      }
    }
  }, [openLiveChat]);

  function onSendMessage(e) {
    if (e.key === "Enter") {
      sendMessage();
      e.preventDefault(); // prevent jumping to a new line
    }
  }

  function sendMessage() {
    const message = messageRef.current.value;
    // console.log(roomNum);
    socket.emit("chat", {
      roomId: roomNum,
      message: message,
      user: !curUser
        ? {
            userId: roomNum,
            name: "visitor",
            role: "customer"
          }
        : { userId: curUser.userId, name: curUser.name, role: "customer" }
    });
    messageRef.current.value = "";
  }

  // Close live chat when clicking outside
  window.addEventListener("click", function (e) {
    if (
      openLiveChat &&
      !iconRef?.current?.contains(e.target) &&
      !chatBoxRef?.current?.contains(e.target)
    ) {
      setOpenLiveChat(false);
    }
  });

  function onClickLiveChat() {
    setOpenLiveChat((prevState) => !prevState);
  }

  return (
    <div className={styles["live-chat"]}>
      <i
        className={`bi bi-messenger fa-h2 ${styles["live-chat_icon"]}`}
        onClick={onClickLiveChat}
        ref={iconRef}
      ></i>
      {openLiveChat && (
        <div className={styles["chat_box"]} ref={chatBoxRef}>
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <strong>Customer support</strong>
              </div>
              <div className={styles["chat_box__subtitle"]}>Let's Chat App</div>
            </div>
            <hr />

            <div className={styles["chat_box--content"]}>
              <div
                id={styles["messages-container"]}
                className="d-flex flex-column gap-2 mb-2 pe-3"
              >
                {messages &&
                  messages.map((mess, index) => {
                    return (
                      <div
                        className={
                          mess.role === "customer"
                            ? "d-flex justify-content-end w-100"
                            : "w-100 d-flex align-items-center"
                        }
                        key={index}
                      >
                        {mess.role === "admin" && (
                          <i className="bi bi-person-circle me-2"></i>
                        )}
                        <span
                          className={
                            mess.role === "customer"
                              ? styles["chat_me"]
                              : styles["chat_admin"]
                          }
                        >
                          {mess.content}
                        </span>
                      </div>
                    );
                  })}
                <div id={styles.anchor} />
              </div>
            </div>
          </div>

          <div className="row bg-light pb-3">
            <hr />
            <div className="col col-10 d-flex align-items-center pe-0">
              <i className="bi bi-person-circle me-2"></i>
              <textarea
                type="text"
                placeholder="Enter messages"
                className="form-control w-100"
                ref={messageRef}
                onKeyDown={onSendMessage}
              />
            </div>
            <div
              onClick={sendMessage}
              className="col col-2 d-flex justify-content-center"
            >
              <i className="bi bi-send-fill"></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
