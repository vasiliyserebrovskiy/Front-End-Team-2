import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { formatPrice } from '../../utils/priceUtils';
import type { Product } from './types';
import styles from './Products.module.css';

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	useEffect(() => {
		fetchProducts();
	}, []);

	async function fetchProducts() {
		const res = await fetch('https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/items');
		const productsRes: Product[] = await res.json();

		const map = new Map(productsRes.filter(p => p.imageUrl && !p.imageUrl.endsWith('/')).map(p => [p.itemName + p.imageUrl, p]));

		setProducts([...map.values()]);
	}

	return (
		<div className=' bg-white min-h-screen p-6 '>
			<h2 className='text-4xl font-bold text-center text-pink-500 mb-16 mt-6'>Product List</h2>

			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 lg:grid-cols-5'>
				{products.map(p => (
					<div
						key={'product' + p.itemID}
						className=' bg-white rounded-3xl shadow-2xl flex flex-col items-center text-center transition transform hover:scale-130 hover:shadow-2xl
before:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-[26px]
before:bg-gradient-to-r before:from-pink-400 before:to-transparent
before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300 before:rounded-t-3xl rounded-tl-[220px] rounded-tr-[220px] rounded-b-[40px] max-w-[230px] w-[90%] sm:w-[290px] md:w-[290px] pt-16 pb-3 gap-x-0 mb-8 hover:-translate-y-10 '
					>
						<div className='-mt-16  w-58 h-58  border-0 border-white shadow-2xl transition duration-300 rounded-full overflow-hidden'>
							<img src={p.imageUrl} alt={p.itemName} className='w-full h-full object-cover' />
						</div>
						<h3 className='text-2xl font-semibold text-gray-800 mb-0 p-1 pt-3'>{p.itemName}</h3>
						<span className='text-yellow-500 font-bold mb-2 text-4xl '>€{formatPrice(p.itemPrice)}</span>
						<Link to={`/products/${p.itemID}`} className='bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold mb-2'>
							Buy now
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
