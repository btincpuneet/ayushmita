import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import SearchBar from "../components/Blog/SearchBar";
import BlogCard from "../components/Blog/BlogCard";
import FeaturedBlogCard from "../components/Blog/FeaturedBlogCard";
import BookingForm from "../components/BookingForm";

const API_BASE_URL = "http://127.0.0.1:5001";

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
  >
    <ArrowLeft size={18} />
  </button>
);

const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
  >
    <ArrowRight size={18} />
  </button>
);

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        const published = (res.data?.data || []).filter(
          (b: any) => b.status === "published"
        );
        setBlogs(published);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return blogs;
    return blogs.filter((b) =>
      b.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, filteredBlogs.length),
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <>
      <Header />

      <TreatmentHeader
        title="Blog"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Blog" },
        ]}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </TreatmentHeader>

      <Container>
        {filteredBlogs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Latest Health Tips</h2>

            <div className="relative">
              <Slider {...sliderSettings}>
                {filteredBlogs.map((post) => (
                  <Link key={post.id} to={`/blogs/${post.slug}`}>
                    <FeaturedBlogCard
                      post={{
                        ...post,
                        blog_image: post.blog_image
                          ? `${API_BASE_URL}${post.blog_image}`
                          : "/placeholder.jpg",
                      }}
                    />
                  </Link>
                ))}
              </Slider>
            </div>
          </section>
        )}

        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {filteredBlogs.map((post) => (
              <Link key={post.id} to={`/blogs/${post.slug}`}>
                <BlogCard
                  post={{
                    ...post,
                    blog_image: post.blog_image
                      ? `${API_BASE_URL}${post.blog_image}`
                      : "/placeholder.jpg",
                  }}
                />
              </Link>
            ))}
          </div>

          <aside className="w-[360px] hidden lg:block sticky top-24">
            <BookingForm />
          </aside>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Blog;
