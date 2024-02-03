import { useContext } from 'react';
import { useBlogsQuery } from '../hooks';
import NotificationContext from '../context/NotificationContext';
import Blog from './Blog';

const BlogList = () => {
  const { showNotification } = useContext(NotificationContext);
  const { blogs, isLoading, isError, error } = useBlogsQuery();

  if (isLoading) {
    return <div>loading data...</div>;
  } else if (isError) {
    showNotification(error);
    return null;
  }

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
