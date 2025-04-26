import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import { NAV_LINKS } from "../utils/constants";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const FooterContainer = styled.footer`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#121212" : "#1a1a1a"};
  color: #ffffff;
  padding: 3rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  margin-bottom: 2rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 50px;
    height: 2px;
    background-color: #007bff;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  margin-bottom: 0.8rem;
  color: #cccccc;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #333333;
  border-radius: 50%;
  margin-right: 0.8rem;
  color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    transform: translateY(-3px);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #cccccc;
`;

const IconWrapper = styled.span`
  margin-right: 0.8rem;
  color: #007bff;
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 1rem;
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 4px 0 0 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const NewsletterButton = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: #007bff;
  border: none;
  border-radius: 0 4px 4px 0;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CopyrightSection = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #333333;
  color: #cccccc;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer theme={{ mode: theme.mode }}>
      <FooterContent>
        <FooterSection>
          <FooterTitle>CurryTech Solutions</FooterTitle>
          <p>
            Delivering innovative technology solutions to help businesses thrive
            in the digital era.
          </p>
          <SocialLinks>
            <SocialLink
              href="https://www.facebook.com/ertancurr1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </SocialLink>
            <SocialLink
              href="https://x.com/ErtanCurri"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/ertancurri/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/ertancurr1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          {NAV_LINKS.map((link) => (
            <FooterLink key={link.path} to={link.path}>
              {link.title}
            </FooterLink>
          ))}
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <ContactItem>
            <IconWrapper>
              <LocationOnIcon />
            </IconWrapper>
            <span>Djon Kenedi Street 27, Skopje, RNM 1010</span>
          </ContactItem>
          <ContactItem>
            <IconWrapper>
              <PhoneIcon />
            </IconWrapper>
            <span>+389 72 520 093</span>
          </ContactItem>
          <ContactItem>
            <IconWrapper>
              <EmailIcon />
            </IconWrapper>
            <span>info@currytech.com</span>
          </ContactItem>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Subscribe</FooterTitle>
          <p>Subscribe to our newsletter to receive updates and news.</p>
          <NewsletterForm>
            <NewsletterInput type="email" placeholder="Your Email" />
            <NewsletterButton type="submit">Subscribe</NewsletterButton>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <CopyrightSection>
        <p>&copy; {currentYear} CurryTech Solutions. All rights reserved.</p>
      </CopyrightSection>
    </FooterContainer>
  );
};

export default Footer;
