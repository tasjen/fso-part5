import { useState } from 'react';
import Togglable from './Togglable';

const BlogForm = ({addBlog}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (event) => {
    event.preventDefault();
    addBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <Togglable buttonLabel={'create new blog'}>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
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
    </Togglable>
  );
};

export default BlogForm;