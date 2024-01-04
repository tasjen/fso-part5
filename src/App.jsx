import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ text: '', error: false });

  const blogFormRef = useRef();

  const logInForm = () => {
    return (
      <form onSubmit={handleLogIn}>
        <h1>log in to application</h1>
        <Notification notification={notification} />
        <div>
          <label htmlFor={'username'}>username</label>
          <input
            id={'username'}
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor={'password'}>password</label>
          <input
            id={'password'}
            type={'password'}
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <button type={'submit'}>login</button>
      </form>
    );
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      setNotification({ text: err.message, error: true });
    }
    setTimeout(() => {
      setNotification({ text: '', error: false });
    }, 5000);
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs([...blogs, newBlog]);
      setNotification({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        error: false,
      });
      blogFormRef.current.toggleVisible();
    } catch (err) {
      setNotification({ text: err.message, error: true });
    }
    setTimeout(() => {
      setNotification({ text: '', error: false });
    }, 5000);
  };

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject);
      setBlogs(blogs.map((e) => (e.id !== updatedBlog.id ? e : updatedBlog)));
    } catch (err) {
      setNotification({ text: err.message, error: true });
      setTimeout(() => {
        setNotification({ text: '', error: false });
      }, 5000);
    }
  };

  const removeBlog = async (blogObject) => {
    try {
      if (confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        await blogService.remove(blogObject);
        setBlogs(blogs.filter((e) => e.id !== blogObject.id));
      }
    } catch (err) {
      setNotification({ text: err.message, error: true });
      setTimeout(() => {
        setNotification({ text: '', error: false });
      }, 5000);
    }
  };

  return (
    <>
      {user === null ? (
        logInForm()
      ) : (
        <>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <div>
            {user.name} logged in
            <button onClick={handleLogOut}>logout</button>
          </div>
          <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <ul>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                />
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default App;
