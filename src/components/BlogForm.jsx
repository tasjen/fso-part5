import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import NotificationContext from '../context/NotificationContext';
import { VisibleContext } from './Togglable';
import { useInput } from '../hooks';

const BlogForm = () => {
  const title = useInput('text');
  const author = useInput('text');
  const url = useInput('text');
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
      title.onReset();
      author.onReset();
      url.onReset();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        showNotification({ text: error.response.data.error, error: true });
      } else {
        showNotification({ text: error, error: true });
      }
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    newBlogMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value,
    });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={'title'}>title</label>
          <input id={'title'} {...title} placeholder="title" />
        </div>
        <div>
          <label htmlFor={'author'}>author</label>
          <input id={'author'} {...author} placeholder="author" />
        </div>
        <div>
          <label htmlFor={'url'}>url</label>
          <input id={'url'} {...url} placeholder="url" />
        </div>
        <button type={'submit'}>create</button>
      </form>
    </>
  );
};

export default BlogForm;
