import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import { products } from '@/data/products';
import { Product } from '@/types';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionTitle } from '@/components/common/SectionTitle';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
}

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 2000],
    sizes: [],
    colors: []
  });

  // Parse URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
    
    if (filterParam === 'new') {
      setSortBy('newest');
    } else if (filterParam === 'sale') {
      // Filter for sale items will be applied in useMemo
    }
  }, [searchParams]);

  // Get all unique sizes and colors
  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes).sort();
  }, []);

  const allColors = useMemo(() => {
    const colors = new Map<string, string>();
    products.forEach(p => p.colors.forEach(c => colors.set(c.name, c.hex)));
    return Array.from(colors.entries());
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // Apply price filter
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply size filter
    if (filters.sizes.length > 0) {
      result = result.filter(p => 
        p.sizes.some(s => filters.sizes.includes(s))
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      result = result.filter(p => 
        p.colors.some(c => filters.colors.includes(c.name))
      );
    }

    // Apply sale filter from URL
    const filterParam = searchParams.get('filter');
    if (filterParam === 'sale') {
      result = result.filter(p => p.isSale);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [filters, sortBy, searchParams]);

  // Toggle filter handlers
  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 2000],
      sizes: [],
      colors: []
    });
    setSearchParams({});
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.sizes.length + 
    filters.colors.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000 ? 1 : 0);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="section-padding py-8 border-b border-[var(--noir-border)]">
        <SectionTitle 
          title={searchParams.get('filter') === 'sale' ? 'Sale' : 'Shop All'}
          subtitle="Collection"
          align="left"
          className="mb-4"
        />
        <p className="text-[var(--noir-gray)] max-w-2xl">
          Discover our curated selection of timeless pieces, crafted with precision 
          and designed for the modern sophisticate.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="section-padding py-4 border-b border-[var(--noir-border)] sticky top-16 md:top-20 bg-white/95 backdrop-blur-md z-30">
        <div className="flex items-center justify-between gap-4">
          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-[var(--noir-border)] hover:border-[var(--noir-black)] transition-colors"
          >
            <FiFilter size={18} />
            <span className="hidden sm:inline">Filter</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-[var(--noir-black)] text-white text-xs flex items-center justify-center rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Results Count */}
          <span className="text-sm text-[var(--noir-gray)]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none px-4 py-2 pr-10 border border-[var(--noir-border)] bg-white focus:outline-none focus:border-[var(--noir-black)] cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-padding py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside 
            className={`${
              isFilterOpen ? 'block' : 'hidden'
            } lg:block w-full lg:w-64 flex-shrink-0 fixed lg:static inset-0 z-40 bg-white lg:bg-transparent overflow-auto lg:overflow-visible`}
          >
            <div className="p-4 lg:p-0">
              {/* Mobile Filter Header */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-display text-xl">Filters</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--noir-gray)] hover:text-[var(--noir-black)] underline mb-6"
                >
                  Clear all filters
                </button>
              )}

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Category</h4>
                <div className="space-y-2">
                  {['men', 'women', 'accessories'].map((category) => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 border border-[var(--noir-border)] rounded-none focus:ring-0 focus:ring-offset-0 accent-[var(--noir-black)]"
                      />
                      <span className="text-sm capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Price Range</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full accent-[var(--noir-black)]"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-8">
                <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-10 h-10 text-sm border transition-colors ${
                        filters.sizes.includes(size)
                          ? 'bg-[var(--noir-black)] text-white border-[var(--noir-black)]'
                          : 'border-[var(--noir-border)] hover:border-[var(--noir-black)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8">
                <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {allColors.map(([name, hex]) => (
                    <button
                      key={name}
                      onClick={() => toggleColor(name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        filters.colors.includes(name)
                          ? 'border-[var(--noir-black)] scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: hex }}
                      title={name}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Apply Button */}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full btn-primary lg:hidden"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={filteredProducts} columns={3} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}

export default Shop;
