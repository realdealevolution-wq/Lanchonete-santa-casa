import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { CartItem, MenuItem } from '../types';
import { openWhatsApp } from '../utils/whatsapp';

interface CartProps {
  cart: CartItem[];
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onClearCart: () => void;
  totalPrice: number;
}

export const Cart = ({
  cart,
  items,
  isOpen,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onClearCart,
  totalPrice
}: CartProps) => {
  if (!isOpen) return null;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Carrinho vazio');
      return;
    }
    openWhatsApp(cart);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-2">
      <div className="bg-white rounded-t-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Carrinho
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Carrinho vazio</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((cartItem) => {
                const menuItem = items.find(item => item.id === cartItem.id);
                if (!menuItem) return null;

                return (
                  <div key={cartItem.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{menuItem.name}</h3>
                      <button
                        onClick={() => onRemove(cartItem.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {cartItem.additionals && cartItem.additionals.length > 0 && (
                      <div className="text-sm text-gray-600 mb-2">
                        <p className="font-medium">Adicionais:</p>
                        {cartItem.additionals.map((additional, index) => {
                          const additionalItem = items.find(item => item.id === additional.id);
                          return (
                            <p key={index}>• {additionalItem?.name || 'Item não encontrado'} x{additional.qty}</p>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecrement(cartItem.id)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold min-w-[2rem] text-center">
                          {cartItem.qty}
                        </span>
                        <button
                          onClick={() => onIncrement(cartItem.id)}
                          className="w-8 h-8 rounded-full bg-[#FABF03] hover:bg-[#E6AC02] flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bold text-[#FF3131]">
                        R$ {(() => {
                          const basePrice = menuItem.price * cartItem.qty;
                          const additionalsPrice = cartItem.additionals?.reduce((total, additional) => {
                            const additionalItem = items.find(item => item.id === additional.id);
                            return total + (additionalItem ? additionalItem.price * additional.qty * cartItem.qty : 0);
                          }, 0) || 0;
                          return (basePrice + additionalsPrice).toFixed(2);
                        })()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-xl font-bold text-[#FF3131]">
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
              <p className="text-sm text-yellow-800 font-medium">
                📍 TAXA DE ENTREGA À SER CALCULADA APÓS O ENVIO DO ENDEREÇO
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={onClearCart}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                Limpar
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Finalizar no WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};