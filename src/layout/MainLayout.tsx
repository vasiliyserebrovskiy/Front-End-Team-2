import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';

export const MainLayout = () => {
	return (
		<>
			<header>
				<NavBar />
			</header>
			{/* Добавляем отступ под фиксированный NavBar */}
			<main className='pt-24 px-4'>
				<Outlet />
			</main>
			<footer className='text-center text-sm text-gray-500 py-6 mt-16'>© 2025 AIT · Cohort 60–61 · Team 2</footer>
		</>
	);
};
