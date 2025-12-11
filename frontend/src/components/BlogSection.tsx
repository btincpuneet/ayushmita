import { Link } from "react-router-dom";
import React from "react";

const blogPosts = [
  {
    title: "Hair Transplant in Turkey: A Complete Guide for Medical Tourism",
    excerpt: "Hair transplantation in Turkey has become a major hub for people who want different...",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=280&fit=crop",
    slug: "hair-transplant-turkey",
  },
  {
    title: "Dental Implant Treatment in Thailand: Global Patient Care",
    excerpt: "Dental implant treatment in Thailand has become one of the most trusted and...",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=280&fit=crop",
    slug: "dental-implant-thailand",
  },
  {
    title: "Breast Augmentation Surgery in Turkey: Transform Your Look Now",
    excerpt: "If you've been considering enhancing your body and achieving your desired...",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=280&fit=crop",
    slug: "breast-augmentation-turkey",
  },
];

const BlogSection = () => {
  return (
    <section style={{ backgroundColor: "#ffffff", padding: "60px 0" }}>
      <div className="max-w-7xl mx-auto px-5 py-12 md:py-16 lg:py-12">
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "32px" 
        }}>
          <h2 style={{
            color: "#1a1a1a",
            fontSize: "24px",
            fontWeight: "700",
            fontFamily: "'Poppins', sans-serif"
          }}>
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
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px"
        }}>
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
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Image */}
              <div style={{ 
                height: "180px", 
                overflow: "hidden",
                position: "relative"
              }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "20px" }}>
                <h3 style={{
                  color: "#1a1a1a",
                  fontSize: "15px",
                  fontWeight: "600",
                  marginBottom: "10px",
                  lineHeight: "1.4",
                  fontFamily: "'Poppins', sans-serif",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {post.title}
                </h3>

                <p style={{
                  color: "#666666",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  fontFamily: "'Poppins', sans-serif",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Responsive styles */}
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

