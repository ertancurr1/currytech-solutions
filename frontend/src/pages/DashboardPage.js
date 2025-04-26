import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import AdminPromotion from "../components/AdminPromotion";
import {
  submitTestimonial,
  getUserTestimonials,
} from "../services/testimonialService";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// Page Header Styling
const PageHeader = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1A1A1A" : "#f0f8ff"};
  padding: 4rem 1rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

// Dashboard Content Styling
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardSidebar = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  padding-bottom: 0.8rem;
  border-bottom: 1px solid
    ${(props) => (props.theme.mode === "dark" ? "#333333" : "#eeeeee")};
`;

const SidebarItem = styled.div`
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: ${(props) =>
    props.active
      ? props.theme.mode === "dark"
        ? "#ffffff"
        : "#333333"
      : props.theme.mode === "dark"
      ? "#cccccc"
      : "#666666"};
  background-color: ${(props) =>
    props.active
      ? props.theme.mode === "dark"
        ? "#333333"
        : "#f0f8ff"
      : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#333333" : "#f0f8ff"};
  }
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#252525" : "#f9f9f9"};
`;

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
`;

const ProfileName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const ProfileEmail = styled.p`
  font-size: 0.9rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  margin-bottom: 1rem;
`;

const DashboardContent = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ContentTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  padding-bottom: 0.8rem;
  border-bottom: 1px solid
    ${(props) => (props.theme.mode === "dark" ? "#333333" : "#eeeeee")};
`;

// Form Styling
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
  padding: 2rem;

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

// Testimonials List Styling
const TestimonialsList = styled.div`
  margin-top: 2rem;
`;

const TestimonialItem = styled.div`
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#252525" : "#f9f9f9"};

  &:last-child {
    margin-bottom: 0;
  }
`;

const TestimonialContent = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

const TestimonialMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const AuthorCompany = styled.p`
  font-size: 0.9rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#999999" : "#999999")};
`;

const TestimonialStatus = styled.div`
  font-size: 0.9rem;
  color: ${(props) => (props.isApproved ? "#28a745" : "#ffc107")};
