import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useCart } from '../../context/CartContext';

export default function NavBar() {
	const { authUser, setIsAuthorized, isAuthorized } = useAuthUser();
	const navigate = useNavigate();
	const { cart } = useCart();

	const handleLogout = () => {
		setIsAuthorized(false);
		navigate('/');
	};
	return (
		<section className='flex gap-3 bg-gray-400'>
			<nav className='flex p-3 gap-6 justify-center items-center'>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/about'>About</NavLink>
				<NavLink to='/categories'>Categories</NavLink>
				<NavLink to='/products'>Products</NavLink>
				<NavLink to='/carts'>Cart</NavLink>
				<NavLink to='/cart'>Cart {cart.length > 0 && <span className='absolute bg-red-500 text-white px-2 rounded-full text-xs'>{cart.length}</span>}</NavLink>

				{isAuthorized ? <NavLink to='/users'>Users</NavLink> : null}
				{isAuthorized ? null : <NavLink to='/login'>Login</NavLink>}
				{isAuthorized ? <NavLink to='/profile'>Profile</NavLink> : null}
				{authUser?.userEmail}

				{isAuthorized ? (
					<button type='button' onClick={handleLogout} className='border-1 w-[70px] rounded-[20px]'>
						Logout
					</button>
				) : null}
			</nav>
		</section>
	);
}
