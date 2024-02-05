// import { useState } from 'react';
// import { useBlogsMutation, useUserQuery } from '../hooks';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  // const { user } = useUserQuery();
  // const { updateBlog, removeBlog } = useBlogsMutation();
  // const [detailVisible, setDetailVisible] = useState(false);

  // const toggleDetail = () => {
  //   setDetailVisible(!detailVisible);
  // };

  // const handleLike = () => {
  //   updateBlog({ ...blog, likes: blog.likes + 1 });
  // };

  // const handleRemove = () => {
  //   if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     removeBlog(blog);
  //   }
  // };

  return (
    <li className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
        {/* <button onClick={toggleDetail} className="view-button">
          {detailVisible ? 'hide' : 'view'}
        </button> */}
      </Link>
      {/* <div style={{ display: detailVisible ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>
          <span className="like-count">likes {blog.likes}</span>
          <button className="like-button" onClick={handleLike}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {user?.name === blog.user.name && (
          <button className="remove-button" onClick={handleRemove}>
            remove
          </button>
        )}
      </div> */}
    </li>
  );
};

export default Blog;
