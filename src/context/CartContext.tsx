import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../pages/Products/types';


type CartContextType = {
	cart: Product[];
	addToCart: (item: Product) => void;
	removeFromCart: (id: number) => void;
	clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [cart, setCart] = useState<Product[]>(() => {
		const stored = localStorage.getItem('cart');
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product: Product) => {
		setCart(prev => [...prev, product]);
	};

	const removeFromCart = (id: number) => {
		setCart(prev => prev.filter(p => p.itemID !== id));
	};

	const clearCart = () => {
		setCart([]);
	};

	return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
};



export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within CartProvider');
	}
	return context;
};
