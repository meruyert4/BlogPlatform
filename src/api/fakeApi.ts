import { Blog } from '../types/blog';
import { delay } from '../utils/delay';

let blogs: Blog[] = JSON.parse(localStorage.getItem('blogs') || '[]'); 
let nextId = blogs.length > 0 ? Math.max(...blogs.map(blog => Number(blog.id))) + 1 : 1; 

const saveBlogsToLocalStorage = () => {
  localStorage.setItem('blogs', JSON.stringify(blogs)); // saving to localstorage
};

export const getBlogs = async (): Promise<Blog[]> => {
  await delay(500);
  return blogs;
};

export const getBlogById = async (id: number): Promise<Blog | undefined> => {
  await delay(500);
  return blogs.find(blog => Number(blog.id) === id);
};

export const createBlog = async (
  title: string,
  content: string,
  author: string
): Promise<Blog> => {
  await delay(500);
  const date = new Date().toISOString().split('T')[0];
  const newBlog: Blog = {
    id: (nextId++).toString(),
    title,
    content,
    author,
    date,
  };
  blogs.push(newBlog);
  saveBlogsToLocalStorage();
  return newBlog;
};

export const updateBlog = async (
  id: number,
  title: string,
  content: string
): Promise<Blog | undefined> => {
  await delay(500);
  const blog = blogs.find(b => Number(b.id) === id);
  if (blog) {
    blog.title = title;
    blog.content = content;
    saveBlogsToLocalStorage(); 
  }
  return blog;
};

export const deleteBlog = async (id: number): Promise<boolean> => {
  await delay(500);
  const index = blogs.findIndex(b => Number(b.id) === id);
  if (index !== -1) {
    blogs.splice(index, 1);
    saveBlogsToLocalStorage(); 
    return true;
  }
  return false;
};
