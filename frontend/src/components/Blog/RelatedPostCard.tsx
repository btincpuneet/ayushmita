import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../../data/blogData";

interface RelatedPostCardProps {
  post: BlogPost;
}

const RelatedPostCard: React.FC<RelatedPostCardProps> = ({ post }) => {
  return (
    <Link 
      to={`/blog/${post.slug}`} 
      className="block text-sm text-primary hover:text-primary/80 transition-colors leading-relaxed py-3 border-b border-border last:border-0 underline underline-offset-2"
    >
      {post.title}
    </Link>
  );
};

export default RelatedPostCard;
