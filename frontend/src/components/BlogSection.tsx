import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { API_BASE } from "../config/api";
 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
 
interface BlogSectionProps {
  diseaseId?: number;
}
 
const BlogSection: React.FC<BlogSectionProps> = ({ diseaseId }) => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
 
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/blogs`);
      const blogs = res.data.data || [];
 
      const filteredBlogs = diseaseId
        ? blogs.filter(
            (b: any) =>
              b.status === "published" &&
              b.disease_id === diseaseId
          )
        : blogs.filter((b: any) => b.status === "published");
 
      const mapped = filteredBlogs.map((post: any) => ({
        title: post.title?.trim(),
        excerpt: post.short_description?.trim(),
        slug: post.slug,
        image: post.blog_image
          ? `${API_BASE}${post.blog_image}`
          : "/placeholder.jpg",
      }));
 
      setBlogPosts(mapped);
    } catch (error) {
      console.log("Blog fetch error", error);
    }
  };
 
  useEffect(() => {
    fetchBlogs();
  }, [diseaseId]);
 
  if (!blogPosts.length) return null;
 
  const settings = {
    dots: true,
    arrows: true,
    infinite: blogPosts.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };
 
  return (
    <section style={{ backgroundColor: "#ffffff", padding: "60px 0" }}>
      <div className="max-w-7xl mx-auto px-5">
 
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
            Related Blogs
          </h2>
 
          <Link
            to="/blog"
            style={{
              color: "#F0A324",
              fontSize: "14px",
              fontWeight: "500",
              textDecoration: "none",
              border:"1px solid #F0A324",
              padding:"6px 12px",
              borderRadius:"99px",
            }}
          >
            View All →
          </Link>
        </div>
 
        <Slider {...settings}>
          {blogPosts.map((post, index) => (
            <div  key={index} style={{ padding: "0 12px", width: "335px", }}>
              <Link
                to={`/blogs/${post.slug}`}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  textDecoration: "none",
                  display: "block",
                  height: "100%",
                  marginRight: "20px",
                  
                }}
                className="related-post-sec-1"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    
                  }}
                />
 
                <div className="related-blog-cards-section" style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      marginBottom: "10px",
                      color: "#1a1a1a",
                    }}
                  >
                    {post.title}
                  </h3>
 
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      lineHeight: "1.5",
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
 
export default BlogSection;