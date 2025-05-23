import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { SERVICES } from "../utils/constants";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { getTestimonials } from "../services/testimonialService";
import technologyImage from "../assets/technology-features.png";

// Hero Section Styling
const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 1rem;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#121212" : "#f0f8ff"};
  position: relative;
  overflow: hidden;

  @media (min-width: 992px) {
    min-height: 80vh;
    padding: 0 1rem;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) =>
    props.theme.mode === "dark"
      ? "linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(0, 0, 0, 0.9))"
      : "linear-gradient(135deg, rgba(240, 248, 255, 0.95), rgba(230, 240, 255, 0.9))"};
  z-index: 1;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

// Services Section Styling
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled.div`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #007bff;
`;

const ServiceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  margin-bottom: 1.5rem;
`;

// Features Section Styling
const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
`;

const FeatureIcon = styled.div`
  margin-right: 1rem;
  color: #007bff;
  flex-shrink: 0;
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// Testimonials Section Styling
const TestimonialsContainer = styled.div`
  margin-top: 3rem;
`;

const TestimonialSlider = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 0.5rem;
  margin: 0 -0.5rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #007bff;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#333333" : "#dddddd"};
    border-radius: 3px;
  }
`;

const TestimonialCard = styled.div`
  min-width: 300px;
  flex: 1;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  scroll-snap-align: start;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
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

// Stats Section Styling
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

// CTA Section Styling
const CTAContainer = styled.div`
  text-align: center;
  padding: 3rem;
  border-radius: 8px;
  background-color: #007bff;
  color: #ffffff;
