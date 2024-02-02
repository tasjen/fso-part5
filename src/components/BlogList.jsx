import Blog from './Blog';
import blogService from '../services/blogs';
import { useQuery } from '@tanstack/react-query';

const BlogList = () => {
  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: true,
  });

  if (blogsQuery.isLoading) {
    return <div>loading data...</div>;
  } else if (blogsQuery.isError) {
    return <pre>{JSON.stringify(blogsQuery.error)}</pre>;
  }

  const blogs = blogsQuery.data;

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
