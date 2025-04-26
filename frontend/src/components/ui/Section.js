import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/ThemeContext";

const SectionContainer = styled.section`
  padding: ${(props) => props.padding || "4rem 1rem"};
  background-color: ${(props) => {
    if (props.bgColor) return props.bgColor;
    if (props.alternate) {
      return props.theme.mode === "dark" ? "#1A1A1A" : "#f9f9f9";
    }
    return props.theme.mode === "dark" ? "#121212" : "#ffffff";
  }};
  position: relative;
`;

const SectionContent = styled.div`
  max-width: ${(props) => (props.fullWidth ? "100%" : "1200px")};
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  text-align: ${(props) => (props.centered ? "center" : "left")};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  text-align: ${(props) => (props.centered ? "center" : "left")};
  max-width: ${(props) => (props.centered ? "700px" : "100%")};
  margin-left: ${(props) => (props.centered ? "auto" : "0")};
  margin-right: ${(props) => (props.centered ? "auto" : "0")};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Section = ({
  title,
  subtitle,
  children,
  alternate,
  bgColor,
  fullWidth,
  centered,
  id,
  padding,
  ...rest
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SectionContainer
      alternate={alternate}
      bgColor={bgColor}
      theme={{ mode: theme.mode }}
      id={id}
      padding={padding}
      {...rest}
    >
      <SectionContent fullWidth={fullWidth}>
        {title && (
          <SectionTitle theme={{ mode: theme.mode }} centered={centered}>
            {title}
          </SectionTitle>
        )}
        {subtitle && (
          <SectionSubtitle theme={{ mode: theme.mode }} centered={centered}>
            {subtitle}
          </SectionSubtitle>
        )}
        {children}
      </SectionContent>
    </SectionContainer>
  );
};

export default Section;
