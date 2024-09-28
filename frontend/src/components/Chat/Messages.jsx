import React, { useEffect, useRef } from "react";
import { useChat } from "../../contextApi/ChatContext";
import { socket } from "../../Socket";
import html2canvas from "html2canvas";
import styled from "styled-components";
import { dotWave } from "ldrs";

dotWave.register();

// Default values shown

const Messages = () => {
  const {
    userId,
    isSearching,
    setIsSearching,
    receiver,
    messages,
    setMessages,
    isTyping,
    message,
  } = useChat();

  const newChat = () => {
    setIsSearching(true);
    setMessages([]);
    socket.emit("pairing-user", userId, (error) => {
      if (error) {
        return alert(error);
      }
    });
    return () => {
      socket.off("pairing-user");
    };
  };

  const takeScreenshot = () => {
    const element = document.getElementById("savedchat");

    html2canvas(element).then((canvas) => {
      const screenshot = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");

      downloadLink.href = screenshot;
      downloadLink.download = "screenshot.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  const messagesRef = useRef();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container>
      <MessagesContainer id="savedchat" ref={messagesRef}>
        {!isSearching && !receiver && receiver !== "" && (
          <>
            <div className="text-white">
              {" "}
              <span>Match making stopped.&nbsp;</span>
              <span
                className="underline font-bold text-orange-500 cursor-pointer"
                onClick={newChat}
              >
                Start a new conversation
              </span>
              <button
                onClick={() => (window.location.href = "/")}
                className="text-md font-bold text-blue-400 mt-2 flex justify-center items-center" // Add margin-top for spacing
              >
                Go Home
              </button>
            </div>
          </>
        )}

        {receiver && (
          <p className="connectedText font-bold text-green-500 mb-2">
            You're now chatting with a random stranger. Say Hi!
          </p>
        )}
        {messages.map((message, index) => (
          <MessageWrapper
            key={index}
            className={`flex flex-col  mb-4 ${
              message?.stranger ? "items-start" : "items-end"
            }`}
          >
            <p
              className="text-xs"
              style={{
                color: message?.stranger ? "yellow" : "blue",
                fontWeight: "bold",
              }}
            >
              {message?.stranger ? "Stranger" : "You"}
            </p>
            <div
              className={`bg-${
                message?.stranger
                  ? " bg-[#2c2c2e] text-white text-sm"
                  : " bg-gradient-to-r from-[#284e8f] to-[#6a9bdc] text-white text-sm"
              } w-max rounded-lg px-2 text-md`}
            >
              <div className="py-1">
                <p style={{ margin: "0", padding: "0" }}>
                  {message?.stranger ? message.stranger : message.you}
                </p>
              </div>
            </div>
          </MessageWrapper>
        ))}

        {isTyping && (
          <TypingText>
            <span className="text-gray-400 text-sm">
              Stranger is typing{" "}
              <l-dot-wave size="15" speed="1" color={"#9ca3af"}></l-dot-wave>
            </span>
          </TypingText>
        )}

        {isSearching && (
          <p className="loadingText loadingTextMobile">
            <span className="text-orange-500 font-semibold">
              Looking for someone you can chat with&nbsp;
              <l-dot-wave size="20" speed="1" color={"#f97316"}></l-dot-wave>
            </span>{" "}
          </p>
        )}
        {isSearching && (
          <p className="loadingText loadingTextDesktop">
            <span className="text-orange-500 font-semibold">
              Looking for someone you can chat with&nbsp;
              <l-dot-wave size="20" speed="1" color={"#f97316"}></l-dot-wave>
            </span>
          </p>
        )}
        {!isSearching && !receiver && receiver === "" && (
          <>
            <StrangerDisconnected className="disconnectText disconnectedTextMobile">
              Stranger has disconnected.
            </StrangerDisconnected>
            <StrangerDisconnectedDesktop className="disconnectText disconnectedTextDesktop justify-center items-center flex">
              <span className="text-orange-500 font-bold">
                Stranger has disconnected.
              </span>
            </StrangerDisconnectedDesktop>
            <SaveLogWrapper className="disconnectText2 disconnectText2Mobile">
              <SaveLogButton onClick={takeScreenshot}>
                Great chat? Save the log!
              </SaveLogButton>
            </SaveLogWrapper>

            <SaveLogoWrapperDesktop className="disconnectText2 disconnectText2Desktop text-white flex justify-center items-center">
              <span className="text-white text-md">
                Start a new conversation
              </span>
              <p>or</p>
              <button onClick={takeScreenshot}>
                <span className="text-md underline text-blue-400">
                  save this log
                </span>
              </button>
            </SaveLogoWrapperDesktop>

            {/* Go Home button placed below the others */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => (window.location.href = "/")}
                className="text-md font-bold text-blue-400 mt-2 flex justify-center items-center" // Add margin-top for spacing
              >
                Go Home
              </button>
            </div>
          </>
        )}
      </MessagesContainer>
    </Container>
  );
};

export default Messages;

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

const MessagesContainer = styled.div({
  height: "93vh",
  width: "100%",
  maxWidth: "600px", // Set a maximum width for desktop view
  padding: "10px",
  backgroundColor: "#15202b", // Background color for the messages container
  overflowY: "auto", // Allow scrolling if messages exceed the height
});

const MessageWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const TypingText = styled.p({
  marginTop: "5px",
});

const StrangerDisconnected = styled.p({
  color: "gray",
  fontWeight: "500",
  margin: "15px 0 10px 0",
});

const StrangerDisconnectedDesktop = styled.p({
  color: "gray",
  fontWeight: "500",
  margin: "15px 0 10px 0",
});

const SaveLogWrapper = styled.div({
  flexDirection: "column",
});

const SaveLogButton = styled.p({
  fontSize: "14px",
  fontWeight: "600",
  padding: "10px",
  marginTop: "8px",
  background: "#ff8a29",
  borderRadius: "3px",
  cursor: "pointer",
});

const SaveLogoWrapperDesktop = styled.div({
  gap: "5px",
});
