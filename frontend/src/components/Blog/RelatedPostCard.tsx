import React from "react";

const RelatedPostCard = ({ post }: any) => {
  return (
    <p className="text-sm text-primary hover:underline leading-snug">
      {post.title}
    </p>
  );
};

export default RelatedPostCard;
