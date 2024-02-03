import { useContext } from 'react';
import { VisibleContext } from './Togglable';
import { useBlogsMutation, useInput } from '../hooks';

const BlogForm = () => {
  const title = useInput('text');
  const author = useInput('text');
  const url = useInput('text');
  const { toggleVisible } = useContext(VisibleContext);
  const { addBlog } = useBlogsMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });
    await toggleVisible();
    resetAllForms();
  };

  const resetAllForms = () => {
    title.onReset();
    author.onReset();
    url.onReset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input id="title" {...title} placeholder="title" />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input id="author" {...author} placeholder="author" />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input id="url" {...url} placeholder="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
