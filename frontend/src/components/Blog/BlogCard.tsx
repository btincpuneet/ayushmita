import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../../data/blogData";
import { User } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <article className="bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-5">
        
        
        <div className="flex-1 min-w-0">
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p>written by: <span className="text-md font-medium">{post.author}</span></p>
              <p>{post.date}</p>
            </div>
          </div>

          <span
            className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded mb-2"
            style={{ color: "hsl(40 91% 54%)" }}
          >
            {post.category}
          </span>

         
          <h3 className="font-heading font-bold text-base md:text-lg text-foreground mt-2 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-70 h-fit flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
