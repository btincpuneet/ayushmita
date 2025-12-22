import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const fetchBlogs = async () => {
    try {
      const BASE_URL = ((import.meta as any).env?.VITE_BASE_URL || "").replace(/\/$/, "");
      const res = await axios.get(`${BASE_URL}/api/blogs`);

      const blogs = res.data.data || [];

      const mapped = blogs.map((post) => ({
        title: post.title?.trim(),
        excerpt: post.short_description?.trim(),
        slug: post.slug?.trim(),
        image: post.image.startsWith("/uploads")
          ? `${BASE_URL}${post.image}`
          : `${BASE_URL}/uploads/blogs/${post.image}`
      }));

      setBlogPosts(mapped);
    } catch (error) {
      console.log("Blog fetch error", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section style={{ backgroundColor: "#ffffff", padding: "60px 0" }}>
      <div className="max-w-7xl mx-auto px-5 py-15 md:py-15 lg:py-15">
        
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              color: "#1a1a1a",
              fontSize: "24px",
              fontWeight: "700",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Latest Health Tips
          </h2>

          <Link
            to="/blog"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#2d6b4f",
              fontSize: "14px",
              fontWeight: "500",
              textDecoration: "none",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            View All
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {blogPosts.map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug}`}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid #f0f0f0",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 2px 12px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  height: "180px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>

              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    color: "#1a1a1a",
                    fontSize: "15px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    lineHeight: "1.4",
                    fontFamily: "'Poppins', sans-serif",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    color: "#666666",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    fontFamily: "'Poppins', sans-serif",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
