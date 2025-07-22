
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/priceUtils';


interface Shops {
	restaurantID: number;
	restaurantName: string;
	address: string;
	type: string;
	parkingLot: boolean;
}

interface Item {
	itemID: number;
	itemName: string;
	itemDescription: string;
	itemPrice: number;
	restaurantName: string;
	restaurantID: number;
	imageUrl: string;
}

interface Category {
	type: string;
	imageUrl: string;
}

export default function Home() {
	const [shops, setShops] = useState<Shops[]>([]);
	const [items, setItems] = useState<Item[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const { addOne } = useCart();

	useEffect(() => {
		async function fetchData() {
			try {
				const shopRes = await fetch('https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant');
				const shopsData: Shops[] = await shopRes.json();

				const itemsRes = await fetch('https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/items');
				const itemsData: Item[] = await itemsRes.json();

				setShops(getRandomItems(shopsData, 3));
				setItems(getRandomItems(itemsData, 3));

				const categories = generateCategories(shopsData, itemsData);
				setCategories(categories);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	function getRandomItems(array: any[], count: number) {
		const shuffled = [...array].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, count);
	}

	function generateCategories(shops: Shops[], items: Item[]): Category[] {
		const categoryMap = new Map<string, number[]>();

		shops.forEach(shop => {
			const key = shop.type.trim();
			if (!categoryMap.has(key)) {
				categoryMap.set(key, []);
			}
			categoryMap.get(key)?.push(shop.restaurantID);
		});

		const result: Category[] = [];

		categoryMap.forEach((restaurantIDs, type) => {
			const filteredItems = items.filter(item => restaurantIDs.includes(item.restaurantID) && item.imageUrl && !item.imageUrl.endsWith('/'));

			let imageUrl = '/fallback.jpg'; // 👈 заглушка по умолчанию
			if (filteredItems.length > 0) {
				const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];
				imageUrl = randomItem.imageUrl;
			}

			result.push({ type, imageUrl });
		});

		return result;
	}

	if (loading) return <div className='text-center py-20'>Loading...</div>;

	return (
		<div className='max-w-7xl mx-auto px-4 py-1 w-[60%]'>
			<h1 className='text-4xl font-bold text-center mb-12 text-pink-600'></h1>

			{/* Featured Categories */}
			<section className='mb-20'>
				{/* <h2 className='text-2xl font-bold mb-16'>🎯 Featured Categories</h2> */}
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-22'>
					{categories.map((cat, idx) => (
						<Link key={idx} to={`/products/${encodeURIComponent(cat.type)}`} className='flex flex-col items-center text-center hover:scale-105 transition'>
							<div className='w-40 h-40 rounded-full overflow-hidden border-0 border-pink-500 mb-2 shadow-md'>
								<img src={cat.imageUrl} alt={cat.type} className='w-full h-full object-cover' />
							</div>
							<span className='text-sm font-medium text-gray-700'>{cat.type}</span>
						</Link>
					))}
				</div>
			</section>

			{/* Featured Products */}
			<section className='mb-10 mt-16'>
				<h2 className='text-2xl font-bold mb-6'>🍽️ Customer Favorites</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{items.map(item => (
						<div key={item.itemID} className='bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col'>
							<div className='h-48 bg-gray-100 overflow-hidden rounded-t-2xl'>
								<img src={item.imageUrl} alt={item.itemName} className='w-full h-full object-cover' />
							</div>
							<div className='p-4 flex flex-col flex-1 justify-between'>
								<div>
									<h3 className='text-xl font-semibold text-gray-800 mb-1'>{item.itemName}</h3>
									<p className='text-gray-600 text-sm mb-3 line-clamp-3'>{item.itemDescription}</p>
									<p className='text-lg font-bold text-pink-600'>€{formatPrice(item.itemPrice)}</p>
								</div>
								<button onClick={() => addOne(item)} className='mt-4 bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 transition'>
									Add to <span className='leading-none brightness-200 contrast-200 text-[20px]'>🛒</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Featured Stores */}
			<section className='mb-20'>
				<h2 className='text-2xl font-bold mb-6 mt-16'>🏪 Popular Stores</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{shops.map(s => (
						<div key={s.restaurantID} className='bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition'>
							<div className='p-6'>
								<h3 className='text-xl font-semibold text-gray-800 mb-2'>{s.restaurantName}</h3>
								<p className='text-gray-600 mb-1'>
									<span className='font-medium'>Address:</span> {s.address}
								</p>
								<p className='text-gray-600 mb-1'>
									<span className='font-medium'>Cuisine:</span> {s.type}
								</p>
								<p className='text-gray-600 mb-4'>
									<span className='font-medium'>Parking:</span>
									<span className={`ml-1 px-2 py-1 rounded-full text-xs ${s.parkingLot ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{s.parkingLot ? 'Available' : 'Not available'}</span>
								</p>
								<Link to={`/shops/${s.restaurantID}/products`} className='inline-block bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 transition'>
									View Products
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
