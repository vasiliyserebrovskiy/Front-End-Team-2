import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/priceUtils';

export default function Cart() {
	const { cart, addOne, removeOne, removeAll, clearCart } = useCart();

	const items = Object.values(cart);
	const total = items.reduce((sum, { product, quantity }) => sum + product.itemPrice * quantity, 0);
	const [showThankYou, setShowThankYou] = useState(false);

	async function handleSendOrder() {
		const usercode = localStorage.getItem('usercode');
		if (!usercode) {
			alert('User code not found!');
			return;
		}

		// Group items by stores
		const itemsByRestaurant = items.reduce((acc, { product, quantity }) => {
			const rid = product.restaurantID;
			if (!acc[rid]) acc[rid] = [];
			acc[rid].push({ itemName: product.itemName, quantity });
			return acc;
		}, {} as Record<string, { itemName: string; quantity: number }[]>);

		let successCount = 0;
		let failCount = 0;

		for (const [restaurantID, menuDTO] of Object.entries(itemsByRestaurant)) {
			try {
				console.log(`Sending to stores ${restaurantID}:`, JSON.stringify({ menuDTO }, null, 2));
				console.log(`https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Order/${restaurantID}/makeorder?apikey=${usercode}`);
				const res = await fetch(`https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Order/${restaurantID}/makeorder?apikey=${usercode}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ menuDTO }),
				});

				const data = await res.json();
				console.log(`Order for restaurant ${restaurantID}:`, data);

				if (res.ok) {
					successCount++;
				} else {
					failCount++;
				}
			} catch (err) {
				console.error(`Error sending order to stores ${restaurantID}`, err);
				failCount++;
			}
		}

		let message = '';

		if (failCount === 0) {
			message = `🎉 Thank you for your order!\n\n✅ All ${successCount} order(s) were sent successfully.`;
		} else {
			message = `⚠️ Your order was partially sent.\n\n✅ Sent: ${successCount}\n❌ Failed: ${failCount}\n\nPlease check your connection and try again.`;
		}

		alert(message);
		if (successCount > 0) {
			clearCart();
			setShowThankYou(true);
			setTimeout(() => setShowThankYou(false), 3000);
		}
	}

	return (
		<div className='p-6 w-[80%] mx-auto'>
			<h2 className='text-4xl font-bold mb-8 text-center text-pink-500'>🛒 Your Cart</h2>

			{showThankYou && (
				<div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
					<div className='w-[50vw] h-[50vh] flex items-center justify-center text-pink-600 text-6xl sm:text-8xl font-bold rounded-2xl  animate-pulse text-center'>Thank You!</div>
				</div>
			)}

			{items.length > 0 ? (
				<>
					<div className='flex flex-wrap justify-center gap-6'>
						{items.map(({ product, quantity }) => (
							<div key={product.itemID} className='bg-white p-4 rounded-xl flex flex-col items-center text-center w-64'>
								<img src={product.imageUrl || ''} alt={product.itemName || 'Product'} className='w-32 h-32 object-cover rounded-full mb-2' />
								<h4 className='text-lg font-bold'>{product.itemName}</h4>
								<p className='text-yellow-600 font-bold mb-1'>€{formatPrice(product.itemPrice * quantity)}</p>

								<div className='flex items-center gap-2 mb-2'>
									<button onClick={() => removeOne(product.itemID)} className='bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-full'>
										-
									</button>
									<span className='font-semibold'>{quantity}</span>
									<button onClick={() => addOne(product)} className='bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-full'>
										+
									</button>
								</div>

								<button onClick={() => removeAll(product.itemID)} className='text-sm text-white bg-pink-500 hover:bg-red-600 px-3 py-1 rounded-full'>
									Remove All
								</button>
							</div>
						))}
					</div>

					<div className='mt-10 text-center'>
						<p className='text-xl font-semibold mb-4'>
							Total: <span className='text-pink-600 font-bold'>€{formatPrice(total)}</span>
						</p>
						<button onClick={clearCart} className='bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full mr-4'>
							Clear Cart
						</button>
						<button onClick={handleSendOrder} className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full'>
							Send Order
						</button>
					</div>
				</>
			) : (
				<p className='text-center text-gray-500 mt-20'>Your cart is empty</p>
			)}
		</div>
	);
}
