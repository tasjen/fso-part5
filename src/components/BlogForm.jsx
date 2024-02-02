import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import NotificationContext from '../context/NotificationContext';
import { VisibleContext } from './Togglable';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const { showNotification } = useContext(NotificationContext);
  const { toggleVisible } = useContext(VisibleContext);
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blogObject) => {
      toggleVisible();
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], [...blogs, blogObject]);
      showNotification({
        text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        error: false,
      });
      setTitle('');
      setAuthor('');
      setUrl('');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        showNotification({ text: error.response.data.error, error: true });
      } else {
        showNotification({ text: error, error: true });
      }
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    newBlogMutation.mutate({ title, author, url });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={'title'}>title</label>
          <input
            id={'title'}
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
            placeholder="title"
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
            placeholder="author"
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
            placeholder="url"
          />
        </div>
        <button type={'submit'}>create</button>
      </form>
    </>
  );
};

export default BlogForm;