`;

const CTATitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await getTestimonials();

        // Log for debugging
        console.log("Homepage testimonials response:", response);

        // Check if we have data in the proper format
        if (response.success && Array.isArray(response.data)) {
          setTestimonials(response.data);
        } else if (Array.isArray(response.data?.data)) {
          // Sometimes the API might nest data one level deeper
          setTestimonials(response.data.data);
        } else {
          // Fallback to empty array if no proper data format is found
          setTestimonials([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Set empty array on error
        setTestimonials([]);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroContainer theme={{ mode: theme.mode }}>
        <HeroOverlay theme={{ mode: theme.mode }} />
        <HeroContent>
          <HeroTitle theme={{ mode: theme.mode }}>
            Innovative IT Solutions for Modern Businesses
          </HeroTitle>
          <HeroSubtitle theme={{ mode: theme.mode }}>
            We help businesses transform and grow with cutting-edge technology
            solutions tailored to their unique needs.
          </HeroSubtitle>
          <ButtonGroup>
            <Button variant="primary" size="large" to="/services">
              Our Services
            </Button>
            <Button variant="secondary" size="large" to="/contact">
              Get in Touch
            </Button>
          </ButtonGroup>
        </HeroContent>
      </HeroContainer>

      {/* Services Section */}
      <Section
        title="Our Services"
        subtitle="We provide a wide range of IT services to help your business thrive in the digital era."
        centered
        alternate
      >
        <ServicesGrid>
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} theme={{ mode: theme.mode }}>
              <ServiceIcon>
                <span>{service.icon}</span>
              </ServiceIcon>
              <ServiceTitle theme={{ mode: theme.mode }}>
                {service.title}
              </ServiceTitle>
              <ServiceDescription theme={{ mode: theme.mode }}>
                {service.description}
              </ServiceDescription>
              <Button variant="secondary" to={`/services#${service.id}`}>
                Learn More <ArrowForwardIcon style={{ marginLeft: "0.5rem" }} />
              </Button>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>

      {/* Features Section */}
      <Section>
        <FeaturesContainer>
          <ImgContainer>
            <img src={technologyImage} alt="Technology Features" />
          </ImgContainer>
          <div>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: theme.mode === "dark" ? "#ffffff" : "#333333",
              }}
            >
              Why Choose CurryTech Solutions?
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "2rem",
                color: theme.mode === "dark" ? "#cccccc" : "#666666",
              }}
            >
              We combine technical expertise with business acumen to deliver
              solutions that drive growth and efficiency.
            </p>

            <FeaturesList>
              <FeatureItem>
                <FeatureIcon>
                  <CheckCircleOutlineIcon />
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle theme={{ mode: theme.mode }}>
                    Experienced Team
                  </FeatureTitle>
                  <FeatureDescription theme={{ mode: theme.mode }}>
                    Our team brings decades of combined experience in diverse
                    technology domains.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>
                  <CheckCircleOutlineIcon />
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle theme={{ mode: theme.mode }}>
                    Custom Solutions
                  </FeatureTitle>
                  <FeatureDescription theme={{ mode: theme.mode }}>
                    We create tailored solutions that address your specific
                    business challenges.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>
                  <CheckCircleOutlineIcon />
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle theme={{ mode: theme.mode }}>
                    Cutting-Edge Technology
                  </FeatureTitle>
                  <FeatureDescription theme={{ mode: theme.mode }}>
                    We leverage the latest technologies to build future-proof
                    solutions.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>
                  <CheckCircleOutlineIcon />
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle theme={{ mode: theme.mode }}>
                    Ongoing Support
                  </FeatureTitle>
                  <FeatureDescription theme={{ mode: theme.mode }}>
                    We provide reliable support and maintenance to ensure your
                    systems run smoothly.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            </FeaturesList>

            <div style={{ marginTop: "2rem" }}>
              <Button variant="primary" to="/about">
                Learn More About Us
              </Button>
            </div>
          </div>
        </FeaturesContainer>
      </Section>

      {/* Testimonials Section */}
      <Section
        title="What Our Clients Say"
        subtitle="Don't just take our word for it. Here's what our clients have to say about our services."
        centered
        alternate
      >
        {loading ? (
          <p>Loading testimonials...</p>
        ) : testimonials.length > 0 ? (
          <TestimonialsContainer>
            <TestimonialSlider theme={{ mode: theme.mode }}>
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id || testimonial.id}
                  theme={{ mode: theme.mode }}
                >
                  <TestimonialText theme={{ mode: theme.mode }}>
                    "{testimonial.content || testimonial.text}"
                  </TestimonialText>
                  <TestimonialAuthor>
                    <AuthorAvatar>
                      <img
                        src={
                          testimonial.author?.avatar ||
                          `https://randomuser.me/api/portraits/lego/${
                            Math.floor(Math.random() * 8) + 1
                          }.jpg`
                        }
                        alt={
                          typeof testimonial.author === "object"
                            ? testimonial.author.name
                            : testimonial.author
                        }
                      />
                    </AuthorAvatar>
                    <AuthorInfo>
                      <AuthorName theme={{ mode: theme.mode }}>
                        {typeof testimonial.author === "object"
                          ? testimonial.author.name
                          : testimonial.author}
                      </AuthorName>
                      <AuthorCompany theme={{ mode: theme.mode }}>
                        {typeof testimonial.author === "object"
                          ? `${
                              testimonial.author.position
                                ? `${testimonial.author.position}, `
                                : ""
                            }${testimonial.author.company}`
                          : testimonial.company}
                      </AuthorCompany>
                    </AuthorInfo>
                  </TestimonialAuthor>
                </TestimonialCard>
              ))}
            </TestimonialSlider>
          </TestimonialsContainer>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p style={{ color: theme.mode === "dark" ? "#cccccc" : "#666666" }}>
              No testimonials available yet. Be the first to share your
              experience!
            </p>
            <Button
              variant="primary"
              to="/dashboard"
              style={{ marginTop: "1rem" }}
            >
              Submit a Testimonial
            </Button>
          </div>
        )}
      </Section>

      {/* Stats Section */}
      <Section>
        <StatsContainer>
          <StatItem>
            <StatNumber>500+</StatNumber>
            <StatLabel theme={{ mode: theme.mode }}>
              Projects Completed
            </StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>250+</StatNumber>
            <StatLabel theme={{ mode: theme.mode }}>Happy Clients</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>15+</StatNumber>
            <StatLabel theme={{ mode: theme.mode }}>Years Experience</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>40+</StatNumber>
            <StatLabel theme={{ mode: theme.mode }}>
              Expert Team Members
            </StatLabel>
          </StatItem>
        </StatsContainer>
      </Section>

      {/* CTA Section */}
      <Section padding="0 1rem 4rem">
        <CTAContainer>
          <CTATitle>Ready to Transform Your Business?</CTATitle>
          <CTADescription>
            Get in touch with our team today to discuss your project and how we
            can help you achieve your business goals.
          </CTADescription>
          <Button
            variant="secondary"
            size="large"
            to="/contact"
            style={{ color: "#ffffff", borderColor: "#ffffff" }}
          >
            Contact Us Today
          </Button>
        </CTAContainer>
      </Section>
    </>
  );
};

export default HomePage;
