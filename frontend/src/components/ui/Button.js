import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledButton = styled.button`
  padding: ${(props) =>
    props.size === "large" ? "1rem 2rem" : "0.75rem 1.5rem"};
  background-color: ${(props) =>
    props.variant === "primary"
      ? "#007bff"
      : props.variant === "secondary"
      ? "transparent"
      : props.variant === "success"
      ? "#28a745"
      : "#007bff"};
  color: ${(props) => (props.variant === "secondary" ? "#007bff" : "#ffffff")};
  border: ${(props) =>
    props.variant === "secondary" ? "1px solid #007bff" : "none"};
  border-radius: 4px;
  font-weight: 600;
  font-size: ${(props) => (props.size === "large" ? "1.1rem" : "0.9rem")};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary"
        ? "#0056b3"
        : props.variant === "secondary"
        ? "rgba(0, 123, 255, 0.1)"
        : props.variant === "success"
        ? "#218838"
        : "#0056b3"};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  ${(props) =>
    props.fullWidth &&
    `
    width: 100%;
  `}

  & > svg {
    margin-right: ${(props) => (props.iconOnly ? "0" : "0.5rem")};
  }
`;

// const LinkButton = StyledButton.withComponent(Link);

const LinkButton = styled(Link)`
  padding: ${(props) =>
    props.size === "large" ? "1rem 2rem" : "0.75rem 1.5rem"};
  background-color: ${(props) =>
    props.variant === "primary"
      ? "#007bff"
      : props.variant === "secondary"
      ? "transparent"
      : props.variant === "success"
      ? "#28a745"
      : "#007bff"};
  color: ${(props) => (props.variant === "secondary" ? "#007bff" : "#ffffff")};
  border: ${(props) =>
    props.variant === "secondary" ? "1px solid #007bff" : "none"};
  border-radius: 4px;
  font-weight: 600;
  font-size: ${(props) => (props.size === "large" ? "1.1rem" : "0.9rem")};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary"
        ? "#0056b3"
        : props.variant === "secondary"
        ? "rgba(0, 123, 255, 0.1)"
        : props.variant === "success"
        ? "#218838"
        : "#0056b3"};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  ${(props) =>
    props.fullWidth &&
    `
    width: 100%;
  `}

  & > svg {
    margin-right: ${(props) => (props.iconOnly ? "0" : "0.5rem")};
  }
`;

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  to,
  fullWidth,
  onClick,
  type = "button",
  disabled,
  iconOnly,
  ...rest
}) => {
  if (to) {
    return (
      <LinkButton
        to={to}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        iconOnly={iconOnly}
        {...rest}
      >
        {children}
      </LinkButton>
    );
  }

  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      disabled={disabled}
      iconOnly={iconOnly}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
