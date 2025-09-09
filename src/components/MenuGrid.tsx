import { MenuItem, Category } from '../types';
import { MenuItemCard } from './MenuItemCard';

interface MenuGridProps {
  items: MenuItem[];
  activeCategory: Category;
  onAddToCart: (itemId: string) => void;
}

export const MenuGrid = ({ items, activeCategory, onAddToCart }: MenuGridProps) => {
  const filteredItems = items.filter(item => 
    (activeCategory === 'all' || item.category === activeCategory) && item.category !== 'adicionais'
  );

  // Group items by category for better organization
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const categoryTitles = {
    especiais: '🥇 LANCHES ESPECIAIS',
    tradicionais: '🍔 LANCHES TRADICIONAIS', 
    hotdogs: '🌭 CACHORRO-QUENTE',
    bebidas: '🥤 BEBIDAS'
  };

  return (
    <section className="space-y-8">
      {activeCategory === 'all' ? (
        // Show all categories with headers
        Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category}>
            <h2 className="text-xl md:text-2xl font-black text-[#FF3131] mb-4 text-center bg-[#FABF03]/20 py-3 rounded-xl shadow-sm">
              {categoryTitles[category as keyof typeof categoryTitles]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {categoryItems.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        // Show single category
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};