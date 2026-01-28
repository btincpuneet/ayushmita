import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { User, Share2 } from "lucide-react";
import "../css/responsive.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import SearchBar from "../components/Blog/SearchBar";
import BookingForm from "../components/BookingForm";
import useSeo from "../hooks/useSeo";

import { API_BASE } from "../config/api";
import ShareButton from "../components/Blog/ShareButton";

interface Blog {
  id: number;
  title: string;
  slug: string;
  blog_image: string | null;
  blog_image_alt?: string | null;
  blog_image_title?: string | null;
  description_html: string;
  disease_id?: number;
  author_name?: string;
  published_at: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
}

interface Disease {
  id: number;
  name: string;
}
interface GlobalSEO {
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  caronical_url?: string;
}

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalSEO, setGlobalSEO] = useState<GlobalSEO | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
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
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setBlog(null);
    setRecentBlogs([]);


    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/blogs/slug/${slug}`
        );

        const data = res.data?.data;
        const blogData: Blog = Array.isArray(data) ? data[1] : data;
        setBlog(blogData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGlobalSEO()
    fetchBlog();
  }, [slug]);

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/diseases`)
      .then((res) => setDiseases(res.data.data || []))
      .catch(console.error);
  }, []);

  const diseaseMap = useMemo<Record<number, string>>(() => {
    const map: Record<number, string> = {};
    diseases.forEach((d) => {
      map[d.id] = d.name;
    });
    return map;
  }, [diseases]);

  useEffect(() => {
    if (!blog?.disease_id || !blog?.id) return;

    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/blogs/recent`,
          {
            params: { diseaseId: blog.disease_id },
          }
        );

        const filtered = (res.data.data || []).filter(
          (b: Blog) => b.id !== blog.id
        );

        setRecentBlogs(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRelated();
  }, [blog?.disease_id, blog?.id]);

  
  const seoTitle =
    blog?.meta_title ||
    globalSEO?.seo_title ||
    blog?.title ||
    "Best Hospital";

  const seoDescription =
    blog?.meta_description ||
    globalSEO?.seo_description ||
    "Best healthcare services";

  const seoKeywords =
    blog?.meta_keywords ||
    globalSEO?.seo_keywords ||
    "hospital, healthcare";

  const canonicalUrl =
    blog?.canonical_url ||
    (blog?.slug
      ? `${window.location.origin}/blogs/${blog.slug}`
      : undefined);

  useSeo(seoTitle, seoDescription, seoKeywords, canonicalUrl);



  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!blog) {
    return <div className="py-20 text-center">Blog not found</div>;
  }

  return (
    <>
      <Header />
      <TreatmentHeader
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Blog", link: "/blogs" },
          { label: blog.title },
        ]}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={diseases}
        />
      </TreatmentHeader>

      <Container>


        <div className="flex flex-col lg:flex-row gap-10">

          <article className="lg:w-[68%]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="rounded-full bg-[#F6F7F9] flex items-center justify-center">
                  <User size={21} />
                </div>
                <div>
                  <p className="font-medium admin-written-by">
                    Written by: {blog.author_name || "Admin"}
                  </p>
                  <p className="admin-written-date">
                    {new Date(blog.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* <button className="flex items-center bg-[#FBF6DD] gap-2 px-4 py-2 rounded-lg share-blog-btn">
                <Share2 size={16} />
                Share
              </button> */}
              <ShareButton />


            </div>
            <h1 className="page-details-section-item mb-6">
              {blog.title}
            </h1>
            <img
              src={
                blog.blog_image
                  ? `${API_BASE}${blog.blog_image}`
                  : "/placeholder.jpg"
              }
              alt={
                blog.blog_image_alt && blog.blog_image_alt !== "null"
                  ? blog.blog_image_alt
                  : blog.title
              }
              title={
                blog.blog_image_title && blog.blog_image_title !== "null"
                  ? blog.blog_image_title
                  : blog.title
              }
              loading="lazy"
              className="w-full h-[360px] object-cover rounded-lg mb-6"
            />


            {/* {blog.disease_id && (
              <p className="text-sm text-gray-600 mb-3">
                Disease:{" "}
                <strong>{diseaseMap[blog.disease_id]}</strong>
              </p>
            )} */}



            <div
              className="cms-content prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: decodeHtml(blog.description_html),
              }}
            />
          </article>

          <aside className="lg:w-[32%] space-y-6">
            <BookingForm />

            {recentBlogs.length > 0 && (
              <div className="bg-[#F6F7F9] rounded-lg p-5">
                <div className="mb-4 related-post-section-blog">
                  Related Posts
                </div>

                <ul className="space-y-3 ">
                  {recentBlogs.map((post) => (
                    <li key={post.id} className="section-blog-related-news">
                      <Link
                        to={`/blogs/${post.slug}`}
                        className="hover:underline blog-details-related "
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default BlogDetails;
