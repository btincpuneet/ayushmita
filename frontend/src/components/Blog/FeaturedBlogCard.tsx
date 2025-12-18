import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../../data/blogData";

interface FeaturedBlogCardProps {
  post: BlogPost;
}

const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block ">
      <article className="bg-card rounded-lg overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="h-36 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-heading font-bold text-sm text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedBlogCard;
