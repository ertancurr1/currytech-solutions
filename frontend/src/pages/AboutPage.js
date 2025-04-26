import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { TEAM_MEMBERS } from "../utils/constants";
import {
  FaRegLightbulb,
  FaStar,
  FaHandshake,
  FaPeopleGroup,
} from "react-icons/fa6";
import CurryTechOffice from "../assets/CurryTech-Office.jpg";

// Page Header Styling
const PageHeader = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1A1A1A" : "#f0f8ff"};
  padding: 6rem 1rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// About Content Styling
const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 992px) {
    height: 300px;
  }
`;

const AboutText = styled.div`
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
`;

// Mission & Vision Styling
const MissionVisionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MissionVisionCard = styled.div`
  padding: 2.5rem;
  border-radius: 8px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
    position: relative;
    padding-bottom: 0.8rem;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: #007bff;
    }
  }

  p {
    line-height: 1.7;
    color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  }
`;

// Team Section Styling
const TeamContainer = styled.div`
  margin-top: 2rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const TeamMemberImage = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${TeamCard}:hover & img {
    transform: scale(1.05);
  }
`;

const TeamMemberInfo = styled.div`
  padding: 1.5rem;
`;

const TeamMemberName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const TeamMemberPosition = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #007bff;
  margin-bottom: 1rem;
`;

const TeamMemberBio = styled.p`
  font-size: 0.9rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

// Values Section Styling
const ValuesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  padding: 2rem 1.5rem;
  border-radius: 8px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #007bff;
`;

const ValueTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const ValueDescription = styled.p`
  font-size: 0.9rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

const AboutPage = () => {
  const { theme } = useContext(ThemeContext);

  const values = [
    {
      id: 1,
      title: "Innovation",
      description:
        "We embrace cutting-edge technologies and creative solutions to solve complex problems.",
      icon: <FaRegLightbulb />,
    },
    {
      id: 2,
      title: "Excellence",
      description:
        "We are committed to delivering exceptional quality in everything we do.",
      icon: <FaStar />,
    },
    {
      id: 3,
      title: "Integrity",
      description:
        "We operate with honesty, transparency, and ethical business practices.",
      icon: <FaHandshake />,
    },
    {
      id: 4,
      title: "Collaboration",
      description:
        "We work together as a team and partner closely with our clients for shared success.",
      icon: <FaPeopleGroup />,
    },
  ];

  return (
    <>
      {/* Page Header */}
      <PageHeader theme={{ mode: theme.mode }}>
        <PageTitle theme={{ mode: theme.mode }}>
          About CurryTech Solutions
        </PageTitle>
        <PageSubtitle theme={{ mode: theme.mode }}>
          Get to know our company, our mission, our vision, and the team behind
          our success.
        </PageSubtitle>
      </PageHeader>

      {/* Company Story Section */}
      <Section>
        <AboutContent>
          <AboutImage>
            <img src={CurryTechOffice} alt="CurryTech Office" />
          </AboutImage>
          <AboutText theme={{ mode: theme.mode }}>
            <h2>Our Story</h2>
            <p>
              Founded in 2022, CurryTech Solutions began with a clear vision: to
              help businesses harness the power of technology to drive growth
              and innovation. What started as a small team of passionate
              technologists has grown into a dynamic company with a global
              presence.
            </p>
            <p>
              Over the years, we've helped hundreds of businesses—from startups
              to enterprise organizations—transform their operations, enhance
              customer experiences, and achieve significant business outcomes
              through custom technology solutions.
            </p>
            <p>
              Our journey has been marked by continuous learning, adaptation to
              emerging technologies, and a steadfast commitment to our clients'
              success. Today, we stand as a trusted technology partner for
              businesses across various industries.
            </p>
            <Button variant="primary" to="/contact">
              Work With Us
            </Button>
          </AboutText>
        </AboutContent>
      </Section>

      {/* Mission & Vision Section */}
      <Section title="Mission & Vision" centered alternate>
        <MissionVisionContainer>
          <MissionVisionCard theme={{ mode: theme.mode }}>
            <h3>Our Mission</h3>
            <p>
              To empower businesses with innovative technology solutions that
              drive growth, efficiency, and competitive advantage. We are
              committed to delivering exceptional value through our technical
              expertise, industry knowledge, and client-focused approach.
            </p>
          </MissionVisionCard>

          <MissionVisionCard theme={{ mode: theme.mode }}>
            <h3>Our Vision</h3>
            <p>
              To be the leading technology partner for businesses seeking
              transformative digital solutions. We aim to create a future where
              technology enhances human potential, drives business success, and
              contributes to a more connected and efficient world.
            </p>
          </MissionVisionCard>
        </MissionVisionContainer>
      </Section>

      {/* Core Values Section */}
      <Section
        title="Our Core Values"
        subtitle="The principles that guide everything we do"
        centered
      >
        <ValuesContainer>
          {values.map((value) => (
            <ValueCard key={value.id} theme={{ mode: theme.mode }}>
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle theme={{ mode: theme.mode }}>
                {value.title}
              </ValueTitle>
              <ValueDescription theme={{ mode: theme.mode }}>
                {value.description}
              </ValueDescription>
            </ValueCard>
          ))}
        </ValuesContainer>
      </Section>

      {/* Team Section */}
      <Section
        title="Meet Our Team"
        subtitle="The talented people behind our success"
        centered
        alternate
      >
        <TeamContainer>
          <TeamGrid>
            {TEAM_MEMBERS.map((member) => (
              <TeamCard key={member.id} theme={{ mode: theme.mode }}>
                <TeamMemberImage>
                  <img
                    src={
                      member.image ||
                      `https://source.unsplash.com/random/300x300/?portrait&sig=${member.id}`
                    }
                    alt={member.name}
                  />
                </TeamMemberImage>
                <TeamMemberInfo>
                  <TeamMemberName theme={{ mode: theme.mode }}>
                    {member.name}
                  </TeamMemberName>
                  <TeamMemberPosition>{member.position}</TeamMemberPosition>
                  <TeamMemberBio theme={{ mode: theme.mode }}>
                    {member.bio}
                  </TeamMemberBio>
                </TeamMemberInfo>
              </TeamCard>
            ))}
          </TeamGrid>
        </TeamContainer>
      </Section>

      {/* CTA Section */}
      <Section>
        <div
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto",
            padding: "2rem 0",
          }}
        >
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: theme.mode === "dark" ? "#ffffff" : "#333333",
            }}
          >
            Join Us on Our Journey
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "2rem",
              color: theme.mode === "dark" ? "#cccccc" : "#666666",
            }}
          >
            Whether you're looking to partner with us or join our team, we'd
            love to hear from you.
          </p>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <Button variant="primary" to="/contact">
              Contact Us
            </Button>
            <Button variant="secondary" to="/careers">
              Careers
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AboutPage;
