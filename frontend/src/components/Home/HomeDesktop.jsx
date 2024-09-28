import React, { useEffect } from "react";
import styled from "styled-components";
import { useChat } from "../../contextApi/ChatContext";

const HomeDesktop = ({ setIsTermsModal }) => {
  const { onlineUsers, receiver, setIsTyping, setMessage, setReceiver } =
    useChat();

  useEffect(() => {
    console.log(receiver);
    if (
      receiver !== undefined &&
      !onlineUsers.find((user) => user.userId === receiver)
    ) {
      setIsTyping(false);
      setMessage("");
      setReceiver("");
    }
  }, [onlineUsers]);

  return (
    <>
      <div className="flex justify-center items-center mt-32 bg-[#192734] p-5 md:p-0 ">
        <div className="bg-[#15202b] p-3 rounded-lg shadow-lg max-w-md w-full md:p-8 text-white">
          <div className="flex justify-center items-center flex-col space-y-5">
            <h1 className="font-semibold text-xl">
              Welcome to LeeyosChat{" "}
              <span className="text-red-500">(Unregulated)</span>
            </h1>
            <h1 className="text-sm text-green-500 font-semibold">
              Regulated Version:{" "}
              <span className="text-blue-500 underline">
                <a href="http://leeyos.com">leeyos.com</a>
              </span>
            </h1>
            <h2 className="text-sm font-semibold">
              This is an unregulated version of leeyos.
            </h2>
            <h2 className="text-md font-bold text-orange-500">
              Use at your own risk.
            </h2>

            <span className="font-semibold bg-[#0d141b] py-2  rounded-lg w-1/2 justify-center items-center flex text-xl">
              {onlineUsers.length}&nbsp;
              <span className="font-bold text-green-400">ONLINE</span>
            </span>

            <HomeBottom>
              <div>
                <ButtonsWrapper>
                  <button
                    className="rounded-lg bg-green-400 px-3 py-2 text-black font-semibold w-32"
                    onClick={() => setIsTermsModal(true)}
                  >
                    Find Match
                  </button>
                </ButtonsWrapper>
              </div>
            </HomeBottom>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDesktop;

const HomeBottom = styled.div({
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
});

const ButtonsWrapper = styled.div({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});
