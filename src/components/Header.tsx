import { ShoppingCart, Utensils } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header = ({ cartCount, onOpenCart }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-[#FABF03] to-[#FFD700] shadow-lg">
      <div className="px-3 md:px-5 py-3 md:py-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF3131] rounded-full shadow-lg">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#FF3131] drop-shadow-sm">🍔 LANCHONETE</h1>
              <p className="text-xs md:text-sm text-[#FF3131] font-semibold">SANTA CASA</p>
            </div>
          </div>
          
          <button
            onClick={onOpenCart}
            data-cart-button
            className="relative p-3 bg-[#FF3131] hover:bg-[#FF3131]/90 rounded-full transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-white/50 shadow-lg transform hover:scale-105"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#FF3131] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};