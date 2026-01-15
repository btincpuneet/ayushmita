
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import BookingForm from "../components/BookingForm";
import SearchBar from "../components/Blog/SearchBar";

import { API_BASE } from "../config/api";

interface Blog {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description_html: string;
  blog_image: string | null;
  author?: string;
  status: string;
  disease_name?: string;
  published_at: string;
}
interface GlobalSEO {
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

interface Disease {
  id: number;
  name: string;
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
    className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white p-2 h-12 rounded-full shadow"
  >
    <svg
      width="34"
      height="18"
      viewBox="0 0 34 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.95 10.4811L22.65 15.0054L25 17.4685L33.3333 8.73424L25 0L22.65 2.46305L26.95 6.98739H0V10.4811H26.95Z"
        fill="#F0A324"
      />
    </svg>
  </button>
);

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalSEO, setGlobalSEO] = useState<GlobalSEO | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "");
  const fetchGlobalSEO = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/global-settings`);
      if (res.data?.success && res.data.data) {
        setGlobalSEO({
          seo_title: res.data.data.seo_title,
          seo_description: res.data.data.seo_description,
          seo_keywords: res.data.data.seo_keywords,
        });
      }
    } catch (error) {
      console.error("Failed to fetch global SEO", error);
    }
  };
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/blogs`);
      const published = (res.data?.data || []).filter(
        (b: Blog) => b.status === "published"
      );
      setBlogs(published);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGlobalSEO();
    fetchBlogs();
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/diseases`)
      .then((res) => setCategories(res.data.data || []))
      .catch(console.error);
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      blog.title.toLowerCase().includes(q) ||
      stripHtml(blog.description_html).toLowerCase().includes(q);

    const matchesCategory =
      !selectedCategory || blog.disease_name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
  const seoTitle =
    globalSEO?.seo_title || "Best Hospital";

  const seoDescription =
    globalSEO?.seo_description || "Best healthcare services";

  const seoKeywords =
    globalSEO?.seo_keywords || "hospital, Test ,healthcare";

  useSeo(seoTitle, seoDescription, seoKeywords);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <>
      <Header />

      <TreatmentHeader
        title="Blog"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Blog" },
        ]}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
      </TreatmentHeader>

      <Container>
        {filteredBlogs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 tips-about-health">Latest Health Tips</h2>

            <Slider {...sliderSettings}>
              {filteredBlogs.map((post) => (
                <div key={post.id} className="px-2">
                  <Link to={`/blogs/${post.slug}`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                      <img
                        src={
                          post.blog_image
                            ? `${API_BASE}${post.blog_image}`
                            : "/placeholder.jpg"
                        }
                        className="h-48 w-full object-cover rounded-lg"
                      />
                      <div className="p-4 h-[96px] flex flex-col justify-between">
                        <h3 className="line-clamp-2 treatment-lists-headings min-h-[40px]">
                          {post.title}
                        </h3>

                        <p className="text-xs text-gray-500 line-clamp-2 ">
                          {post.short_description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </section>
        )}

        <div className="flex gap-8">
          <div className="flex-1 space-y-4 blog-section-pgs-item">
            {filteredBlogs.map((post) => (
              <Link key={post.id} to={`/blogs/${post.slug}`}>
                <div className="flex gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition mb-4 cards-blog-data">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#333333] mb-2">
                      <User size={24} />
                      <div className="listed-by">
                        <span>Written by: {post.author || "Admin"}</span>
                        <span>
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {post.disease_name && (
                      <span className="mb-2 inline-block short-related-sec">
                        {post.disease_name}
                      </span>
                    )}

                    <h3 className="line-clamp-2 mb-2 list-headings-blog-sec">
                      {post.title}
                    </h3>

                    <p className="line-clamp-3 paragraph-of-page-blog">
                      {stripHtml(post.description_html)}
                    </p>
                  </div>

                  <img
                    src={
                      post.blog_image
                        ? `${API_BASE}${post.blog_image}`
                        : "/placeholder.jpg"
                    }
                    className="blog-listing-page-image object-cover rounded-lg"
                  />
                </div>
              </Link>
            ))}
          </div>

          <aside className="w-[370px] hidden lg:block sticky top-24">
            <BookingForm />
          </aside>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Blog;
