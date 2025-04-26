import { useEffect, useState } from 'react';
import { getBlogs } from '../api/fakeApi';
import { Blog } from '../types/blog';
import { List, Button, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await getBlogs();
      setBlogs(fetchedBlogs);
    };
    fetchBlogs();
  }, []);

  // Calculate which blogs to show on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + pageSize);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Blog Posts</h2>

      <div style={{ marginBottom: '20px' }}>
        <Button type="primary">
          <Link to="/create">Create New Blog</Link>
        </Button>
      </div>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={paginatedBlogs}
        renderItem={(blog) => (
          <List.Item
            key={blog.id}
            actions={[
              <Button type="primary">
                <Link to={`/blog/${blog.id}`}>View</Link>
              </Button>,
              <Button type="default">
                <Link to={`/edit/${blog.id}`}>Edit</Link>
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/blog/${blog.id}`}>{blog.title}</Link>}
              description={`by ${blog.author} on ${blog.date}`}
            />
            <p>{blog.content.substring(0, 100)}...</p>
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={blogs.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ textAlign: 'center', marginTop: 20 }}
      />
    </div>
  );
}
