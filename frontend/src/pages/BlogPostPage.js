// frontend/src/pages/BlogPostPage.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import {
  getBlogById,
  likeBlog,
  addComment,
  getAllBlogs,
} from "../services/blogService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";

// Page Header Styling
const PageHeader = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1A1A1A" : "#f0f8ff"};
  padding: 6rem 1rem 3rem;
  text-align: center;
  position: relative;
`;

const PageTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const PageMetaItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.75rem;

  svg {
    margin-right: 0.5rem;
  }
`;

const PageMeta = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  text-decoration: none;

  &:hover {
    color: #007bff;
  }
`;

// Blog Content Styling
const BlogContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 1.1rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#333333")};

  p {
    margin-bottom: 1.5rem;
  }
`;

const BlogImageContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BlogTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const BlogTag = styled.span`
  display: inline-flex;
  padding: 0.3rem 0.8rem;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#333333" : "#f0f0f0"};
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
  border-radius: 50px;
  font-size: 0.85rem;
`;

const BlogActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  border-top: 1px solid
    ${(props) => (props.theme.mode === "dark" ? "#333333" : "#eeeeee")};
  padding-top: 1.5rem;
`;

// Comments Styling
const CommentsSection = styled.div`
  margin-top: 3rem;
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5"};
  border-radius: 8px;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CommentItem = styled.div`
  padding: 1.5rem;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1e1e1e" : "#ffffff"};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#333333")};
`;

const CommentDate = styled.div`
  font-size: 0.9rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#999999" : "#999999")};
`;

const CommentText = styled.p`
  color: ${(props) => (props.theme.mode === "dark" ? "#cccccc" : "#666666")};
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

const RelatedPostImage = styled.div`
  height: 150px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${RelatedPostCard}:hover & img {
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

    &:hover {
      color: #007bff;
    }
  }
`;

const RelatedPostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${(props) => (props.theme.mode === "dark" ? "#999999" : "#999999")};
`;

