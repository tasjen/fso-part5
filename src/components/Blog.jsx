import { useState } from 'react';

const Blog = ({ blog }) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const toggleDetail = () => {
    setDetailVisible(!detailVisible);
  };

  return (
    <li className='blog'>
      <p>
        {blog.title} {blog.author}
        <button onClick={toggleDetail}>
          {detailVisible ? 'hide' : 'view'}
        </button>
      </p>
      <div style={{ display: detailVisible ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>likes {blog.likes}<button>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </li>
  );
};

export default Blog;
