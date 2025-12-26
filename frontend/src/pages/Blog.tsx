import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import BookingForm from "../components/BookingForm";
import SearchBar from "../components/Blog/SearchBar";

const API_BASE_URL = "http://127.0.0.1:5001";

interface Blog {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  blog_image: string | null;
  author?: string;
  status: string;
}

const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
  >
    <ArrowLeft size={18} />
  </button>
);

const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
  >
    <ArrowRight size={18} />
  </button>
);

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const stripHtml = (html = "") =>
    html.replace(/<[^>]+>/g, "");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        const published: Blog[] = (res.data?.data || []).filter(
          (b: Blog) => b.status === "published"
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

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, blogs.length),
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

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <>
      <Header />
      <TreatmentHeader
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
        {blogs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Latest Health Tips</h2>

            <div className="relative">
              <Slider {...sliderSettings}>
                {blogs.map((post) => (
                  <div key={post.id} className="px-2">
                    <Link to={`/blogs/${post.slug}`}>
                      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                        <img
                          src={
                            post.blog_image
                              ? `${API_BASE_URL}${post.blog_image}`
                              : "/placeholder.jpg"
                          }
                          alt={post.title}
                          className="h-48 w-full object-cover"
                        />

                        <div className="p-4">
                          <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {post.short_description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        )}

        <div className="flex gap-8">
          <div className="flex-1 space-y-4 ">
            {blogs.map((post) => (
              <Link key={post.id} to={`/blogs/${post.slug}`}>
                <div className="flex justify-between gap-4 bg-white  p-5 rounded-xl shadow hover:shadow-lg transition">

                  <div className="flex flex-col justify-between flex-1 ">

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <User size={14} />
                      <span>Written by: {post.author || "Admin"}</span>
                      <span>•</span>
                      <span>
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {post.disease_name && (
                      <span className="w-fit mb-2 text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                        {post.disease_name}
                      </span>
                    )}

                    <h3 className="font-semibold text-base leading-snug line-clamp-2 mb-2">
                      {post.title}
                    </h3>

                    <p className="line-clamp-3 text-sm text-gray-600">
                      {stripHtml(post.description_html)}
                    </p>



                  </div>
                  <img
                    src={
                      post.blog_image
                        ? `${API_BASE_URL}${post.blog_image}`
                        : "/placeholder.jpg"
                    }
                    alt={post.title}
                    className="w-40 h-28 object-cover rounded-lg flex-shrink-0"
                  />
                </div>
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
