import { useState } from 'react'

const Blog = ({ blog, removeBlog, updateBlog }) => {
  const [detailVisible, setDetailVisible] = useState(false)

  const toggleDetail = () => {
    setDetailVisible(!detailVisible)
  }

  const handleLikes = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  return (
    <li className="blog">
      <p>
        {blog.title} {blog.author}
        <button onClick={toggleDetail} className='view-button'>
          {detailVisible ? 'hide' : 'view'}
        </button>
      </p>
      <div style={{ display: detailVisible ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>
          <span className='like-count'>likes {blog.likes}</span>
          <button className='like-button' onClick={handleLikes}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </li>
  )
}

export default Blog
