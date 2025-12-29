import React from "react";
import { Search, ChevronDown } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Category[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="flex items-center bg-card rounded-lg overflow-hidden border shadow-sm w-1/2 mx-auto">
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none px-4 py-3 pr-10 bg-white text-sm font-medium border-r cursor-pointer"
        >
          <option value="">All Diseases</option>

          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search articles"
        className="flex-1 px-4 py-3 text-sm focus:outline-none"
      />

      <button className="bg-green-800 px-4 py-3">
        <Search className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
