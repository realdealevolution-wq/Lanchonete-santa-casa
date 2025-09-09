import { CartItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

// Configure your WhatsApp number here (international format without symbols)
const PHONE_NUMBER = '5515997630530'; // Lanchonete Santa Casa WhatsApp

export const formatPrice = (price: number): string => {
  return 'R$ ' + price.toFixed(2).replace('.', ',');
};

export const buildWhatsAppMessage = (cart: CartItem[]): string => {
  if (cart.length === 0) return 'Olá! Gostaria de fazer um pedido. (carrinho vazio)';
  
  const shop = 'Lanchonete Santa Casa';
  const lines: string[] = [];
  
  lines.push(`🍔 Pedido para ${shop}:`);
  lines.push('');
  
  cart.forEach(cartItem => {
    const menuItem = MENU_ITEMS.find(item => item.id === cartItem.id);
    if (menuItem) {
      const basePrice = menuItem.price * cartItem.qty;
      const additionalsPrice = cartItem.additionals?.reduce((total, additional) => {
        const additionalItem = MENU_ITEMS.find(item => item.id === additional.id);
        return total + (additionalItem ? additionalItem.price * additional.qty * cartItem.qty : 0);
      }, 0) || 0;
      const itemTotal = basePrice + additionalsPrice;
      
      lines.push(`• ${menuItem.name} (x${cartItem.qty}) - ${formatPrice(itemTotal)}`);
      
      // Adicionar adicionais na mensagem
      if (cartItem.additionals && cartItem.additionals.length > 0) {
        cartItem.additionals.forEach(additional => {
          const additionalItem = MENU_ITEMS.find(item => item.id === additional.id);
          if (additionalItem) {
            lines.push(`  + ${additionalItem.name} (x${additional.qty})`);
          }
        });
      }
    }
  });
  
  const total = cart.reduce((sum, cartItem) => {
    const menuItem = MENU_ITEMS.find(item => item.id === cartItem.id);
    if (!menuItem) return sum;
    
    const basePrice = menuItem.price * cartItem.qty;
    const additionalsPrice = cartItem.additionals?.reduce((total, additional) => {
      const additionalItem = MENU_ITEMS.find(item => item.id === additional.id);
      return total + (additionalItem ? additionalItem.price * additional.qty * cartItem.qty : 0);
    }, 0) || 0;
    
    return sum + basePrice + additionalsPrice;
  }, 0);
  
  lines.push('');
  lines.push(`💰 *Total: ${formatPrice(total)}*`);
  lines.push('');
  lines.push('📍 *Endereço para entrega:*');
  lines.push('📝 *Observações:*');
  
  return lines.join('\n');
};

export const openWhatsApp = (cart: CartItem[]): void => {
  const message = buildWhatsAppMessage(cart);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

export const copyMessageToClipboard = async (cart: CartItem[]): Promise<void> => {
  const message = buildWhatsAppMessage(cart);
  
  try {
    await navigator.clipboard.writeText(message);
    alert('Mensagem copiada! Cole no WhatsApp (Ctrl+V / Colar).');
  } catch (error) {
    // Fallback for browsers that don't support clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = message;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Mensagem copiada! Cole no WhatsApp (Ctrl+V / Colar).');
    } catch (err) {
      prompt('Copie a mensagem abaixo:', message);
    }
    document.body.removeChild(textArea);
  }
};