import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { fetchPosts, searchPosts } from "../services/blogService";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CircularProgress from "@mui/material/CircularProgress";

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

// Search Bar Styling
const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 3rem;
  border: 1px solid
    ${(props) => (props.theme.mode === "dark" ? "#444444" : "#dddddd")};
  border-radius: 4px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333333" : "#ffffff"};
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => (props.theme.mode === "dark" ? "#999999" : "#666666")};
`;

// Blog Posts Styling
const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.article`
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

const BlogImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.5)
    );
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }
`;

const BlogExcerpt = styled.p`
  font-size: 1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#999999" : "#999999")};
  padding-top: 1rem;
  border-top: 1px solid
    ${(props) => (props.theme.mode === "dark" ? "#333333" : "#eeeeee")};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.3rem;
    font-size: 1rem;
  }
`;

// Loading and Error States
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#2c1c1e" : "#fff5f5"};
  border-radius: 8px;
  margin-bottom: 2rem;
`;

// Pagination Styling
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: 1px solid
    ${(props) =>
      props.active
        ? "#007bff"
        : props.theme.mode === "dark"
        ? "#444444"
        : "#dddddd"};
  background-color: ${(props) => (props.active ? "#007bff" : "transparent")};
  color: ${(props) =>
    props.active
      ? "#ffffff"
      : props.theme.mode === "dark"
      ? "#ffffff"
      : "#333333"};
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) =>
      props.active || props.disabled
        ? ""
        : props.theme.mode === "dark"
        ? "#333333"
        : "#f5f5f5"};
  }
`;

const getPlaceholderImage = (id) => {
  const imageId = (id % 30) + 1;
  return `https://source.unsplash.com/random/600x400/?blog,technology&sig=${imageId}`;
};

const BlogPage = () => {
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 9;

  // Fetch posts when page changes
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const skip = (currentPage - 1) * postsPerPage;
        const data = await fetchPosts(postsPerPage, skip);

        setPosts(data.posts);
        setTotalPosts(data.total);
        setLoading(false);
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setCurrentPage(1);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await searchPosts(searchQuery);

      setPosts(data.posts);
      setTotalPosts(data.total);
      setLoading(false);
    } catch (err) {
      setError("Search failed. Please try again.");
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, currentPage + 1);

      if (currentPage <= 2) {
        endPage = maxVisiblePages - 1;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - (maxVisiblePages - 2);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (startPage > 1) {
        pageNumbers.unshift(1);
        if (startPage > 2) pageNumbers.splice(1, 0, "...");
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const formatDate = (postId) => {
    const date = new Date();
    date.setDate(date.getDate() - (postId % 30));

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader theme={{ mode: theme.mode }}>
        <PageTitle theme={{ mode: theme.mode }}>Blog & Insights</PageTitle>
        <PageSubtitle theme={{ mode: theme.mode }}>
          Stay updated with the latest trends, insights, and news in the tech
          world.
        </PageSubtitle>
      </PageHeader>

      {/* Blog Section */}
      <Section>
        {/* Search Bar */}
        <SearchContainer>
          <SearchForm onSubmit={handleSearch}>
            <SearchIconWrapper theme={{ mode: theme.mode }}>
              <SearchIcon />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              theme={{ mode: theme.mode }}
            />
          </SearchForm>
        </SearchContainer>

        {/* Error Message */}
        {error && (
          <ErrorContainer theme={{ mode: theme.mode }}>
            <p>{error}</p>
          </ErrorContainer>
        )}

        {/* Loading State */}
        {loading ? (
          <LoadingContainer>
            <CircularProgress color="primary" />
          </LoadingContainer>
        ) : (
          <>
            {/* Posts Grid */}
            {posts.length > 0 ? (
              <BlogGrid>
                {posts.map((post) => (
                  <BlogCard key={post.id} theme={{ mode: theme.mode }}>
                    <BlogImageContainer>
                      <BlogImage
                        src={getPlaceholderImage(post.id)}
                        alt={post.title}
                      />
                    </BlogImageContainer>
                    <BlogContent>
                      <BlogTitle theme={{ mode: theme.mode }}>
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </BlogTitle>
                      <BlogExcerpt theme={{ mode: theme.mode }}>
                        {truncateText(post.body)}
                      </BlogExcerpt>
                      <Button variant="secondary" to={`/blog/${post.id}`}>
                        Read More
                      </Button>
                      <BlogMeta theme={{ mode: theme.mode }}>
                        <MetaItem>
                          <AccessTimeIcon />
                          <span>{formatDate(post.id)}</span>
                        </MetaItem>
                        <MetaItem>
                          <PersonIcon />
                          <span>User {post.userId}</span>
                        </MetaItem>
                        <MetaItem>
                          <FavoriteIcon />
                          <span>
                            {typeof post.reactions === "object"
                              ? post.reactions.likes ||
                                Object.values(post.reactions)[0] ||
                                0
                              : post.reactions || 0}
                          </span>
                        </MetaItem>
                        <MetaItem>
                          <ChatBubbleOutlineIcon />
                          <span>{Math.floor(Math.random() * 10)}</span>
                        </MetaItem>
                      </BlogMeta>
                    </BlogContent>
                  </BlogCard>
                ))}
              </BlogGrid>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <h3
                  style={{
                    color: theme.mode === "dark" ? "#ffffff" : "#333333",
                  }}
                >
                  No posts found
                </h3>
                <p
                  style={{
                    color: theme.mode === "dark" ? "#cccccc" : "#666666",
                    marginTop: "1rem",
                  }}
                >
                  {searchQuery
                    ? "Try a different search term"
                    : "Check back soon for new content"}
                </p>
              </div>
            )}

            {/* Pagination */}
            {!searchQuery && posts.length > 0 && (
              <PaginationContainer>
                <PaginationButton
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  theme={{ mode: theme.mode }}
                >
                  Previous
                </PaginationButton>

                {getPageNumbers().map((page, index) => (
                  <PaginationButton
                    key={index}
                    onClick={() =>
                      typeof page === "number" && setCurrentPage(page)
                    }
                    active={page === currentPage}
                    disabled={typeof page !== "number"}
                    theme={{ mode: theme.mode }}
                  >
                    {page}
                  </PaginationButton>
                ))}

                <PaginationButton
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  theme={{ mode: theme.mode }}
                >
                  Next
                </PaginationButton>
              </PaginationContainer>
            )}
          </>
        )}
      </Section>
    </>
  );
};

export default BlogPage;