const BlogPostPage = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getBlogById(id);
        console.log("Blog post data:", response);

        if (response.success) {
          setPost(response.data);

          // Check if user has liked this post
          setHasLiked(response.data.likedBy?.includes(user?.id));

          // Fetch related posts
          const allPostsResponse = await getAllBlogs(1, 4);
          const filtered = allPostsResponse.data
            .filter((p) => p._id !== id)
            .slice(0, 3);
          setRelatedPosts(filtered);
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError(
          "Failed to load blog post. It might not exist or has been removed."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, user?.id]);

  const handleLike = async () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    try {
      setLikeLoading(true);
      const response = await likeBlog(id);

      if (response.success) {
        setPost({
          ...post,
          likes: response.likes,
          likedBy: response.liked
            ? [...(post.likedBy || []), user.id]
            : (post.likedBy || []).filter((uid) => uid !== user.id),
        });
        setHasLiked(response.liked);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      setSubmittingComment(true);
      const response = await addComment(id, comment);

      if (response.success) {
        setPost({
          ...post,
          comments: response.data,
        });
        setComment("");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Section>
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: theme.mode === "dark" ? "#2c1c1e" : "#fff5f5",
            color: "#dc3545",
            borderRadius: "8px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2>{error}</h2>
          <Button variant="primary" to="/blog" style={{ marginTop: "1.5rem" }}>
            Return to Blog
          </Button>
        </div>
      </Section>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <PageHeader theme={{ mode: theme.mode }}>
        <BackButton to="/blog" theme={{ mode: theme.mode }}>
          <ArrowBackIcon style={{ marginRight: "0.5rem" }} /> Back to Blog
        </BackButton>
        <PageTitle theme={{ mode: theme.mode }}>{post.title}</PageTitle>
        <PageMeta theme={{ mode: theme.mode }}>
          <PageMetaItem>
            <AccessTimeIcon />
            <span>{formatDate(post.createdAt)}</span>
          </PageMetaItem>
          <PageMetaItem>
            <PersonIcon />
            <span>{post.author?.name || "Admin"}</span>
          </PageMetaItem>
          <PageMetaItem>
            <FavoriteIcon />
            <span>{post.likes || 0} Likes</span>
          </PageMetaItem>
          <PageMetaItem>
            <CommentIcon />
            <span>{post.comments?.length || 0} Comments</span>
          </PageMetaItem>
        </PageMeta>
      </PageHeader>

      <Section>
        <BlogImageContainer>
          <img
            src={
              post.coverImage ||
              `https://source.unsplash.com/random/800x400/?blog,technology&sig=${post._id}`
            }
            alt={post.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/800x400?text=CurryTech+Blog+Post";
            }}
          />
        </BlogImageContainer>

        <BlogContent theme={{ mode: theme.mode }}>
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </BlogContent>

        {post.tags && post.tags.length > 0 && (
          <BlogTags>
            {post.tags.map((tag, index) => (
              <BlogTag key={index} theme={{ mode: theme.mode }}>
                #{tag}
              </BlogTag>
            ))}
          </BlogTags>
        )}

        <BlogActions theme={{ mode: theme.mode }}>
          <Button
            variant="secondary"
            onClick={handleLike}
            disabled={likeLoading}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FavoriteIcon
              style={{
                marginRight: "0.5rem",
                color: hasLiked ? "#ff4d4d" : "inherit",
              }}
            />
            {likeLoading
              ? "Processing..."
              : `${hasLiked ? "Unlike" : "Like"} This Post (${
                  post.likes || 0
                })`}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
          >
            Share This Post
          </Button>
        </BlogActions>

        {/* Comments Section */}
        <CommentsSection>
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
              color: theme.mode === "dark" ? "#ffffff" : "#333333",
            }}
          >
            Comments ({post.comments?.length || 0})
          </h3>

          {user ? (
            <CommentForm
              theme={{ mode: theme.mode }}
              onSubmit={handleCommentSubmit}
            >
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="comment"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: theme.mode === "dark" ? "#cccccc" : "#666666",
                  }}
                >
                  Your Comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "4px",
                    border: `1px solid ${
                      theme.mode === "dark" ? "#444444" : "#dddddd"
                    }`,
                    backgroundColor:
                      theme.mode === "dark" ? "#333333" : "#ffffff",
                    color: theme.mode === "dark" ? "#ffffff" : "#333333",
                    minHeight: "100px",
                  }}
                  placeholder="Share your thoughts..."
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={submittingComment}
              >
                {submittingComment ? "Submitting..." : "Post Comment"}
              </Button>
            </CommentForm>
          ) : (
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
                borderRadius: "8px",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  marginBottom: "1rem",
                  color: theme.mode === "dark" ? "#cccccc" : "#666666",
                }}
              >
                Please log in to leave a comment.
              </p>
              <Button variant="primary" to="/auth/login">
                Log In
              </Button>
            </div>
          )}

          {post.comments && post.comments.length > 0 ? (
            <CommentsList>
              {post.comments.map((comment, index) => (
                <CommentItem key={index} theme={{ mode: theme.mode }}>
                  <CommentHeader>
                    <CommentAuthor theme={{ mode: theme.mode }}>
                      {comment.name}
                    </CommentAuthor>
                    <CommentDate theme={{ mode: theme.mode }}>
                      {formatDate(comment.date)}
                    </CommentDate>
                  </CommentHeader>
                  <CommentText theme={{ mode: theme.mode }}>
                    {comment.comment}
                  </CommentText>
                </CommentItem>
              ))}
            </CommentsList>
          ) : (
            <div
              style={{
                padding: "2rem",
                backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
                borderRadius: "8px",
                textAlign: "center",
                color: theme.mode === "dark" ? "#aaaaaa" : "#888888",
              }}
            >
              No comments yet. Be the first to comment!
            </div>
          )}
        </CommentsSection>
      </Section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <Section alternate>
          <RelatedPostsContainer>
            <RelatedPostsTitle theme={{ mode: theme.mode }}>
              Related Posts
            </RelatedPostsTitle>
            <RelatedPostsGrid>
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard
                  key={relatedPost._id}
                  theme={{ mode: theme.mode }}
                >
                  <RelatedPostImage>
                    <img
                      src={
                        relatedPost.coverImage ||
                        `https://source.unsplash.com/random/400x200/?blog&sig=${relatedPost._id}`
                      }
                      alt={relatedPost.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/400x200?text=CurryTech+Blog";
                      }}
                    />
                  </RelatedPostImage>
                  <RelatedPostContent>
                    <RelatedPostTitle theme={{ mode: theme.mode }}>
                      <Link to={`/blog/${relatedPost._id}`}>
                        {relatedPost.title}
                      </Link>
                    </RelatedPostTitle>
                    <RelatedPostMeta theme={{ mode: theme.mode }}>
                      <span>{formatDate(relatedPost.createdAt)}</span>
                      <span>
                        <FavoriteIcon
                          style={{
                            fontSize: "0.9rem",
                            verticalAlign: "middle",
                            marginRight: "0.25rem",
                          }}
                        />
                        {relatedPost.likes || 0}
                      </span>
                    </RelatedPostMeta>
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
      )}
    </>
  );
};

export default BlogPostPage;
