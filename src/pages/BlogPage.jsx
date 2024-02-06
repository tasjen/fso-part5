import { useParams } from 'react-router-dom';
import { useBlogsMutation, useBlogsQuery, useInput } from '../hooks';
import { v1 } from 'uuid';

const BlogPage = () => {
  const { blogId } = useParams();
  const { blogs } = useBlogsQuery();
  const commentInput = useInput();
  const { updateBlog, commentBlog } = useBlogsMutation();

  const blog = blogs.find((e) => e.id === blogId);

  const handleLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    commentBlog({ blogId, comment: commentInput.value });
    commentInput.onReset();
  };
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes<button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={v1()}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input {...commentInput} />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default BlogPage;
