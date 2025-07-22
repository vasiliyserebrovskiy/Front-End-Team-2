import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/priceUtils';
import type { Product, RestaurantDetails } from './types';
import { useCart } from '../../context/CartContext';
import { animateFlyToCart } from './animateToCart';

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [containerWidthClass, setContainerWidthClass] = useState('w-[70%]');
	const { type } = useParams(); // из URL
	const decodedType = decodeURIComponent(type || '');
	const { addOne } = useCart();

	useEffect(() => {
		fetchProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	async function fetchProducts() {
		try {
			if (!decodedType) {
				const res = await fetch('https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/items');
				const data: Product[] = await res.json();
				const cleaned = data.filter(p => p.imageUrl && !p.imageUrl.endsWith('/'));
				const map = new Map(cleaned.map(p => [p.itemName + p.imageUrl, p]));
				const final = [...map.values()];
				setContainerWidthClass(final.length % 6 === 0 ? 'w-[90%]' : 'w-[70%]');
				setProducts(final);
				return;
			}

			const restaurantRes = await fetch(`https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant?category=${encodeURIComponent(decodedType)}`);
			const restaurants: RestaurantDetails[] = await restaurantRes.json();
			const validIDs = new Set(restaurants.map(r => r.restaurantID));

			const res = await fetch('https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/items');
			const all: Product[] = await res.json();

			const cleaned = all.filter(p => p.imageUrl && !p.imageUrl.endsWith('/'));
			const map = new Map(cleaned.map(p => [p.itemName + p.imageUrl, p]));
			const filtered = [...map.values()].filter(p => validIDs.has(p.restaurantID));

			setContainerWidthClass(filtered.length % 6 === 0 ? 'w-[90%]' : 'w-[70%]');
			setProducts(filtered);
		} catch (err) {
			console.error('Fetch error:', err);
			setProducts([]);
		}
	}

	return (
		<div className='bg-white min-h-screen p-1'>
			<h2 className='text-4xl font-bold text-center text-pink-500 mb-16 mt-1'>{decodedType ? decodedType : 'Product List'}</h2>
			<div className='w-full flex justify-center'>
				<div className={`max-w-screen-xl flex flex-wrap justify-evenly gap-8 px-4 ${containerWidthClass}`}>
					{products.map(p => (
						<div
							key={'product' + p.itemID}
							className="relative w-[230px] bg-white rounded-3xl flex flex-col items-center text-center transition transform hover:scale-125 hover:shadow-2xl
								before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[26px]
								before:bg-gradient-to-r before:from-pink-400 before:to-transparent
								before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300
								before:rounded-t-3xl rounded-tl-[220px] rounded-tr-[220px] rounded-b-[40px]
								pt-16 pb-3 gap-x-0 mb-8 hover:-translate-y-10 shadow-xl product-card"
						>
							<Link to={`/product/${p.itemID}`}>
								<div className='-mt-16 w-58 h-58 border-0 border-white shadow-xl transition duration-300 rounded-full overflow-hidden'>
									<img src={p.imageUrl} alt={p.itemName} className='w-full h-full object-cover product-image' data-id={p.itemID} />
								</div>
								<h3 className='text-2xl font-semibold text-gray-800 mb-0 p-1 pt-3'>{p.itemName}</h3>
							</Link>
							<span className='text-yellow-500 font-bold mb-2 text-4xl'>€{formatPrice(p.itemPrice)}</span>
							<Link
								to='#'
								className='bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-1 text-sm mb-1'
								onClick={e => {
									e.preventDefault();
									addOne(p);

									const imgEl = e.currentTarget.closest('.product-card')?.querySelector('.product-image');
									const cartEl = document.querySelector('#cart-icon');

									if (imgEl instanceof HTMLImageElement && cartEl instanceof HTMLElement && imgEl.complete) {
										animateFlyToCart(imgEl, cartEl);
									}
								}}
							>
								Add to <span className='leading-none brightness-200 contrast-200 text-[20px]'>🛒</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
