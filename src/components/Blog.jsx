import { useState } from 'react';
import { useBlogsMutation } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  const { updateBlog, removeBlog } = useBlogsMutation();
  const [detailVisible, setDetailVisible] = useState(false);

  const toggleDetail = () => {
    setDetailVisible(!detailVisible);
  };

  const handleLikes = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog);
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
