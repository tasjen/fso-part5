import Blog from './Blog';
import { useBlogsQuery } from '../hooks';

const BlogList = () => {
  const { blogs } = useBlogsQuery();

  return (
    <ul id="blog-list">
      {blogs
        ?.sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </ul>
  );
};

export default BlogList;
