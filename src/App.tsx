import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/BlogList';
import BlogDetails from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/BlogEdit';
import Header from './components/Header'; 
import FakeApiPage from './pages/FakeApiPage';

function App() {
  return (
    <Router>
      <Header />

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/fake-api" element={<FakeApiPage />} /> 
          <Route
            path="*"
            element={<h1>404 - Page Not Found</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
