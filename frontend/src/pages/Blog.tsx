import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import { blogPosts, categories } from "../data/blogData";
import SearchBar from "../components/Blog/SearchBar";
import FeaturedBlogCard from "../components/Blog/FeaturedBlogCard";
import BlogCard from "../components/Blog/BlogCard";
import BookingForm from "../components/BookingForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";

const Blog: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [visiblePosts, setVisiblePosts] = useState(5);
    const [featuredIndex, setFeaturedIndex] = useState(0);

    const filteredPosts = useMemo(() => {
        return blogPosts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const featuredPosts = blogPosts.slice(0, 4);
    const visibleFeatured = featuredPosts.slice(featuredIndex, featuredIndex + 3);

    const handlePrevFeatured = () => {
        setFeaturedIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNextFeatured = () => {
        setFeaturedIndex((prev) => Math.min(featuredPosts.length - 3, prev + 1));
    };

    const handleLoadMore = () => {
        setVisiblePosts((prev) => prev + 5);
    };

    return (
        <>
            <Header />
           
            <TreatmentHeader
                title="Blog"
                breadcrumbs={[{ label: "Home" }, { label: "Blog" }]}
            >

                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

            </TreatmentHeader>
            <Container>

                <main className="container mx-auto px-4 pb-12">
                    {/* Featured Section */}
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-heading font-bold text-xl text-foreground">
                                Latest Health Tips
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrevFeatured}
                                    disabled={featuredIndex === 0}
                                    className="w-9 h-9 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                >
                                    <ArrowLeft className="w-4 h-4 text-foreground" />
                                </button>
                                <button
                                    onClick={handleNextFeatured}
                                    disabled={featuredIndex >= featuredPosts.length - 3}
                                    className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {visibleFeatured.map((post) => (
                                <FeaturedBlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>

                    {/* Blog List with Sidebar */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Blog List */}
                        <div className="flex-1 space-y-4">
                            {filteredPosts.slice(0, visiblePosts).map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}

                            {visiblePosts < filteredPosts.length && (
                                <div className="text-center pt-6">
                                    <button
                                        onClick={handleLoadMore}
                                        className="px-8 py-2.5 rounded-lg font-semibold transition-all duration-200 bg-secondary text-secondary-foreground hover:opacity-90"
                                    >
                                        Load more
                                    </button>
                                </div>
                            )}

                            {filteredPosts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">
                                        No articles found matching your criteria.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-[380px] flex-shrink-0">
                            <BookingForm />
                        </aside>
                    </div>
                </main>

            </Container>

            <Footer />
        </>

    );
};

export default Blog;
