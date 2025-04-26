import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import { login } from "../../services/authService";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Auth Container Styling
const AuthContainer = styled.div`
  display: flex;
  align-items: stretch;
  min-height: calc(100vh - 140px); // Adjusted for header/footer

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const AuthImage = styled.div`
  flex: 1;
  background-image: url("https://source.unsplash.com/random/1200x800/?technology,security");
  background-size: cover;
  background-position: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.3)
    );
  }

  @media (max-width: 992px) {
    min-height: 300px;
  }
`;

const AuthImageContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  width: 80%;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;

    @media (max-width: 992px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;

    @media (max-width: 992px) {
      font-size: 1rem;
    }
  }
`;

const AuthFormContainer = styled.div`
  flex: 1;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#121212" : "#f5f5f5"};

  @media (max-width: 992px) {
    padding: 3rem 1.5rem;
  }
`;

const AuthFormBox = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
`;

const AuthFormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const AuthFormSubtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div``;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => (props.theme.mode === "dark" ? "#999999" : "#999999")};
`;

const TogglePasswordIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => (props.theme.mode === "dark" ? "#999999" : "#999999")};
  cursor: pointer;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.8rem;
  border: 1px solid
    ${(props) =>
      props.error
        ? "#dc3545"
        : props.theme.mode === "dark"
        ? "#444444"
        : "#dddddd"};
  border-radius: 4px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333333" : "#ffffff"};
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#dc3545" : "#007bff")};
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.3rem;
`;

const FormDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  &:before,
  &:after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#444444" : "#dddddd"};
  }

  span {
    padding: 0 1rem;
    color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
    font-size: 0.9rem;
  }
`;

const RememberForgotRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  cursor: pointer;

  input {
    margin-right: 0.5rem;
  }
`;

const ForgotPasswordLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  button {
    flex: 1;
    padding: 0.8rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    font-weight: 500;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#333333" : "#f5f5f5"};
    color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) =>
        props.theme.mode === "dark" ? "#444444" : "#e5e5e5"};
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 0.5rem;
    }
  }
`;

const SignUpPrompt = styled.p`
  margin-top: 2rem;
  text-align: center;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
  const { theme } = useContext(ThemeContext);
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setLoginError(null);

      const response = await login(data);

      authLogin(response.token);

      navigate(from, { replace: true });
    } catch (error) {
      setLoginError(
        error.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthContainer>
      <AuthImage>
        <AuthImageContent>
          <h2>Welcome Back!</h2>
          <p>
            Log in to access your account and explore all the features of
            CurryTech Solutions.
          </p>
        </AuthImageContent>
      </AuthImage>

      <AuthFormContainer theme={{ mode: theme.mode }}>
        <AuthFormBox theme={{ mode: theme.mode }}>
          <AuthFormTitle theme={{ mode: theme.mode }}>Log In</AuthFormTitle>
          <AuthFormSubtitle theme={{ mode: theme.mode }}>
            Enter your credentials to access your account
          </AuthFormSubtitle>

          {loginError && (
            <Alert severity="error" style={{ marginBottom: "1.5rem" }}>
              {loginError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormLabel theme={{ mode: theme.mode }}>Email Address</FormLabel>
              <InputGroup>
                <InputIcon>
                  <EmailIcon />
                </InputIcon>
                <FormInput
                  type="email"
                  placeholder="Your email address"
                  theme={{ mode: theme.mode }}
                  error={errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </InputGroup>
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel theme={{ mode: theme.mode }}>Password</FormLabel>
              <InputGroup>
                <InputIcon>
                  <LockIcon />
                </InputIcon>
                <FormInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  theme={{ mode: theme.mode }}
                  error={errors.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <TogglePasswordIcon onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </TogglePasswordIcon>
              </InputGroup>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </FormGroup>

            <RememberForgotRow>
              <RememberMeLabel theme={{ mode: theme.mode }}>
                <input type="checkbox" {...register("rememberMe")} />
                Remember me
              </RememberMeLabel>
              <ForgotPasswordLink to="/auth/forgot-password">
                Forgot Password?
              </ForgotPasswordLink>
            </RememberForgotRow>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <CircularProgress
                    size={20}
                    color="inherit"
                    style={{ marginRight: "0.5rem" }}
                  />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </Form>

          <FormDivider theme={{ mode: theme.mode }}>
            <span>or</span>
          </FormDivider>

          <SocialButtons theme={{ mode: theme.mode }}>
            <button type="button">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
              />
              Google
            </button>
            <button type="button">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                alt="Facebook"
              />
              Facebook
            </button>
          </SocialButtons>

          <SignUpPrompt theme={{ mode: theme.mode }}>
            Don't have an account? <Link to="/auth/register">Sign Up</Link>
          </SignUpPrompt>
        </AuthFormBox>
      </AuthFormContainer>
    </AuthContainer>
  );
};

export default LoginPage;