`;

const DashboardPage = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("testimonials");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [userTestimonials, setUserTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch user testimonials
  useEffect(() => {
    const fetchUserTestimonials = async () => {
      try {
        setLoading(true);
        // Use the updated endpoint
        const response = await getUserTestimonials();
        console.log("User testimonials response:", response);

        if (response.success && Array.isArray(response.data)) {
          setUserTestimonials(response.data);
        } else {
          setUserTestimonials([]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setUserTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTestimonials();
  }, []);

  const onSubmitTestimonial = async (data) => {
    try {
      setSubmitting(true);
      setSubmitError(null);

      console.log("Submitting testimonial data:", data);

      // Format the data according to the backend model
      const testimonialData = {
        content: data.content,
        rating: Number(data.rating),
        author: {
          name: user.name,
          company: data.company,
          position: data.position,
        },
      };

      console.log("Formatted testimonial data:", testimonialData);

      // Submit testimonial
      const response = await submitTestimonial(testimonialData);
      console.log("Testimonial submission response:", response);

      if (response.success) {
        setSubmitSuccess(true);
        reset(); // Clear form fields

        // Add the new testimonial to the list
        if (response.data) {
          setUserTestimonials([response.data, ...userTestimonials]);
        }
      }
    } catch (error) {
      console.error("Testimonial submission error:", error);
      setSubmitError("Failed to submit testimonial. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Get first letter of user name for avatar
  const getNameInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader theme={{ mode: theme.mode }}>
        <PageTitle theme={{ mode: theme.mode }}>
          Welcome, {user?.name || "User"}!
        </PageTitle>
        <PageSubtitle theme={{ mode: theme.mode }}>
          This is your personal dashboard where you can manage your account and
          testimonials.
        </PageSubtitle>
      </PageHeader>

      {/* Dashboard Content */}
      <Section>
        <DashboardContainer>
          {/* Sidebar */}
          <DashboardSidebar theme={{ mode: theme.mode }}>
            <AdminPromotion />
            {/* Profile Card */}
            <ProfileCard theme={{ mode: theme.mode }}>
              <ProfileAvatar>{getNameInitial(user?.name)}</ProfileAvatar>
              <ProfileName theme={{ mode: theme.mode }}>
                {user?.name}
              </ProfileName>
              <ProfileEmail theme={{ mode: theme.mode }}>
                {user?.email}
              </ProfileEmail>
              <Button variant="secondary" to="/profile" size="small">
                Edit Profile
              </Button>
            </ProfileCard>

            <SidebarTitle theme={{ mode: theme.mode }}>Dashboard</SidebarTitle>

            <SidebarItem
              active={activeTab === "testimonials"}
              theme={{ mode: theme.mode }}
              onClick={() => setActiveTab("testimonials")}
            >
              My Testimonials
            </SidebarItem>

            <SidebarItem
              active={activeTab === "add-testimonial"}
              theme={{ mode: theme.mode }}
              onClick={() => setActiveTab("add-testimonial")}
            >
              Add New Testimonial
            </SidebarItem>

            <SidebarItem
              active={activeTab === "settings"}
              theme={{ mode: theme.mode }}
              onClick={() => setActiveTab("settings")}
            >
              Account Settings
            </SidebarItem>
          </DashboardSidebar>

          {/* Main Content */}
          <DashboardContent theme={{ mode: theme.mode }}>
            {activeTab === "testimonials" && (
              <>
                <ContentTitle theme={{ mode: theme.mode }}>
                  My Testimonials
                </ContentTitle>

                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "2rem",
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : userTestimonials.length > 0 ? (
                  <TestimonialsList>
                    {userTestimonials.map((testimonial) => (
                      <TestimonialItem
                        key={testimonial._id || testimonial.id}
                        theme={{ mode: theme.mode }}
                      >
                        <TestimonialContent theme={{ mode: theme.mode }}>
                          "{testimonial.content}"
                        </TestimonialContent>
                        <TestimonialMeta>
                          <TestimonialAuthor>
                            <AuthorAvatar>
                              <img
                                src={
                                  testimonial.author.avatar ||
                                  `https://randomuser.me/api/portraits/lego/${
                                    Math.floor(Math.random() * 8) + 1
                                  }.jpg`
                                }
                                alt={testimonial.author.name}
                              />
                            </AuthorAvatar>
                            <AuthorInfo>
                              <AuthorName theme={{ mode: theme.mode }}>
                                {testimonial.author.name}
                              </AuthorName>
                              {testimonial.author.company && (
                                <AuthorCompany theme={{ mode: theme.mode }}>
                                  {testimonial.author.position &&
                                    `${testimonial.author.position}, `}
                                  {testimonial.author.company}
                                </AuthorCompany>
                              )}
                            </AuthorInfo>
                          </TestimonialAuthor>
                          <TestimonialStatus
                            isApproved={testimonial.isApproved}
                          >
                            {testimonial.isApproved
                              ? "Approved"
                              : "Pending Approval"}
                          </TestimonialStatus>
                        </TestimonialMeta>
                      </TestimonialItem>
                    ))}
                  </TestimonialsList>
                ) : (
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    <p
                      style={{
                        color: theme.mode === "dark" ? "#cccccc" : "#666666",
                        marginBottom: "1.5rem",
                      }}
                    >
                      You haven't submitted any testimonials yet.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setActiveTab("add-testimonial")}
                    >
                      Add Your First Testimonial
                    </Button>
                  </div>
                )}
              </>
            )}

            {activeTab === "add-testimonial" && (
              <>
                <ContentTitle theme={{ mode: theme.mode }}>
                  Add New Testimonial
                </ContentTitle>

                {submitSuccess ? (
                  <SuccessMessage theme={{ mode: theme.mode }}>
                    <h3>Testimonial Submitted Successfully!</h3>
                    <p>
                      Thank you for your feedback. Your testimonial has been
                      submitted and is pending approval.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setSubmitSuccess(false)}
                    >
                      Submit Another Testimonial
                    </Button>
                  </SuccessMessage>
                ) : (
                  <>
                    {submitError && (
                      <Alert
                        severity="error"
                        style={{ marginBottom: "1.5rem" }}
                      >
                        {submitError}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit(onSubmitTestimonial)}>
                      <FormGroup>
                        <FormLabel theme={{ mode: theme.mode }}>
                          Your Testimonial
                        </FormLabel>
                        <FormTextarea
                          theme={{ mode: theme.mode }}
                          error={errors.content}
                          placeholder="Share your experience with CurryTech Solutions..."
                          {...register("content", {
                            required: "Testimonial content is required",
                            minLength: {
                              value: 10,
                              message:
                                "Testimonial must be at least 10 characters",
                            },
                          })}
                        />
                        {errors.content && (
                          <ErrorMessage>{errors.content.message}</ErrorMessage>
                        )}
                      </FormGroup>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "1.5rem",
                        }}
                      >
                        <FormGroup>
                          <FormLabel theme={{ mode: theme.mode }}>
                            Company
                          </FormLabel>
                          <FormInput
                            type="text"
                            theme={{ mode: theme.mode }}
                            placeholder="Your company name"
                            {...register("company")}
                          />
                        </FormGroup>

                        <FormGroup>
                          <FormLabel theme={{ mode: theme.mode }}>
                            Position
                          </FormLabel>
                          <FormInput
                            type="text"
                            theme={{ mode: theme.mode }}
                            placeholder="Your job title"
                            {...register("position")}
                          />
                        </FormGroup>
                      </div>

                      <FormGroup>
                        <FormLabel theme={{ mode: theme.mode }}>
                          Rating (1-5)
                        </FormLabel>
                        <FormInput
                          type="number"
                          min="1"
                          max="5"
                          theme={{ mode: theme.mode }}
                          error={errors.rating}
                          {...register("rating", {
                            required: "Rating is required",
                            min: {
                              value: 1,
                              message: "Rating must be at least 1",
                            },
                            max: {
                              value: 5,
                              message: "Rating must not exceed 5",
                            },
                          })}
                        />
                        {errors.rating && (
                          <ErrorMessage>{errors.rating.message}</ErrorMessage>
                        )}
                      </FormGroup>

                      <Button
                        type="submit"
                        variant="primary"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <CircularProgress
                              size={20}
                              color="inherit"
                              style={{ marginRight: "0.5rem" }}
                            />
                            Submitting...
                          </>
                        ) : (
                          "Submit Testimonial"
                        )}
                      </Button>
                    </Form>
                  </>
                )}
              </>
            )}

            {activeTab === "settings" && (
              <>
                <ContentTitle theme={{ mode: theme.mode }}>
                  Account Settings
                </ContentTitle>
                <p
                  style={{
                    color: theme.mode === "dark" ? "#cccccc" : "#666666",
                  }}
                >
                  Account settings functionality will be added in a future
                  update.
                </p>
              </>
            )}
          </DashboardContent>
        </DashboardContainer>
      </Section>
    </>
  );
};

export default DashboardPage;
