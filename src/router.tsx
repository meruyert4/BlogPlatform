import { createBrowserRouter } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import BlogEdit from './pages/BlogEdit';
import FakeApiPage from './pages/FakeApiPage';

export const router = createBrowserRouter([
  { path: '/', element: <BlogList /> },
  { path: '/blog/:id', element: <BlogDetail /> },
  { path: '/edit/:id', element: <BlogEdit /> },
  { path: '/fake-api', element: <FakeApiPage /> },
]);
