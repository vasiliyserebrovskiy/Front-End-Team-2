import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/priceUtils';

export default function Cart() {
	const { cart, removeFromCart, clearCart } = useCart();

	// Безопасная фильтрация
	const safeCart = cart.filter(item => item && typeof item === 'object' && typeof item.itemID === 'number' && typeof item.itemPrice === 'number');

	// Группировка по магазину
	const grouped = safeCart.reduce((acc, item) => {
		const shop = item.restaurantName || 'Unknown Shop';
		if (!acc[shop]) acc[shop] = [];
		acc[shop].push(item);
		return acc;
	}, {} as Record<string, typeof safeCart>);

	// Общая сумма
	const total = safeCart.reduce((sum, item) => sum + item.itemPrice, 0);

	return (
		<div className='p-6'>
			<h2 className='text-4xl font-bold mb-8 text-center text-pink-500'>🛒 Your Cart</h2>

			{Object.entries(grouped).map(([shop, items]) => (
				<div key={shop} className='mb-10'>
					<h3 className='text-2xl font-semibold mb-4 text-gray-800'>{shop}</h3>
					<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{items.map(item => (
							<div key={item.itemID} className='bg-white shadow-md p-4 rounded-xl flex flex-col items-center text-center'>
								<img src={item.imageUrl || ''} alt={item.itemName || 'Product'} className='w-32 h-32 object-cover rounded-full mb-2' />
								<h4 className='text-lg font-bold'>{item.itemName}</h4>
								<p className='text-yellow-600 font-bold'>€{formatPrice(item.itemPrice)}</p>
								<button onClick={() => removeFromCart(item.itemID)} className='mt-2 text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full'>
									Remove
								</button>
							</div>
						))}
					</div>
				</div>
			))}

			{safeCart.length > 0 ? (
				<div className='mt-10 text-center'>
					<p className='text-xl font-semibold mb-4'>
						Total: <span className='text-pink-600 font-bold'>€{formatPrice(total)}</span>
					</p>
					<button onClick={clearCart} className='bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full'>
						Clear Cart
					</button>
				</div>
			) : (
				<p className='text-center text-gray-500 mt-20'>Your cart is empty</p>
			)}
		</div>
	);
}
