import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  const handleNewBlog = () => {
    blogService.create({title, author, url})
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <>
      {user === null ? (
        <form onSubmit={handleLogIn}>
          <h1>log in to application</h1>
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
      ) : (
        <>
          <h2>blogs</h2>
          <span>{user.name} logged in</span>
          <button onClick={handleLogOut}>logout</button>
          <h2>create new</h2>
          <form onSubmit={handleNewBlog}>
            <div>
              <label htmlFor={'title'}>title</label>
              <input
                id={'title'}
                value={title}
                onChange={({ target }) => {
                  setTitle(target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor={'author'}>author</label>
              <input
                id={'author'}
                value={author}
                onChange={({ target }) => {
                  setAuthor(target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor={'url'}>url</label>
              <input
                id={'url'}
                value={url}
                onChange={({ target }) => {
                  setUrl(target.value);
                }}
              />
            </div>
            <button type={'submit'}>create</button>
          </form>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </>
  );
};

export default App;
