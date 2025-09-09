import { useState, useCallback } from 'react';
import { CartItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((itemId: string, additionals?: { id: string; qty: number }[]) => {
    setCart(currentCart => {
      // Para lanches com adicionais, sempre criar um novo item
      const menuItem = MENU_ITEMS.find(item => item.id === itemId);
      const isLanche = menuItem && (menuItem.category === 'especiais' || menuItem.category === 'tradicionais' || menuItem.category === 'hotdogs');
      
      if (isLanche && additionals && additionals.length > 0) {
        // Sempre adicionar como novo item se tem adicionais
        return [...currentCart, { id: itemId, qty: 1, additionals }];
      }
      
      const existingItem = currentCart.find(item => 
        item.id === itemId && 
        (!item.additionals || item.additionals.length === 0) &&
        (!additionals || additionals.length === 0)
      );
      
      if (existingItem && (!additionals || additionals.length === 0)) {
        return currentCart.map(item =>
          item.id === itemId && (!item.additionals || item.additionals.length === 0)
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...currentCart, { id: itemId, qty: 1, additionals }];
      }
    });
  }, []);

  const incrementItem = useCallback((itemId: string) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === itemId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }, []);

  const decrementItem = useCallback((itemId: string) => {
    setCart(currentCart =>
      currentCart
        .map(item =>
          item.id === itemId ? { ...item, qty: Math.max(0, item.qty - 1) } : item
        )
        .filter(item => item.qty > 0)
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCart(currentCart => currentCart.filter((item, index) => !(item.id === itemId && index === currentCart.findIndex(cartItem => cartItem.id === itemId))));
  }, []);

  const removeSpecificItem = useCallback((index: number) => {
    setCart(currentCart => currentCart.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.qty, 0);
  }, [cart]);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, cartItem) => {
      const menuItem = MENU_ITEMS.find(item => item.id === cartItem.id);
      let itemTotal = menuItem ? menuItem.price * cartItem.qty : 0;
      
      // Adicionar preço dos adicionais
      if (cartItem.additionals) {
        const additionalsTotal = cartItem.additionals.reduce((addTotal, additional) => {
          const additionalItem = MENU_ITEMS.find(item => item.id === additional.id);
          return addTotal + (additionalItem ? additionalItem.price * additional.qty * cartItem.qty : 0);
        }, 0);
        itemTotal += additionalsTotal;
      }
      
      return total + itemTotal;
    }, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    incrementItem,
    decrementItem,
    removeItem,
    removeSpecificItem,
    clearCart,
    getTotalItems,
    getTotalPrice
  };
};