import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserContext from '../context/UserContext';
import blogService from '../services/blogs';
import NotificationContext from '../context/NotificationContext';

const Blog = ({ blog }) => {
  const { user } = useContext(UserContext);
  const [detailVisible, setDetailVisible] = useState(false);
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext);

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (blogObject) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((e) => (e.id !== blogObject.id ? e : blogObject))
      );
    },
    onError: (err) => showNotification(err),
  });

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((e) => e.id !== blog.id)
      );
    },
    onError: (err) => showNotification(err),
  });

  const toggleDetail = () => {
    setDetailVisible(!detailVisible);
  };

  const handleLikes = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate(blog);
    }
  };

  return (
    <li className="blog">
      <p>
        {blog.title} {blog.author}
        <button onClick={toggleDetail} className="view-button">
          {detailVisible ? 'hide' : 'view'}
        </button>
      </p>
      <div style={{ display: detailVisible ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>
          <span className="like-count">likes {blog.likes}</span>
          <button className="like-button" onClick={handleLikes}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {user.name === blog.user.name && (
          <button className="remove-button" onClick={handleRemove}>
            remove
          </button>
        )}
      </div>
    </li>
  );
};

export default Blog;
