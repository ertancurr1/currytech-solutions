import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { submitContactForm } from "../services/contactService";
import { useForm } from "react-hook-form";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

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

// Contact Info and Form Layout
const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

// Contact Info Styling
const ContactInfoContainer = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
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
`;

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ContactInfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #007bff;
  flex-shrink: 0;
`;

const ContactInfoText = styled.div`
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333333" : "#f0f0f0"};
  border-radius: 50%;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: #ffffff;
    transform: translateY(-3px);
  }
`;

// Contact Form Styling
const ContactFormContainer = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ContactFormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
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
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
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
  min-height: 150px;
  resize: vertical;

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

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;

  svg {
    font-size: 4rem;
    color: #28a745;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  }

  p {
    color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
    margin-bottom: 2rem;
  }
`;

// Map Container Styling
const MapContainer = styled.div`
  margin-top: 4rem;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ContactPage = () => {
  const { theme } = useContext(ThemeContext);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setSubmitError(null);

      const response = await submitContactForm(data);

      if (response.success) {
        setSubmitSuccess(true);
        reset();
      }
    } catch (error) {
      setSubmitError(
        "There was an error submitting your message. Please try again later."
      );
      console.error("Contact form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader theme={{ mode: theme.mode }}>
        <PageTitle theme={{ mode: theme.mode }}>Contact Us</PageTitle>
        <PageSubtitle theme={{ mode: theme.mode }}>
          Get in touch with our team to discuss your project or ask any
          questions.
        </PageSubtitle>
      </PageHeader>

      {/* Contact Section */}
      <Section>
        <ContactContainer>
          {/* Contact Information */}
          <ContactInfoContainer theme={{ mode: theme.mode }}>
            <ContactInfoTitle theme={{ mode: theme.mode }}>
              Contact Information
            </ContactInfoTitle>
            <ContactInfoList>
              <ContactInfoItem>
                <ContactInfoIcon>
                  <LocationOnIcon />
                </ContactInfoIcon>
                <ContactInfoText theme={{ mode: theme.mode }}>
                  <h4>Our Location</h4>
                  <p>Djon Kenedi Street 27, Skopje, RNM 1010</p>
                </ContactInfoText>
              </ContactInfoItem>

              <ContactInfoItem>
                <ContactInfoIcon>
                  <PhoneIcon />
                </ContactInfoIcon>
                <ContactInfoText theme={{ mode: theme.mode }}>
                  <h4>Phone Number</h4>
                  <p>+389 72 520 093</p>
                </ContactInfoText>
              </ContactInfoItem>

              <ContactInfoItem>
                <ContactInfoIcon>
                  <EmailIcon />
                </ContactInfoIcon>
                <ContactInfoText theme={{ mode: theme.mode }}>
                  <h4>Email Address</h4>
                  <p>info@currytech.com</p>
                </ContactInfoText>
              </ContactInfoItem>

              <ContactInfoItem>
                <ContactInfoIcon>
                  <AccessTimeIcon />
                </ContactInfoIcon>
                <ContactInfoText theme={{ mode: theme.mode }}>
                  <h4>Working Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Weekend: Closed</p>
                </ContactInfoText>
              </ContactInfoItem>
            </ContactInfoList>

            <div>
              <h4
                style={{
                  marginBottom: "1rem",
                  color: theme.mode === "dark" ? "#ffffff" : "#333333",
                }}
              >
                Follow us on social media
              </h4>
              <SocialLinks>
                <SocialLink
                  href="https://www.facebook.com/ertancurr1"
                  target="_blank"
                  rel="noopener noreferrer"
                  theme={{ mode: theme.mode }}
                >
                  <FacebookIcon />
                </SocialLink>
                <SocialLink
                  href="https://x.com/ErtanCurri"
                  target="_blank"
                  rel="noopener noreferrer"
                  theme={{ mode: theme.mode }}
                >
                  <TwitterIcon />
                </SocialLink>
                <SocialLink
                  href="https://www.linkedin.com/in/ertancurri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  theme={{ mode: theme.mode }}
                >
                  <LinkedInIcon />
                </SocialLink>
                <SocialLink
                  href="https://www.instagram.com/ertancurr1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  theme={{ mode: theme.mode }}
                >
                  <InstagramIcon />
                </SocialLink>
              </SocialLinks>
            </div>
          </ContactInfoContainer>

          {/* Contact Form */}
          <ContactFormContainer theme={{ mode: theme.mode }}>
            {submitSuccess ? (
              <SuccessMessage theme={{ mode: theme.mode }}>
                <CheckCircleIcon fontSize="large" />
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you for contacting us. We will get back to you as soon
                  as possible.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setSubmitSuccess(false)}
                >
                  Send Another Message
                </Button>
              </SuccessMessage>
            ) : (
              <>
                <ContactFormTitle theme={{ mode: theme.mode }}>
                  Send Us a Message
                </ContactFormTitle>

                {submitError && (
                  <Alert severity="error" style={{ marginBottom: "1.5rem" }}>
                    {submitError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <FormLabel theme={{ mode: theme.mode }}>Name</FormLabel>
                    <FormInput
                      type="text"
                      theme={{ mode: theme.mode }}
                      error={errors.name}
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <FormLabel theme={{ mode: theme.mode }}>Email</FormLabel>
                    <FormInput
                      type="email"
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
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <FormLabel theme={{ mode: theme.mode }}>
                      Phone (Optional)
                    </FormLabel>
                    <FormInput
                      type="tel"
                      theme={{ mode: theme.mode }}
                      error={errors.phone}
                      {...register("phone", {
                        pattern: {
                          value: /^[0-9+\-()\s]*$/,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                    {errors.phone && (
                      <ErrorMessage>{errors.phone.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <FormLabel theme={{ mode: theme.mode }}>Subject</FormLabel>
                    <FormInput
                      type="text"
                      theme={{ mode: theme.mode }}
                      error={errors.subject}
                      {...register("subject", {
                        required: "Subject is required",
                        minLength: {
                          value: 5,
                          message: "Subject must be at least 5 characters",
                        },
                      })}
                    />
                    {errors.subject && (
                      <ErrorMessage>{errors.subject.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup fullWidth>
                    <FormLabel theme={{ mode: theme.mode }}>Message</FormLabel>
                    <FormTextarea
                      theme={{ mode: theme.mode }}
                      error={errors.message}
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                    />
                    {errors.message && (
                      <ErrorMessage>{errors.message.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup fullWidth>
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      disabled={submitting}
                      style={{ marginTop: "1rem" }}
                    >
                      {submitting ? (
                        <>
                          <CircularProgress
                            size={20}
                            color="inherit"
                            style={{ marginRight: "0.5rem" }}
                          />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </FormGroup>
                </Form>
              </>
            )}
          </ContactFormContainer>
        </ContactContainer>

        {/* Map Section */}
        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d670.6603756956974!2d21.433987000000005!3d42.01282120000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13541506d144751f%3A0x29675ab784656022!2sJohn%20Kennedy%2027%2C%20Skopje%201000!5e1!3m2!1sen!2smk!4v1745676262982!5m2!1sen!2smk"
            allowFullScreen
            title="CurryTech Solutions Office Location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapContainer>
      </Section>

      {/* FAQ Section */}
      <Section title="Frequently Asked Questions" centered alternate>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              marginBottom: "2rem",
              padding: "1.5rem",
              borderRadius: "8px",
              backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#ffffff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: "1rem",
                color: theme.mode === "dark" ? "#ffffff" : "#333333",
              }}
            >
              What services does CurryTech Solutions offer?
            </h3>
            <p
              style={{
                color: theme.mode === "dark" ? "#cccccc" : "#666666",
              }}
            >
              We offer a range of IT services including web development, mobile
              app development, cloud solutions, UI/UX design, IT consulting, and
              cybersecurity services. Visit our Services page for more details.
            </p>
          </div>

          <div
            style={{
              marginBottom: "2rem",
              padding: "1.5rem",
              borderRadius: "8px",
              backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#ffffff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: "1rem",
                color: theme.mode === "dark" ? "#ffffff" : "#333333",
              }}
            >
              How quickly can you respond to my inquiry?
            </h3>
            <p
              style={{
                color: theme.mode === "dark" ? "#cccccc" : "#666666",
              }}
            >
              We typically respond to all inquiries within 24-48 hours during
              business days. For urgent matters, we recommend calling our office
              directly.
            </p>
          </div>

          <div
            style={{
              marginBottom: "2rem",
              padding: "1.5rem",
              borderRadius: "8px",
              backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#ffffff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: "1rem",
                color: theme.mode === "dark" ? "#ffffff" : "#333333",
              }}
            >
              Do you work with clients globally?
            </h3>
            <p
              style={{
                color: theme.mode === "dark" ? "#cccccc" : "#666666",
              }}
            >
              Yes, we work with clients worldwide. Our team is experienced in
              remote collaboration and we use various tools to ensure effective
              communication regardless of time zones or geographical locations.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default ContactPage;
