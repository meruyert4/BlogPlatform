import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../api/fakeApi';
import { Blog } from '../types/blog';
import { Card } from 'antd';

//just shows the details of the blog in new page
export default function BlogDetails() {
  const { id } = useParams<{ id: string }>(); 
  const [blog, setBlog] = useState<Blog | undefined>(undefined);

  useEffect(() => {
    const fetchBlog = async () => {
      const fetchedBlog = await getBlogById(Number(id));
      setBlog(fetchedBlog);
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card title={blog.title}>
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>Date:</strong> {blog.date}</p>
        <p>{blog.content}</p>
      </Card>
    </div>
  );
}
