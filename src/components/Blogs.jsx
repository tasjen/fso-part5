import Blog from './Blog';

const Blogs = ({ blogs, user, handleLogOut }) => {
  return (
    <>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <button onClick={handleLogOut}>logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs