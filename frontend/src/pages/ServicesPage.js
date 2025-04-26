import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { SERVICES } from "../utils/constants";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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

// Services Grid Styling
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ServiceCard = styled.div`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  transition: all 0.3s ease;
  cursor: pointer;

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

// Service Detail Modal Styling
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(-50px)"};
  transition: all 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const ModalSubtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

// Process Section Styling
const ProcessContainer = styled.div`
  margin-top: 3rem;
`;

const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const ProcessStep = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007bff;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

// FAQ Section Styling
const FaqContainer = styled.div`
  margin-top: 3rem;
`;

const FaqItem = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid
    ${(props) => (props.theme.mode === "dark" ? "#333333" : "#eeeeee")};
  padding-bottom: 1.5rem;

  &:last-child {
    border-bottom: none;
  }
`;

const FaqQuestion = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:after {
    content: "${(props) => (props.isOpen ? "-" : "+")}";
    font-size: 1.5rem;
  }
`;

const FaqAnswer = styled.div`
  font-size: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  padding-top: 1rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const extendedServiceDescriptions = {
  1: {
    title: "Web Development",
    description:
      "Our comprehensive web development services deliver custom, responsive, and user-friendly websites and web applications tailored to your specific business needs.",
    benefits: [
      "Fully responsive designs that work seamlessly across all devices",
      "User-friendly interfaces designed with your target audience in mind",
      "Optimized performance for fast loading times",
      "SEO-friendly architecture to improve your search engine rankings",
      "Secure and scalable solutions that grow with your business",
    ],
    technologies: [
      "Frontend: React.js, Angular, Vue.js",
      "Backend: Node.js, Python, PHP, Ruby on Rails",
      "Databases: MongoDB, MySQL, PostgreSQL",
      "CMS: WordPress, Drupal, Custom Solutions",
    ],
    faqs: [
      {
        question: "How long does it typically take to develop a website?",
        answer:
          "The timeline for website development varies depending on the complexity of the project. A simple informational website might take 4-6 weeks, while a complex web application could take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
      },
      {
        question: "Do you provide website maintenance after launch?",
        answer:
          "Yes, we offer ongoing maintenance packages to ensure your website remains secure, up-to-date, and performing optimally. Our maintenance services include regular updates, security patches, performance optimization, and technical support.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "Absolutely! We specialize in website redesigns that modernize your online presence while preserving your brand identity and improving user experience. We can also help migrate your content and ensure a smooth transition to the new design.",
      },
    ],
  },
};

const processSteps = [
  {
    number: 1,
    title: "Discovery & Planning",
    description:
      "We start by understanding your business goals, target audience, and requirements. This phase includes market research, competitor analysis, and creating a detailed project roadmap.",
  },
  {
    number: 2,
    title: "Design & Prototyping",
    description:
      "Our design team creates wireframes and visual designs that align with your brand identity. We develop interactive prototypes to visualize the user experience before moving to development.",
  },
  {
    number: 3,
    title: "Development & Testing",
    description:
      "Our developers build your solution using the latest technologies and best practices. Rigorous testing ensures your product is robust, secure, and performs optimally.",
  },
  {
    number: 4,
    title: "Deployment & Training",
    description:
      "We handle the deployment process and provide comprehensive training to ensure your team can effectively manage and utilize the new solution.",
  },
  {
    number: 5,
    title: "Support & Optimization",
    description:
      "Our relationship continues after launch with ongoing support, maintenance, and data-driven optimization to ensure long-term success.",
  },
];

