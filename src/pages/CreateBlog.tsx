import { Form, Input, Button, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../api/fakeApi';

export default function CreateBlog() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await createBlog(values.title, values.content, values.author);
      message.success('Blog created!');
      navigate('/'); 
    } catch (error) {
      console.error('Create blog error:', error);
      message.error('Failed to create blog');
    }
  };

  return (
    <Card title="Create New Blog Post" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ title: '', content: '', author: '' }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter blog title" />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <Input.TextArea rows={5} placeholder="Write your blog content..." />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Publish Blog
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
