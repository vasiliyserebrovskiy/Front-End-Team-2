import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useCart } from '../../context/CartContext';
import Logo from '../Logo/Logo';

export default function NavBar() {
	const { authUser, setIsAuthorized, isAuthorized } = useAuthUser();
	const navigate = useNavigate();
	const { cart } = useCart();

	const handleLogout = () => {
		setIsAuthorized(false);
		navigate('/');
	};

	return (
		<section className='fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md rounded-b-3xl border-b border-pink-200'>
			<nav className='flex flex-wrap gap-6 px-6 py-4 justify-center items-center font-medium text-gray-800'>
				<Logo />
				<NavLink to='/' className='hover:text-pink-600 transition'>
					Home
				</NavLink>
				<NavLink to='/about' className='hover:text-pink-600 transition'>
					About
				</NavLink>
				<NavLink to='/categories' className='hover:text-pink-600 transition'>
					Categories
				</NavLink>
				<NavLink to='/products' className='hover:text-pink-600 transition'>
					Products
				</NavLink>
				<NavLink to='/cart' className='relative hover:text-pink-600 transition'>
					Cart
					<span id='cart-icon' className={`absolute -top-2 -right-3 px-2 rounded-full text-xs transition-opacity duration-300 ${cart.length > 0 ? 'bg-pink-500 text-white opacity-100' : 'opacity-0 pointer-events-none'}`}>
						{cart.length}
					</span>
				</NavLink>
				{isAuthorized && (
					<NavLink to='/users' className='hover:text-pink-600 transition'>
						Users
					</NavLink>
				)}
				{!isAuthorized && (
					<NavLink to='/login' className='hover:text-pink-600 transition'>
						Login
					</NavLink>
				)}
				{isAuthorized && (
					<NavLink to='/profile' className='hover:text-pink-600 transition'>
						Profile
					</NavLink>
				)}
				{authUser?.userEmail}
				{isAuthorized && (
					<button type='button' onClick={handleLogout} className='border border-pink-500 hover:bg-pink-500 hover:text-white transition px-4 py-1 rounded-full'>
						Logout
					</button>
				)}
			</nav>
		</section>
	);
}
