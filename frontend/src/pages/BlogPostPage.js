import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { fetchPostById } from "../services/blogService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import TagIcon from "@mui/icons-material/Tag";

// Post Header Styling
const PostHeader = styled.div`
  position: relative;
  padding: 6rem 1rem 3rem;
  text-align: center;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1A1A1A" : "#f0f8ff"};
`;

const PostTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }

  svg {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    top: 1.5rem;
    left: 1.5rem;
  }
`;

// Post Content Styling
const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PostImageContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostContent = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#333333")};

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
    margin: 2.5rem 0 1.5rem;
    color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#222222")};
  }

  h3 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
    color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#222222")};
  }

  blockquote {
    border-left: 4px solid #007bff;
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${(props) => (props.theme.mode === "dark" ? "#bbbbbb" : "#555555")};
  }

  ul,
  ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

// Tags Styling
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333333" : "#f0f0f0"};
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;

  svg {
    margin-right: 0.3rem;
    font-size: 0.9rem;
  }
`;

// Loading and Error Styling
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #dc3545;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#2c1c1e" : "#fff5f5"};
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
`;

// Related Posts Styling
const RelatedPostsContainer = styled.div`
  margin-top: 3rem;
`;

const RelatedPostsTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const RelatedPostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const RelatedPostCard = styled.div`
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

const RelatedPostImageContainer = styled.div`
  height: 150px;
  overflow: hidden;
`;

const RelatedPostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${RelatedPostCard}:hover & {
    transform: scale(1.05);
  }
`;

const RelatedPostContent = styled.div`
  padding: 1.2rem;
`;

const RelatedPostTitle = styled.h4`
  font-size: 1.1rem;
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

const BlogPostPage = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPostById(id);
        setPost(data);

        const fakeRelatedPosts = [];
        for (let i = 1; i <= 3; i++) {
          const relatedId = ((parseInt(id) + i) % 100) + 1;
          fakeRelatedPosts.push({
            id: relatedId,
            title: `Related Post ${i}: ${data.title
              .split(" ")
              .slice(0, 3)
              .join(" ")}...`,
            excerpt: data.body.slice(0, 100) + "...",
            tags: data.tags,
          });
        }
        setRelatedPosts(fakeRelatedPosts);

        setLoading(false);
      } catch (err) {
        setError(
          "Failed to load this blog post. It might not exist or has been removed."
        );
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const formatDate = (postId) => {
    const date = new Date();
    date.setDate(date.getDate() - (postId % 30)); // Post is between 0 and 30 days old

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPostImage = (postId) => {
    return `https://source.unsplash.com/random/800x400/?technology,blog&sig=${postId}`;
  };

  const formatPostContent = (body) => {
    const sentences = body.split(". ");
    const paragraphs = [];

    for (let i = 0; i < sentences.length; i += 3) {
      const paragraph =
        sentences.slice(i, i + 3).join(". ") +
        (i + 3 < sentences.length ? "." : "");
      paragraphs.push(paragraph);
    }

    return paragraphs;
  };

  if (loading) {
    return (
      <Section>
        <LoadingContainer>
          <CircularProgress color="primary" />
        </LoadingContainer>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <ErrorContainer theme={{ mode: theme.mode }}>
          <h2>Oops! {error}</h2>
          <Button
            variant="primary"
            onClick={() => navigate("/blog")}
            style={{ marginTop: "1.5rem" }}
          >
            Return to Blog
          </Button>
        </ErrorContainer>
      </Section>
    );
  }

  if (!post) {
    return null;
  }

  const paragraphs = formatPostContent(post.body);

  return (
    <>
      {/* Post Header */}
      <PostHeader theme={{ mode: theme.mode }}>
        <BackButton to="/blog" theme={{ mode: theme.mode }}>
          <ArrowBackIcon /> Back to Blog
        </BackButton>
        <PostTitle theme={{ mode: theme.mode }}>{post.title}</PostTitle>
        <PostMeta theme={{ mode: theme.mode }}>
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
            <span>{post.reactions || 0} Likes</span>
          </MetaItem>
          <MetaItem>
            <CommentIcon />
            <span>{Math.floor(Math.random() * 10)} Comments</span>
          </MetaItem>
        </PostMeta>
      </PostHeader>

      {/* Post Content */}
      <Section>
        <PostContainer>
          <PostImageContainer>
            <PostImage src={getPostImage(post.id)} alt={post.title} />
          </PostImageContainer>

          <PostContent theme={{ mode: theme.mode }}>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </PostContent>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <TagsContainer>
              {post.tags.map((tag, index) => (
                <Tag key={index} theme={{ mode: theme.mode }}>
                  <TagIcon fontSize="small" />
                  {tag}
                </Tag>
              ))}
            </TagsContainer>
          )}

          {/* Share and Like Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
              borderTop: `1px solid ${
                theme.mode === "dark" ? "#333333" : "#eeeeee"
              }`,
              paddingTop: "1.5rem",
            }}
          >
            <Button variant="secondary">
              <FavoriteIcon style={{ marginRight: "0.5rem" }} /> Like This Post
            </Button>
            <Button variant="secondary">Share This Post</Button>
          </div>
        </PostContainer>
      </Section>

      {/* Related Posts Section */}
      <Section alternate>
        <RelatedPostsContainer>
          <RelatedPostsTitle theme={{ mode: theme.mode }}>
            Related Posts
          </RelatedPostsTitle>
          <RelatedPostsGrid>
            {relatedPosts.map((relatedPost) => (
              <RelatedPostCard
                key={relatedPost.id}
                theme={{ mode: theme.mode }}
              >
                <RelatedPostImageContainer>
                  <RelatedPostImage
                    src={getPostImage(relatedPost.id)}
                    alt={relatedPost.title}
                  />
                </RelatedPostImageContainer>
                <RelatedPostContent>
                  <RelatedPostTitle theme={{ mode: theme.mode }}>
                    <Link to={`/blog/${relatedPost.id}`}>
                      {relatedPost.title}
                    </Link>
                  </RelatedPostTitle>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      color: theme.mode === "dark" ? "#999999" : "#999999",
                    }}
                  >
                    <span>{formatDate(relatedPost.id)}</span>
                    <span>
                      <FavoriteIcon
                        fontSize="small"
                        style={{
                          marginRight: "0.3rem",
                          verticalAlign: "middle",
                        }}
                      />
                      {Math.floor(Math.random() * 20 + 5)}
                    </span>
                  </div>
                </RelatedPostContent>
              </RelatedPostCard>
            ))}
          </RelatedPostsGrid>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Button variant="primary" to="/blog">
              View All Posts
            </Button>
          </div>
        </RelatedPostsContainer>
      </Section>
    </>
  );
};

export default BlogPostPage;
