import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../pages/Products/types';


type CartContextType = {
	cart: Product[];
	addToCart: (item: Product) => void;
	removeFromCart: (id: number) => void;
	clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Product[]>([]);

	const addToCart = (item: Product) => {
		setCart(prev => [...prev, item]);
	};

	const removeFromCart = (id: number) => {
		setCart(prev => prev.filter(item => item.itemID !== id));
	};

	const clearCart = () => setCart([]);

	return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) throw new Error('useCart must be used within CartProvider');
	return context;
}
