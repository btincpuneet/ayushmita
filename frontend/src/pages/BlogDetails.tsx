import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { User, Share2 } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import SearchBar from "../components/Blog/SearchBar";
import BookingForm from "../components/BookingForm";

const API_BASE_URL = "http://127.0.0.1:5001";

/* ================= TYPES ================= */
interface Blog {
  id: number;
  title: string;
  slug: string;
  blog_image: string | null;
  description_html: string;
  disease_id?: number;
  author_name?: string;
  published_at: string;
}

interface Disease {
  id: number;
  name: string;
}

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setBlog(null);
    setRecentBlogs([]);


    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/blogs/slug/${slug}`
        );
        console.log("res", res.data);

        const data = res.data?.data;

        if (!data) {
          setBlog(null);
          return;
        }

        const blogData: Blog = Array.isArray(data) ? data[1] : data;
        console.log(blogData);

        setBlog(blogData);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/diseases`)
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
          `${API_BASE_URL}/api/blogs/recent`,
          {
            params: {
              diseaseId: blog.disease_id,
            },
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
          { label: "Home", path: "/" },
          { label: "Blog", path: "/blogs" },
          { label: blog.title },
        ]}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </TreatmentHeader>

      <Container>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <p className="font-medium">
                Written by: {blog.author_name || "Admin"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(blog.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">
            <Share2 size={16} />
            Share
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <article className="lg:w-[68%]">
            <img
              src={
                blog.blog_image
                  ? `${API_BASE_URL}${blog.blog_image}`
                  : "/placeholder.jpg"
              }
              alt={blog.title}
              className="w-full h-[360px] object-cover rounded-lg mb-6"
            />

            {blog.disease_id && (
              <p className="text-sm text-gray-600 mb-3">
                Disease:{" "}
                <strong>{diseaseMap[blog.disease_id]}</strong>
              </p>
            )}

            <h1 className="text-3xl font-bold mb-6">
              {blog.title}
            </h1>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: blog.description_html,
              }}
            />
          </article>

          <aside className="lg:w-[32%] space-y-6">
            <BookingForm />

            {recentBlogs.length > 0 && (
              <div className="bg-white border rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4">
                  Related Posts
                </h3>

                <ul className="space-y-3">
                  {recentBlogs.map((post) => (
                    <li key={post.id}>
                      <Link
                        to={`/blogs/${post.slug}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
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
