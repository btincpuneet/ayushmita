import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE } from "../config/api";

interface Blog {
  id: number;
  title: string;
  slug: string;
  blog_image?: string;
}

interface Props {
  diseaseId: number;
  treatmentId?: number;
}

const BlogSection: React.FC<Props> = ({ diseaseId, treatmentId = 0 }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!diseaseId) return;

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/blogs/recent`,
          {
            params: {
              diseaseId,
              treatmentId: treatmentId || 0,
            },
          }
        );

        setBlogs(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [diseaseId, treatmentId]);

  if (loading) return null;
  if (!blogs.length) return null;

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">
          Related Blogs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.slug}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              {blog.blog_image && (
                <img
                  src={`${API_BASE}${blog.blog_image}`}
                  alt={blog.title}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
              )}

              <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {blog.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
