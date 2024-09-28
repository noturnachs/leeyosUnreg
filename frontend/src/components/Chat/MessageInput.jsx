import React, { useEffect } from "react";
import { useChat } from "../../contextApi/ChatContext";
import { socket } from "../../Socket";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MessageInput = () => {
  const {
    userId,
    onlineUsers,
    isSearching,
    setIsSearching,
    receiver,
    setReceiver,
    setMessages,
    isSending,
    setIsSending,
    message,
    setMessage,
    setIsTyping,
  } = useChat();

  const newChat = () => {
    setIsSearching(true);
    setMessages([]);
    socket.emit("pairing-user", userId, (error) => {
      return;
    });
    return () => {
      socket.off("pairing-user");
    };
  };

  const sendMessage = () => {
    if (isSending) return;
    if (message === "") return;
    setIsSending(true);
    socket.emit("send-message", receiver, message, () => {
      setMessage("");
      setIsSending(false); // Reset sending state after message is sent
    });
  };

  const disconnectChat = () => {
    if (receiver) {
      socket.emit("chat-close", receiver, () => {
        setReceiver("");
        setIsTyping(false);
        setMessage("");
      });
    } else {
      socket.emit("unpairing-user", userId, () => {
        setIsSearching(false);
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const typingHandle = (e) => {
    if (e.target.value !== "") {
      socket.emit("typing", receiver);
    } else {
      socket.emit("typing stop", receiver);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (userId && onlineUsers.find((user) => user.userId === userId)) {
      newChat();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <InputWrapper>
        {receiver || isSearching ? (
          <Button className="bg-red-500" onClick={disconnectChat}>
            Stop
          </Button>
        ) : (
          <Button
            className="bg-orange-500"
            onClick={newChat}
            disabled={isSearching}
          >
            New
          </Button>
        )}
        <Input
          type="text"
          placeholder="Type your message..."
          className="inputBox"
          onChange={(e) => {
            setMessage(e.target.value);
            typingHandle(e);
          }}
          value={message}
          onKeyDown={(e) => handleKeyPress(e)}
          disabled={!receiver}
        />
        <Button
          className="bg-green-500"
          onClick={sendMessage}
          disabled={!receiver || isSending}
        >
          Send
        </Button>
      </InputWrapper>
    </Container>
  );
};

export default MessageInput;

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

const InputWrapper = styled.div({
  display: "flex",
  width: "100%",
  maxWidth: "600px", // Set a maximum width for desktop view
  flexDirection: "row",
});

const Button = styled.button({
  fontSize: "15px",
  fontWeight: "500",
  minWidth: "fit-content",
  padding: "16px",
  border: "1px solid black",
  borderRadius: "2px",
  flex: "1", // Allow buttons to grow equally
});

const Input = styled.input({
  fontSize: "18px",
  padding: "16px",
  width: "100%", // Make input take the remaining space
  borderRadius: "2px",
});
