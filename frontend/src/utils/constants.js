import {
  FaCode,
  FaMobileScreenButton,
  FaCloud,
  FaPalette,
  FaBusinessTime,
  FaUserSecret,
} from "react-icons/fa6";
import EthanImg from "../assets/Ethan.png";
import ZoeImg from "../assets/Zoe.png";
import MatthewImg from "../assets/Matthew.png";
import KatherineImg from "../assets/Katherine.png";
import HassanImg from "../assets/Hassan.png";
import FionaImg from "../assets/Fiona.png";
import EmeryImg from "../assets/Emery.png";
import AmberImg from "../assets/Amber.png";

export const NAV_LINKS = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Blog", path: "/blog" },
  { title: "Contact", path: "/contact" },
];

export const SERVICES = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Custom web applications tailored to your business needs using the latest technologies.",
    icon: <FaCode />,
  },
  {
    id: 2,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android devices.",
    icon: <FaMobileScreenButton />,
  },
  {
    id: 3,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and migration services for your growing business.",
    icon: <FaCloud />,
  },
  {
    id: 4,
    title: "UI/UX Design",
    description:
      "User-centered design solutions that enhance user experience and engagement.",
    icon: <FaPalette />,
  },
  {
    id: 5,
    title: "IT Consulting",
    description:
      "Strategic technology consulting to align IT solutions with business objectives.",
    icon: <FaBusinessTime />,
  },
  {
    id: 6,
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your data and infrastructure.",
    icon: <FaUserSecret />,
  },
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Ethan Curry",
    position: "CEO & Founder",
    bio: "With over 15 years of experience in tech leadership, Ethan drives our vision and strategy.",
    image: EthanImg,
  },
  {
    id: 2,
    name: "Zoe Idris",
    position: "CTO",
    bio: "Zoe brings cutting-edge technical expertise from her background at Fortune 500 tech companies.",
    image: ZoeImg,
  },
  {
    id: 3,
    name: "Matthew Ferris",
    position: "Lead Developer",
    bio: "Matthew leads our development team with a focus on creating elegant and efficient code.",
    image: MatthewImg,
  },
  {
    id: 4,
    name: "Katherine Velson",
    position: "UX/UI Designer",
    bio: "Katherine creates beautiful and intuitive user interfaces that enhance the user experience.",
    image: KatherineImg,
  },
  {
    id: 5,
    name: "Hassan Ibrahim",
    position: "Project Manager",
    bio: "Hassan ensures our projects are delivered on time and within budget, exceeding client expectations.",
    image: HassanImg,
  },
  {
    id: 6,
    name: "Fiona Morris",
    position: "Marketing Director",
    bio: "Fiona develops our marketing strategies to connect with clients and share our technology solutions.",
    image: FionaImg,
  },
  {
    id: 7,
    name: "Emery Demers",
    position: "DevOps Engineer",
    bio: "Emery builds and maintains our robust infrastructure and continuous integration processes.",
    image: EmeryImg,
  },
  {
    id: 8,
    name: "Amber Faye",
    position: "Client Success Manager",
    bio: "Amber works closely with our clients to ensure they get the most value from our solutions.",
    image: AmberImg,
  },
];

export const FAQ_ITEMS = [
  {
    question: "What services does CurryTech Solutions offer?",
    answer:
      "We offer a range of IT services including web development, mobile app development, cloud solutions, UI/UX design, IT consulting, and cybersecurity services.",
  },
  {
    question: "How do I request a quote for my project?",
    answer:
      "You can request a quote by filling out the contact form on our website, specifying your project requirements. Our team will get back to you within 24-48 hours.",
  },
  // TODO: Add more FAQ items as needed
];
