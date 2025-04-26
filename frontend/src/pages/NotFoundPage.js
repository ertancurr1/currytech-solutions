import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import Button from "../components/ui/Button";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 1rem;
  min-height: 60vh;
`;

const NotFoundNumber = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  margin-bottom: 0;
  color: #007bff;
  text-shadow: 2px 2px 8px rgba(0, 123, 255, 0.2);

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const NotFoundTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const NotFoundPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NotFoundContainer>
      <NotFoundNumber>404</NotFoundNumber>
      <NotFoundTitle theme={{ mode: theme.mode }}>Page Not Found</NotFoundTitle>
      <NotFoundText theme={{ mode: theme.mode }}>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </NotFoundText>
      <ButtonGroup>
        <Button variant="primary" to="/">
          Back to Home
        </Button>
        <Button variant="secondary" to="/contact">
          Contact Support
        </Button>
      </ButtonGroup>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
