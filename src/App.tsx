import { useRoutes } from 'react-router-dom';
import { routers } from './routes';

export default function App() {
	return useRoutes(routers);
}
