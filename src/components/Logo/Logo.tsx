import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<Link to='/' className='flex items-center gap-2 font-bold text-pink-600 text-xl'>
			<span className='text-2xl'>🛒</span>
			<span className='hidden sm:inline'>Your Cart</span>
		</Link>
	);
}
