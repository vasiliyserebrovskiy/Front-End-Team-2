import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';
import type { Product } from './types';

export const ProductsList = () => {
	const [products, setProducts] = useState<Product[]>([]);
	useEffect(() => {
		fetchProducts();
	}, []);

	async function fetchProducts() {
		const res = await fetch('https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/items');
		const productsRes = await res.json();
		setProducts(productsRes);
	}

	return (
		<div className={styles.productsWrapper}>
			<h2 className={styles.title}>Products list</h2>
			<div className={styles.cardsGrid}>
				{products.map(p => (
					<div className={styles.productCard} key={'product' + p.id}>
						<img src={p.images[0]} alt='product' className={styles.productImage} />
						<h3 className={styles.productTitle}>{p.title}</h3>
						<span className={styles.price}> {Math.round(p.price)} $</span>
						<Link to={`/products/${p.id}`} className={styles.button}>
							To product
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
