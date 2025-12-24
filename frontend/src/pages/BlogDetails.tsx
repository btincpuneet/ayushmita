import React from "react";
import { useParams, Link } from "react-router-dom";
import { User, Share2 } from "lucide-react";

import { getBlogBySlug, getRelatedPosts } from "../data/blogData";
import BookingForm from "../components/BookingForm";
import RelatedPostCard from "../components/Blog/RelatedPostCard";
import Header from "../components/Header";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import SearchBar from "../components/Blog/SearchBar";
import Container from "../components/Container";
import Footer from "../components/Footer";

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || "");
  const relatedPosts = getRelatedPosts(slug || "", 4);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-primary underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = (content: string) =>
    content.split("\n\n").map((section, index) => {
      if (section.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-bold mt-8 mb-4">
            {section.replace("## ", "")}
          </h2>
        );
      }
      if (section.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-semibold mt-6 mb-3">
            {section.replace("### ", "")}
          </h3>
        );
      }
      if (section.startsWith("- ")) {
        return (
          <ul key={index} className="list-disc ml-6 space-y-2 mb-4 text-sm">
            {section.split("\n").map((item, i) => (
              <li key={i}>{item.replace("- ", "")}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-sm leading-relaxed mb-4">
          {section}
        </p>
      );
    });

  return (
    <>
      <Header />
      <TreatmentHeader  breadcrumbs={[{ label: "Home" }, { label: "Blog" }, { label: "BlogDetails" }]}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </TreatmentHeader>
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 ">

          {/* ARTICLE (WIDER) */}
          <article className="lg:w-[68%]">
            {/* Author + Share */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs">
                    written by{" "}
                    <span className="font-medium">{post.author}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                </div>
              </div>

              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground bg-orange-200 p-3 rounded-md">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              {post.title}
            </h1>

            {/* IMAGE */}
            <div className="rounded-lg overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[280px] md:h-[360px] object-cover"
              />
            </div>

            {/* CONTENT */}
            <div>{renderContent(post.content)}</div>

            {/* INFO BOX */}
            <div className="mt-10 bg-secondary/10 border-l-4 border-secondary p-5 rounded-md">
              <h3 className="font-bold text-lg mb-3">
                How Edhacare Assists You in Turkey For Hair Transplant
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Best clinics & certified surgeons</li>
                <li>• End-to-end medical coordination</li>
                <li>• Personalized treatment planning</li>
                <li>• Post-procedure care & follow-up</li>
              </ul>
            </div>
          </article>

          {/* SIDEBAR (NARROW) */}
          <aside className="lg:w-[32%] space-y-6">

            {/* STICKY BOOKING */}
            <div className="sticky top-28">
              <BookingForm />
            </div>

            {/* RELATED POSTS */}
            <div className="bg-card rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-lg mb-4 border-b pb-3">
                Related Posts
              </h3>

              <div className="space-y-4">
                {relatedPosts.map((post) => (
                  <RelatedPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

          </aside>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default BlogDetails;
