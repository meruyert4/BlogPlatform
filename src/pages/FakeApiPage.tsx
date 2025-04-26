import { useEffect, useState } from 'react';
import { List, Pagination, Spin, Card } from 'antd';

interface Post {
  id: number;
  title: string;
  body: string;
}

const FakeApiPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    setLoading(true);  // Set loading to true to show the spinner
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched posts:', data);  // Log the fetched data for debugging
      setPosts(data);  // Set the posts state with the fetched data
    } catch (error) {
      console.error('Error fetching posts:', error);  // Handle any errors
    } finally {
      setLoading(false);  // Set loading to false after the request is complete
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Paginate the posts based on the current page
  const paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: 24 }}>
      <h1>Fake API Posts</h1>

      {/* Show loading spinner if the data is being fetched */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          {/* Show a message if no posts are found */}
          {posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <>
              {/* List the paginated posts */}
              <List
                itemLayout="vertical"
                dataSource={paginatedPosts}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <Card title={item.title}>
                      <p>{item.body}</p>
                    </Card>
                  </List.Item>
                )}
              />

              {/* Pagination component */}
              <Pagination
                current={page}
                pageSize={pageSize}
                total={posts.length}
                onChange={setPage}
                style={{ marginTop: 16, textAlign: 'center' }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FakeApiPage;
