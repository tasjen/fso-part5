import { useParams } from 'react-router-dom';
import { useBlogsMutation, useBlogsQuery } from '../hooks';

const BlogPage = () => {
  const { blogId } = useParams();
  const { blogs } = useBlogsQuery();
  const { updateBlog } = useBlogsMutation();

  const blog = blogs.find((e) => e.id === blogId);

  const handleLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes<button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
    </div>
  );
};

export default BlogPage;
