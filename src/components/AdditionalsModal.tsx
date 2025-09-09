import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';
import { formatPrice } from '../utils/whatsapp';
import { MENU_ITEMS } from '../data/menu';

interface AdditionalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: MenuItem | null;
  onConfirm: (itemId: string, additionals: { id: string; qty: number }[]) => void;
}

export const AdditionalsModal = ({ isOpen, onClose, selectedItem, onConfirm }: AdditionalsModalProps) => {
  const [additionals, setAdditionals] = useState<{ [key: string]: number }>({});

  const additionalItems = MENU_ITEMS.filter(item => item.category === 'adicionais');

  const incrementAdditional = (id: string) => {
    setAdditionals(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const decrementAdditional = (id: string) => {
    setAdditionals(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1)
    }));
  };

  const getTotalAdditionalPrice = () => {
    return Object.entries(additionals).reduce((total, [id, qty]) => {
      const item = additionalItems.find(item => item.id === id);
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  const handleConfirm = () => {
    if (!selectedItem) return;
    
    const selectedAdditionals = Object.entries(additionals)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({ id, qty }));
    
    onConfirm(selectedItem.id, selectedAdditionals);
    setAdditionals({});
    onClose();
  };

  const handleClose = () => {
    setAdditionals({});
    onClose();
  };

  if (!isOpen || !selectedItem) return null;

  const totalPrice = selectedItem.price + getTotalAdditionalPrice();

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[90vh] border-4 border-[#FABF03]">
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#FABF03] to-[#FFD700] rounded-t-xl">
          <h3 className="text-xl font-black text-[#FF3131]">🍔 PERSONALIZAR</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors text-[#FF3131]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">
          <div className="mb-6 p-4 bg-gradient-to-r from-[#FF3131]/10 to-[#FABF03]/10 rounded-xl border-2 border-[#FABF03]/30">
            <h4 className="font-black text-[#FF3131] mb-2">{selectedItem.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{selectedItem.desc}</p>
            <div className="bg-[#FABF03] text-[#FF3131] px-3 py-2 rounded-lg font-black inline-block">
              {formatPrice(selectedItem.price)}
            </div>
          </div>

          <h4 className="font-black text-[#FF3131] mb-4 text-lg">➕ ADICIONAIS DISPONÍVEIS:</h4>
          
          <div className="space-y-3">
            {additionalItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border-2 border-[#FABF03]/30 rounded-xl bg-gradient-to-r from-white to-[#FABF03]/5 hover:border-[#FABF03] transition-colors">
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900">{item.name}</h5>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                  <div className="bg-[#FABF03] text-[#FF3131] px-2 py-1 rounded-lg text-sm font-black inline-block mt-2">
                    {formatPrice(item.price)}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={() => decrementAdditional(item.id)}
                    className="p-2 hover:bg-[#FABF03]/20 rounded-xl transition-colors text-[#FF3131] disabled:opacity-50"
                    disabled={!additionals[item.id]}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-black text-[#FF3131] bg-[#FABF03]/20 py-1 rounded-lg">
                    {additionals[item.id] || 0}
                  </span>
                  <button
                    onClick={() => incrementAdditional(item.id)}
                    className="p-2 hover:bg-[#FABF03]/20 rounded-xl transition-colors text-[#FF3131]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-gradient-to-r from-[#FABF03]/10 to-[#FF3131]/5 rounded-b-xl border-t-2 border-[#FABF03]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-black text-[#FF3131] text-lg">TOTAL:</span>
            <span className="font-black text-xl text-white bg-[#FF3131] px-4 py-2 rounded-xl shadow-lg">
              {formatPrice(totalPrice)}
            </span>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 border-2 border-[#FABF03] rounded-xl hover:bg-[#FABF03]/10 transition-colors text-[#FF3131] font-bold"
            >
              CANCELAR
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-[#FF3131] text-white px-4 py-3 rounded-xl hover:bg-[#FF3131]/90 transition-all duration-200 font-black shadow-lg transform hover:scale-105"
            >
              ADICIONAR AO CARRINHO
            </button>
          </div>
        </div>
      </div>
    </>
  );
};