import React from "react";
import styled from "styled-components";

const HomePageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroSection = styled.section`
  padding: 4rem 1rem;
  width: 100%;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1A1A1A" : "#f0f8ff"};
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <HeroSection>
        <h1>Welcome to CurryTech Solutions</h1>
        <p>Innovative IT solutions for your business needs</p>
        <button>Learn More</button>
      </HeroSection>
      {/* Other sections will be added later */}
    </HomePageContainer>
  );
};

export default HomePage;
