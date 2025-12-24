import React from "react";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const stripHtml = (html = "") =>
  html.replace(/<[^>]*>?/gm, "").slice(0, 150);

const BlogCard = ({ post }: any) => {
  return (
    <Link to={`/blogs/slug/${post.slug}`} className="block">
      <div className="flex gap-4 border rounded-lg overflow-hidden hover:shadow transition">
        <img
          src={post.blog_image || "/placeholder.jpg"}
          className="w-44 h-32 object-cover"
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
          alt={post.title}
        />

        <div className="p-4 flex-1">
          <h3 className="font-bold line-clamp-2">{post.title}</h3>

          <div className="flex gap-4 text-sm text-gray-500 my-1">
            <span className="flex items-center gap-1">
              <User size={14} />
              {post.author_name || "Admin"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.published_at).toLocaleDateString()}
            </span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {post.short_description ||
              stripHtml(post.description_html)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
