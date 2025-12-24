import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { categories } from "../../data/blogData";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex items-center bg-card rounded-lg overflow-hidden border border-border shadow-sm w-1/2 mx-auto">
      <div className="relative ">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none bg-transparent  px-4 py-3 pr-10 bg-white text-sm font-medium text-foreground border-r border-border focus:outline-none cursor-pointer"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 bg-white-translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>

     
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search articles"
        className="flex-1 px-4 py-3 text-sm bg-white text-foreground bg-transparent focus:outline-none"
      />

      
      <button className="bg-green-800 hover:opacity-90 px-4 py-3 transition-colors">
        <Search className="w-5 h-5 text-secondary-foreground " />
      </button>
    </div>
  );
};

export default SearchBar;
