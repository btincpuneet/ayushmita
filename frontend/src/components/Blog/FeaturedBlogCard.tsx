import React from "react";
import { Link } from "react-router-dom";

type FeaturedBlogCardProps = {
  post: {
    _id?: string;
    slug: string;
    title: string;
    blog_image?: string | null;
    short_description?: string;
    description_html?: string;
  };
};

const stripHtml = (html: string = "") =>
  html.replace(/<[^>]*>?/gm, "").slice(0, 120);

const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ post }) => {
  if (!post) return null;

  return (
    <div className="px-2 h-full">
      <Link
        to={`/blogs/slug/${post.slug}`}
        aria-label={post.title}
        className="block h-full"
      >
        <div className="h-full rounded-lg  shadow hover:shadow-lg transition bg-white flex flex-col">
          
          {/* IMAGE */}
          <img
            src={post.blog_image || "/placeholder.jpg"}
            alt={post.title}
            className="w-full h-56 object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
            }}
          />

          {/* CONTENT */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-bold mb-2 text-base line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-3">
              {post.short_description?.trim()
                ? post.short_description
                : stripHtml(post.description_html || "")}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedBlogCard;
