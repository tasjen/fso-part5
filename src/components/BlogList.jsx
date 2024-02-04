import Blog from './Blog';
import { useQueryClient } from '@tanstack/react-query';

const BlogList = () => {
  const queryClient = useQueryClient();
  const blogs = queryClient.getQueryData(['blogs']) || [];

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