const ServicesPage = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedService, setSelectedService] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(null);

  const openServiceModal = (serviceId) => {
    setSelectedService(SERVICES.find((service) => service.id === serviceId));
    document.body.style.overflow = "hidden";
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const extendedDescription = selectedService
    ? extendedServiceDescriptions[selectedService.id]
    : null;

  return (
    <>
      {/* Page Header */}
      <PageHeader theme={{ mode: theme.mode }}>
        <PageTitle theme={{ mode: theme.mode }}>Our Services</PageTitle>
        <PageSubtitle theme={{ mode: theme.mode }}>
          We provide a wide range of IT solutions to help your business thrive
          in the digital era.
        </PageSubtitle>
      </PageHeader>

      {/* Services Overview Section */}
      <Section>
        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "3rem",
            color: theme.mode === "dark" ? "#cccccc" : "#666666",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto 3rem",
          }}
        >
          At CurryTech Solutions, we offer comprehensive technology services
          designed to help businesses of all sizes leverage the power of digital
          innovation. Click on any service to learn more.
        </p>

        <ServicesGrid>
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              theme={{ mode: theme.mode }}
              onClick={() => openServiceModal(service.id)}
              id={`service-${service.id}`}
            >
              <ServiceIcon>
                <span>{service.icon}</span>
              </ServiceIcon>
              <ServiceTitle theme={{ mode: theme.mode }}>
                {service.title}
              </ServiceTitle>
              <ServiceDescription theme={{ mode: theme.mode }}>
                {service.description}
              </ServiceDescription>
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  openServiceModal(service.id);
                }}
              >
                Learn More <ArrowForwardIcon style={{ marginLeft: "0.5rem" }} />
              </Button>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>

      {/* Our Process Section */}
      <Section
        title="Our Process"
        subtitle="How we deliver exceptional results for our clients"
        centered
        alternate
      >
        <ProcessContainer>
          <ProcessSteps>
            {processSteps.map((step) => (
              <ProcessStep key={step.number}>
                <StepNumber>{step.number}</StepNumber>
                <StepContent>
                  <StepTitle theme={{ mode: theme.mode }}>
                    {step.title}
                  </StepTitle>
                  <StepDescription theme={{ mode: theme.mode }}>
                    {step.description}
                  </StepDescription>
                </StepContent>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </ProcessContainer>
      </Section>

      {/* CTA Section */}
      <Section>
        <div
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto",
            padding: "2rem",
            borderRadius: "8px",
            backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: theme.mode === "dark" ? "#ffffff" : "#333333",
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "2rem",
              color: theme.mode === "dark" ? "#cccccc" : "#666666",
            }}
          >
            Contact us today to discuss your project requirements and how we can
            help you achieve your business goals.
          </p>
          <Button variant="primary" size="large" to="/contact">
            Contact Us Now
          </Button>
        </div>
      </Section>

      {/* Service Detail Modal */}
      <ModalOverlay
        isOpen={selectedService !== null}
        onClick={closeServiceModal}
      >
        {selectedService && extendedDescription && (
          <ModalContent
            theme={{ mode: theme.mode }}
            isOpen={selectedService !== null}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              theme={{ mode: theme.mode }}
              onClick={closeServiceModal}
            >
              ×
            </CloseButton>
            <ModalTitle theme={{ mode: theme.mode }}>
              {selectedService.title}
            </ModalTitle>
            <ModalSubtitle theme={{ mode: theme.mode }}>
              {extendedDescription.description}
            </ModalSubtitle>

            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: theme.mode === "dark" ? "#ffffff" : "#333333",
                }}
              >
                Key Benefits
              </h3>
              <ul
                style={{
                  paddingLeft: "1.5rem",
                  color: theme.mode === "dark" ? "#cccccc" : "#666666",
                }}
              >
                {extendedDescription.benefits.map((benefit, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: theme.mode === "dark" ? "#ffffff" : "#333333",
                }}
              >
                Technologies We Use
              </h3>
              <ul
                style={{
                  paddingLeft: "1.5rem",
                  color: theme.mode === "dark" ? "#cccccc" : "#666666",
                }}
              >
                {extendedDescription.technologies.map((tech, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: theme.mode === "dark" ? "#ffffff" : "#333333",
                }}
              >
                Frequently Asked Questions
              </h3>
              <FaqContainer>
                {extendedDescription.faqs.map((faq, index) => (
                  <FaqItem key={index} theme={{ mode: theme.mode }}>
                    <FaqQuestion
                      theme={{ mode: theme.mode }}
                      isOpen={openFaqId === index}
                      onClick={() => toggleFaq(index)}
                    >
                      {faq.question}
                    </FaqQuestion>
                    <FaqAnswer
                      theme={{ mode: theme.mode }}
                      isOpen={openFaqId === index}
                    >
                      {faq.answer}
                    </FaqAnswer>
                  </FaqItem>
                ))}
              </FaqContainer>
            </div>

            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <Button variant="primary" to="/contact">
                Inquire About This Service
              </Button>
            </div>
          </ModalContent>
        )}
      </ModalOverlay>
    </>
  );
};

export default ServicesPage;
