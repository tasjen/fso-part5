import Blog from './Blog';
import blogService from '../services/blogs';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

const BlogList = () => {
  const { showNotification } = useContext(NotificationContext);
  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: true,
  });

  if (blogsQuery.isLoading) {
    return <div>loading data...</div>;
  } else if (blogsQuery.isError) {
    showNotification(blogsQuery.error);
    return null;
  }

  const blogs = blogsQuery.data;

  return (
    <ul>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </ul>
  );
};

export default BlogList;
