import FrontLayout from '@/layouts/FrontLayout';

import Login from '@/Pages/Login';
import Register from '@/Pages/Register';
import Home from '@/Pages/Home';

const publicRoutes = [
	{ path: '/login', element: Login, layout: FrontLayout },
	{ path: '/register', element: Register, layout: FrontLayout },
	{ path: '/', element: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
