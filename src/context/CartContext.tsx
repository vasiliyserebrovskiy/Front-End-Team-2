import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../pages/Products/types';

type CartItem = {
	product: Product;
	quantity: number;
};

type CartMap = Record<number, CartItem>;

type CartContextType = {
	cart: CartMap;
	addOne: (product: Product) => void;
	removeOne: (id: number) => void;
	removeAll: (id: number) => void;
	clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
const [cart, setCart] = useState<CartMap>(() => {
	const stored = localStorage.getItem('cart');
	try {
		const parsed = stored ? JSON.parse(stored) : {};
		if (typeof parsed !== 'object' || parsed === null) throw new Error('Invalid format');

		// доп. проверка на корректность структуры cart
		for (const key in parsed) {
			const item = parsed[key];
			if (typeof item !== 'object' || typeof item.quantity !== 'number' || typeof item.product?.itemID !== 'number') {
				throw new Error('Corrupted item');
			}
		}

		return parsed;
	} catch (err) {
		console.warn('⚠️ Invalid cart data. Resetting cart.', err);
		localStorage.removeItem('cart');
		return {};
	}
});

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addOne = (product: Product) => {
		setCart(prev => {
			const current = prev[product.itemID];
			return {
				...prev,
				[product.itemID]: {
					product,
					quantity: current ? current.quantity + 1 : 1,
				},
			};
		});
	};

	const removeOne = (id: number) => {
		setCart(prev => {
			const current = prev[id];
			if (!current) return prev;
			if (current.quantity <= 1) {
				const { [id]: _, ...rest } = prev;
				return rest;
			}
			return {
				...prev,
				[id]: {
					...current,
					quantity: current.quantity - 1,
				},
			};
		});
	};

	const removeAll = (id: number) => {
		setCart(prev => {
			const { [id]: _, ...rest } = prev;
			return rest;
		});
	};

	const clearCart = () => setCart({});

	return <CartContext.Provider value={{ cart, addOne, removeOne, removeAll, clearCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) throw new Error('useCart must be used within CartProvider');
	return context;
};
