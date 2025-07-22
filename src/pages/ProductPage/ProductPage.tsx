import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/priceUtils';
import type { RestaurantDetails } from '../Products/types';
import { useCart } from '../../context/CartContext';
import { animateFlyToCart } from '../Products/animateToCart';

export interface Product {
	itemID: number;
	itemName: string;
	itemDescription: string;
	itemPrice: number;
	restaurantName: string;
	restaurantID: number;
	imageUrl: string;
}

type EngFoodTemplate = (p: Product) => string;

const gourmetTemplates: EngFoodTemplate[] = [
	p => `🍽️ Experience the delight of "${p.itemName}", crafted with love and care at our store "${p.restaurantName.replace(/restaurant/i, 'Gourmet Shop')}'. ${p.itemDescription} Now available for just ${formatPrice(p.itemPrice)}€. A perfect meal solution for any day. Fast delivery & pickup — always fresh.`,
	p => `✨ Discover the exquisite taste of "${p.itemName}" at "${p.restaurantName.replace(/restaurant/i, 'Food Market')}'. ${p.itemDescription} Premium quality at just ${formatPrice(p.itemPrice)}€. Whether you're hosting dinner or treating yourself, it's your gourmet choice. Eco-friendly packaging included.`,
	p => `🥗 "${p.itemName}" is a must-try from our hand-picked menu at "${p.restaurantName.replace(/restaurant/i, 'Grocery Kitchen')}'. ${p.itemDescription} Yours today for only ${formatPrice(p.itemPrice)}€. Ideal for cozy evenings or quick lunches. Delivery available 7 days a week.`,
	p => `🔥 Hot & ready! "${p.itemName}" comes straight from our kitchen at "${p.restaurantName.replace(/restaurant/i, 'Gourmet Point')}'. ${p.itemDescription} Order now for ${formatPrice(p.itemPrice)}€. Free cutlery and sauces included. Pickup or doorstep delivery — you choose!`,
	p => `🥡 Let us spoil you with "${p.itemName}", freshly packed from "${p.restaurantName.replace(/restaurant/i, 'Urban Market')}'. ${p.itemDescription} Enjoy it at just ${formatPrice(p.itemPrice)}€. No weekend? No problem — we deliver daily. Taste the difference!`,
];

function getEngGourmetDescription(p: Product): string {
	const index = p.itemID % gourmetTemplates.length;
	return gourmetTemplates[index](p);
}

export default function ProductPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [products, setProducts] = useState<Product[]>([]);
	const [product, setProduct] = useState<Product | null>(null);
	const [restaurantType, setRestaurantType] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
  const { addOne } = useCart();

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch('https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/items/');
				if (!res.ok) throw new Error('Failed to fetch data');
				const data: Product[] = await res.json();
				setProducts(data);
				const found = data.find(p => p.itemID === Number(id));
				if (!found) throw new Error('Product not found');
				setProduct(found);

				const rRes = await fetch(`https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/${found.restaurantID}`);
				if (rRes.ok) {
					const rData: RestaurantDetails = await rRes.json();
					setRestaurantType(rData.type);
				}
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [id]);

	const goToPrevious = () => {
		if (!product) return;
		const currentIndex = products.findIndex(p => p.itemID === product.itemID);
		if (currentIndex > 0) {
			navigate(`/product/${products[currentIndex - 1].itemID}`);
		}
	};

	const goToNext = () => {
		if (!product) return;
		const currentIndex = products.findIndex(p => p.itemID === product.itemID);
		if (currentIndex >= 0 && currentIndex < products.length - 1) {
			navigate(`/product/${products[currentIndex + 1].itemID}`);
		}
	};

	if (loading) return <div className='p-8 text-center text-xl'>Loading...</div>;
	if (error) return <div className='p-8 text-red-500 text-center text-xl'>Error: {error}</div>;
	if (!product) return <div className='p-8 text-center text-xl'>Product not found</div>;

	return (
		<div className='flex justify-center items-start min-h-screen pt-28 pb-20 px-2'>
			<div className='relative w-[90%] max-w-[1500px] flex items-center justify-between'>
				<button onClick={goToPrevious} className='text-5xl text-gray-400 hover:text-yellow-500 px-0 pr-2 cursor-pointer opacity-30 hover:opacity-100 hover:scale-200 transition transform'>
					&#x276E;
				</button>

				<div className='flex flex-col md:flex-row bg-white w-[90%] shadow-xl rounded-[60px] md:rounded-[260px_60px_60px_260px] sm:rounded-[60px] overflow-visible px-6 py-8 items-center gap-8 relative'>
					<div className='relative w-[260px] h-[260px] min-w-[260px] rounded-full overflow-hidden shadow-2xl z-10 flex items-center justify-center my-auto scale-125 border-0 border-x-white border-y-white'>
						<img src={product.imageUrl} alt={product.itemName} className='product-image-big w-full h-full object-cover max-w-md rounded-2xl shadow-lg mx-auto' />
						<div className='absolute top-17 left-0 bg-green-500 text-white text-xs px-3 py-1 rounded-full'>&nbsp;&nbsp;№{product.itemID}</div>
					</div>

					<div className='flex flex-col justify-between flex-grow z-0 md:ml-16 text-center md:text-left mt-6 md:mt-0 h-full'>
						<div>
							<h2 className='text-5xl font-bold text-gray-800 mb-3'>{product.itemName}</h2>
							{restaurantType && (
								<p className='text-sm text-pink-600 font-semibold mb-3'>
									Category:{' '}
									<Link to={`/products/${restaurantType}`} className='inline-block bg-pink-100 text-pink-700 px-2 py-1 rounded-full cursor-pointer no-underline transform hover:scale-110 hover:text-pink-800 transition-transform duration-300 ease-in-out'>
										{restaurantType}
									</Link>
								</p>
							)}
							<p className='text-slate-700 text-base leading-snug mb-4'>{getEngGourmetDescription(product)}</p>
						</div>
						<div className='flex md:flex-row flex-col md:justify-start justify-center items-center gap-3 mt-6'>
							<span className='text-yellow-500 font-extrabold text-4xl'>€{formatPrice(product.itemPrice)}</span>
							{/* to={`/card/${product.itemID}`} 
              onClick={() => addToCart(product)}
              */}
							<Link
								to='#'
								className='bg-pink-500 hover:bg-pink-600 hover:scale-108 text-white px-4 py-2 ml-1 rounded-full font-semibold transition transform hover:shadow-2xs'
								onClick={e => {
									e.preventDefault();
									addOne(product);

									const imgEl = document.querySelector('.product-image-big');
									const cartEl = document.querySelector('#cart-icon');

									if (imgEl instanceof HTMLImageElement && cartEl instanceof HTMLElement && imgEl.complete) {
										animateFlyToCart(imgEl, cartEl);
									}
								}}
							>
								Add to <span className='leading-none brightness-200 contrast-200 text-[20px]'>🛒</span>
							</Link>
						</div>
					</div>
				</div>

				<button onClick={goToNext} className='text-5xl text-gray-400 hover:text-yellow-500 pl-2 px-0 cursor-pointer opacity-30 hover:opacity-100 hover:scale-200 transition transform'>
					&#x276F;
				</button>
			</div>
		</div>
	);
}
