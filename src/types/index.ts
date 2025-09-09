export interface MenuItem {
  id: string;
  category: 'especiais' | 'tradicionais' | 'hotdogs' | 'bebidas' | 'adicionais';
  name: string;
  desc: string;
  price: number;
  img: string;
}

export interface CartItem {
  id: string;
  qty: number;
  additionals?: { id: string; qty: number }[];
}

export type Category = 'all' | 'especiais' | 'tradicionais' | 'hotdogs' | 'bebidas' | 'adicionais';