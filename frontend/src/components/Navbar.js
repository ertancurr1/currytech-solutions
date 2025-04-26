import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { NAV_LINKS } from "../utils/constants";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#212121" : "#ffffff"};
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  display: flex;
  align-items: center;

  &:hover {
    color: #007bff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  margin: 0 1rem;
  font-weight: 500;
  position: relative;
  color: ${(props) =>
    props.active
      ? "#007bff"
      : props.theme.mode === "dark"
      ? "#ffffff"
      : "#333333"};

  &:after {
    content: "";
    position: absolute;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #007bff;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled(Link)`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border-radius: 4px;
  background-color: ${(props) => (props.primary ? "#007bff" : "transparent")};
  color: ${(props) =>
    props.primary
      ? "#ffffff"
      : props.theme.mode === "dark"
      ? "#ffffff"
      : "#333333"};
  border: ${(props) => (props.primary ? "none" : "1px solid #007bff")};
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#0056b3" : "rgba(0, 123, 255, 0.1)"};
  }
`;

const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  margin-left: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#212121" : "#ffffff"};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  margin: 1rem 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${(props) =>
    props.active
      ? "#007bff"
      : props.theme.mode === "dark"
      ? "#ffffff"
      : "#333333"};

  &:hover {
    color: #007bff;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  font-size: 1.5rem;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 2rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer theme={{ mode: theme.mode }}>
        <Logo to="/" theme={{ mode: theme.mode }}>
          CurryTech Solutions
        </Logo>

        <NavLinks>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              active={location.pathname === link.path}
              theme={{ mode: theme.mode }}
            >
              {link.title}
            </NavLink>
          ))}
        </NavLinks>

        <div style={{ display: "flex", alignItems: "center" }}>
          <AuthButtons>
            {user ? (
              <>
                <Button to="/dashboard" theme={{ mode: theme.mode }}>
                  Dashboard
                </Button>
                <Button to="/" onClick={logout} theme={{ mode: theme.mode }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button to="/auth/login" theme={{ mode: theme.mode }}>
                  Login
                </Button>
                <Button
                  to="/auth/register"
                  primary
                  theme={{ mode: theme.mode }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </AuthButtons>

          <ThemeToggle onClick={toggleTheme} theme={{ mode: theme.mode }}>
            {theme.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </ThemeToggle>

          <MobileMenuButton
            onClick={toggleMobileMenu}
            theme={{ mode: theme.mode }}
          >
            <MenuIcon />
          </MobileMenuButton>
        </div>
      </NavbarContainer>

      <Overlay isOpen={mobileMenuOpen} onClick={closeMobileMenu} />

      <MobileMenu isOpen={mobileMenuOpen} theme={{ mode: theme.mode }}>
        <CloseButton onClick={closeMobileMenu} theme={{ mode: theme.mode }}>
          <CloseIcon />
        </CloseButton>

        {NAV_LINKS.map((link) => (
          <MobileNavLink
            key={link.path}
            to={link.path}
            active={location.pathname === link.path}
            theme={{ mode: theme.mode }}
            onClick={closeMobileMenu}
          >
            {link.title}
          </MobileNavLink>
        ))}

        {user ? (
          <>
            <MobileNavLink
              to="/dashboard"
              theme={{ mode: theme.mode }}
              onClick={closeMobileMenu}
            >
              Dashboard
            </MobileNavLink>
            <MobileNavLink
              to="/"
              theme={{ mode: theme.mode }}
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
            >
              Logout
            </MobileNavLink>
          </>
        ) : (
          <>
            <MobileNavLink
              to="/auth/login"
              theme={{ mode: theme.mode }}
              onClick={closeMobileMenu}
            >
              Login
            </MobileNavLink>
            <MobileNavLink
              to="/auth/register"
              theme={{ mode: theme.mode }}
              onClick={closeMobileMenu}
            >
              Sign Up
            </MobileNavLink>
          </>
        )}

        <div
          style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
        >
          <span>Toggle Theme</span>
          <ThemeToggle
            onClick={toggleTheme}
            theme={{ mode: theme.mode }}
            style={{ marginLeft: "0.5rem" }}
          >
            {theme.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </ThemeToggle>
        </div>
      </MobileMenu>
    </>
  );
};

export default Navbar;
