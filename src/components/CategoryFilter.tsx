import { Category } from '../types';

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { id: 'all' as Category, label: 'TODOS', emoji: '🍽️' },
    { id: 'especiais' as Category, label: 'ESPECIAIS', emoji: '🥇' },
    { id: 'tradicionais' as Category, label: 'TRADICIONAIS', emoji: '🍔' },
    { id: 'hotdogs' as Category, label: 'CACHORRO-QUENTE', emoji: '🌭' },
    { id: 'bebidas' as Category, label: 'BEBIDAS', emoji: '🥤' },
  ];

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 px-1">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-[#FABF03]/50 whitespace-nowrap shadow-md transform hover:scale-105 ${
            activeCategory === category.id
              ? 'bg-[#FF3131] text-white shadow-lg scale-105'
              : 'bg-white border-2 border-[#FABF03] text-[#FF3131] hover:bg-[#FABF03]/10 min-w-fit'
          }`}
        >
          <span className="mr-2">{category.emoji}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
};