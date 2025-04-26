import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, updateBlog } from '../api/fakeApi';
import { Blog } from '../types/blog';
import { Form, Input, Button, message, Card } from 'antd';

// author and date will not be changed!
export default function EditBlog() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);

  useEffect(() => {
    const fetchBlog = async () => {
      const fetchedBlog = await getBlogById(Number(id));
      setBlog(fetchedBlog);
    };
    fetchBlog();
  }, [id]);

  const onFinish = async (values: any) => {
    try {
      await updateBlog(Number(id), values.title, values.content);
      message.success('Blog updated!');
      navigate('/');
    } catch (error) {
      message.error('Failed to update blog');
    }
  };

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Edit Blog Post" style={{ maxWidth: 600, margin: '0 auto' }}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            title: blog.title,
            content: blog.content,
            author: blog.author,
            date: blog.date,
          }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter blog title" />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea rows={5} placeholder="Update your blog content..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Blog
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
