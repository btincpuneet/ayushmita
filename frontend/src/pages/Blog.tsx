
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import SearchBar from "../components/Blog/SearchBar";
import BlogCard from "../components/Blog/BlogCard";
import FeaturedBlogCard from "../components/Blog/FeaturedBlogCard";
import BookingForm from "../components/BookingForm";

const API_BASE_URL = "http://127.0.0.1:5001";

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // ================= FETCH BLOGS =================
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        const list = Array.isArray(res.data?.data) ? res.data.data : [];

        // ✅ only published blogs
        const published = list.filter(
          (b: any) => b.status === "published"
        );

        setBlogs(published);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ================= SEARCH =================
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogs;

    return blogs.filter((b) =>
      b.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  // ================= FEATURED =================
  const featuredPosts = useMemo(() => {
    const featured = blogs.filter(
      (b) =>
        b.is_featured === true ||
        b.is_featured === "true" ||
        b.is_featured === 1
    );

    // fallback if not enough featured blogs
    return featured.length >= 3 ? featured : blogs.slice(0, 3);
  }, [blogs]);

  const visibleFeatured = featuredPosts.slice(
    featuredIndex,
    featuredIndex + 3
  );

  if (loading) {
    return <div className="py-20 text-center">Loading blogs...</div>;
  }

  return (
    <>
      <Header />

      <TreatmentHeader
        title="Blog"
        breadcrumbs={[{ label: "Home" }, { label: "Blog" }]}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </TreatmentHeader>

      <Container>
        {/* ================= FEATURED BLOGS ================= */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Latest Health Tips</h2>

              {featuredPosts.length > 3 && (
                <div className="flex gap-2">
                  <button
                    disabled={featuredIndex === 0}
                    onClick={() =>
                      setFeaturedIndex((prev) =>
                        Math.max(0, prev - 1)
                      )
                    }
                    className="p-2 border rounded disabled:opacity-40"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <button
                    disabled={
                      featuredIndex >= featuredPosts.length - 3
                    }
                    onClick={() =>
                      setFeaturedIndex((prev) =>
                        Math.min(
                          featuredPosts.length - 3,
                          prev + 1
                        )
                      )
                    }
                    className="p-2 border rounded disabled:opacity-40"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {visibleFeatured.map((post) => (
                <FeaturedBlogCard
                  key={post._id}
                  post={{
                    ...post,
                    blog_image: post.blog_image
                      ? `${API_BASE_URL}${post.blog_image}`
                      : "/placeholder.jpg",
                  }}
                />
              ))}
            </div>
          </section>
        )}

        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {filteredPosts.slice(0, visiblePosts).map((post) => (
              <BlogCard
                key={post._id}
                post={{
                  ...post,
                  blog_image: post.blog_image
                    ? `${API_BASE_URL}${post.blog_image}`
                    : "/placeholder.jpg",
                }}
              />
            ))}

            {visiblePosts < filteredPosts.length && (
              <div className="text-center pt-4">
                <button
                  onClick={() =>
                    setVisiblePosts((prev) => prev + 5)
                  }
                  className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Load more
                </button>
              </div>
            )}

            {filteredPosts.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No blogs found.
              </div>
            )}
          </div>

          <aside className="w-[360px] sticky top-24 h-fit hidden lg:block">
            <BookingForm />
          </aside>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Blog;
