import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TermsModal = ({ setIsTermsModal }) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setcheck2] = useState(false);
  const navigate = useNavigate();

  const navigateToChat = () => {
    navigate("/chat");
  };

  return (
    <ModalBackground>
      <div className="md:w-1/2 bg-[#15202b] p-10 rounded-lg space-y-5 text-white w-max">
        <ModalCloseWrapper>
          <ModalClose onClick={() => setIsTermsModal(false)}>
            <IoClose />
          </ModalClose>
        </ModalCloseWrapper>
        <InputWrapper>
          <span>
            <input
              className="modalInput"
              type="checkbox"
              checked={check1}
              onChange={() => setCheck1(!check1)}
            />
          </span>
          <CheckBoxLabel className="modalText">
            <strong>I am over 18 years old</strong>
          </CheckBoxLabel>
        </InputWrapper>
        <InputWrapper style={{ marginTop: "15px" }}>
          <span>
            <input
              className="modalInput"
              type="checkbox"
              checked={check2}
              onChange={() => setcheck2(!check2)}
            />
          </span>
          <CheckBoxLabel className="modalText font-bold">
            I agree that leeyos is not responsible for any content shared by the
            users.
          </CheckBoxLabel>
        </InputWrapper>
        <div>
          <button
            className="bg-green-500 rounded-lg px-3 py-1 text-black font-semibold w-max text-md "
            onClick={navigateToChat}
            disabled={!check1 || !check2}
          >
            Continue
          </button>
        </div>
      </div>
    </ModalBackground>
  );
};

export default TermsModal;

const ModalBackground = styled.div({
  width: "100%",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: "0",
  left: "0",
  overflow: "hidden",
});

// const Modal = styled.div({
//   padding: "35px 20px",
//   height: "fit-content",
//   background: "white",
//   borderRadius: "30px",
// });

const ModalCloseWrapper = styled.div({
  display: "flex",
  flexDirection: "row-reverse",
  position: "relative",
});

const ModalClose = styled.button({
  color: "gray",
  fontSize: "26px",
  background: "transparent",
  border: "none",
  position: "absolute",
  top: "-25px",
  right: "-10px",
});

const InputWrapper = styled.div({
  display: "flex",
  gap: "10px",
});

const CheckBoxLabel = styled.span({
  fontSize: "15px",
});
