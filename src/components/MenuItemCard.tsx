import { Plus } from 'lucide-react';
import { MenuItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (itemId: string) => void;
}

export const MenuItemCard = ({ item, onAddToCart }: MenuItemCardProps) => {
  const isLanche = item.category === 'especiais' || item.category === 'tradicionais' || item.category === 'hotdogs';

  return (
    <article className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#FABF03]/20 hover:border-[#FABF03] transform hover:-translate-y-1 min-h-[200px] flex flex-col">
      <div className="flex flex-col gap-4">
        {/* Header with category badge */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="inline-block bg-black text-[#FABF03] px-3 py-1 rounded-full text-xs font-bold mb-2 shadow-sm">
              {item.category === 'especiais' && '🥇 ESPECIAL'}
              {item.category === 'tradicionais' && '🍔 TRADICIONAL'}
              {item.category === 'hotdogs' && '🌭 DOG'}
              {item.category === 'bebidas' && '🥤 BEBIDA'}
              {item.category === 'adicionais' && '➕ ADICIONAL'}
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">{item.name}</h3>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-3 flex-1">{item.desc}</p>
        
        {/* Price and button */}
        <div className="flex items-center justify-between pt-2">
          <div className="bg-[#FABF03] text-[#FF3131] px-3 py-2 rounded-lg font-black text-lg shadow-sm">
            {formatPrice(item.price)}
          </div>
          <button
            onClick={() => onAddToCart(item.id)}
            className="bg-[#FF3131] text-white px-3 py-2 rounded-xl hover:bg-[#FF3131]/90 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-[#FF3131]/30 active:scale-95 flex items-center gap-1 text-xs font-bold shadow-lg transform hover:scale-105"
            aria-label={`Adicionar ${item.name} ao carrinho`}
          >
            <Plus size={16} />
            {isLanche ? 'ADICIONAR' : 'ADICIONAR'}
          </button>
        </div>
      </div>
    </article>
  );
};