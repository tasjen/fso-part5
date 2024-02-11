import Blog from './Blog';
import { useBlogsQuery } from '../hooks';

const BlogList = () => {
  const { blogs, isLoading, isError, error } = useBlogsQuery();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul className="">
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </ul>
  );
};

export default BlogList;
