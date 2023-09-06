import React from "react";
import styled from "styled-components";

const Chat = () => {
  return (
    <Container>
      <div className="container"></div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .container{
    
  }
`;

export default Chat;
