import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { MenuGrid } from './components/MenuGrid';
import { Cart } from './components/Cart';
import { AdditionalsModal } from './components/AdditionalsModal';
import { Footer } from './components/Footer';
import { useCart } from './hooks/useCart';
import { MENU_ITEMS } from './data/menu';
import { Category, MenuItem } from './types';
import { openWhatsApp } from './utils/whatsapp';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdditionalsModalOpen, setIsAdditionalsModalOpen] = useState(false);
  const [selectedItemForAdditionals, setSelectedItemForAdditionals] = useState<MenuItem | null>(null);
  const {
    cart,
    addToCart,
    incrementItem,
    decrementItem,
    removeItem,
    removeSpecificItem,
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Keyboard shortcut: Shift + W opens WhatsApp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        if (cart.length === 0) {
          alert('Carrinho vazio');
        } else {
          openWhatsApp(cart);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart]);

  // Smooth scroll to bottom when cart opens
  const handleOpenCart = () => {
    setIsCartOpen(true);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  // Handle add to cart with visual feedback
  const handleAddToCart = (itemId: string) => {
    const menuItem = MENU_ITEMS.find(item => item.id === itemId);
    const isLanche = menuItem && (menuItem.category === 'especiais' || menuItem.category === 'tradicionais' || menuItem.category === 'hotdogs');
    
    if (isLanche) {
      setSelectedItemForAdditionals(menuItem);
      setIsAdditionalsModalOpen(true);
    } else {
      addToCart(itemId);
      
      // Flash animation effect
      const cartButton = document.querySelector('[data-cart-button]');
      if (cartButton) {
        cartButton.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.1)' },
          { transform: 'scale(1)' }
        ], {
          duration: 300,
          easing: 'ease-out'
        });
      }
    }
  };

  const handleConfirmAdditionals = (itemId: string, additionals: { id: string; qty: number }[]) => {
    addToCart(itemId, additionals);
    
    // Flash animation effect
    const cartButton = document.querySelector('[data-cart-button]');
    if (cartButton) {
      cartButton.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
      ], {
        duration: 300,
        easing: 'ease-out'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Background Image */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#FABF03]/5 via-white to-[#FF3131]/5 pointer-events-none z-0" />
      
      <Header 
        cartCount={totalItems} 
        onOpenCart={handleOpenCart}
      />
      
      <main className="px-3 md:px-5 py-4 md:py-6 max-w-7xl mx-auto relative z-10 min-h-screen">
        <Hero />
        
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <MenuGrid
          items={MENU_ITEMS}
          activeCategory={activeCategory}
          onAddToCart={handleAddToCart}
        />
        
        <Footer />
      </main>

      <Cart
        cart={cart}
        items={MENU_ITEMS}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
        onRemoveSpecific={removeSpecificItem}
        onClearCart={clearCart}
        totalPrice={totalPrice}
      />

      <AdditionalsModal
        isOpen={isAdditionalsModalOpen}
        onClose={() => {
          setIsAdditionalsModalOpen(false);
          setSelectedItemForAdditionals(null);
        }}
        selectedItem={selectedItemForAdditionals}
        onConfirm={handleConfirmAdditionals}
      />
    </div>
  );
}

export default App;