import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { useBlogsQuery } from '../hooks';

const Blog = ({ blog }) => {
  const { user } = useContext(UserContext);
  const [detailVisible, setDetailVisible] = useState(false);

  const { updateBlog, removeBlog } = useBlogsQuery();

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
