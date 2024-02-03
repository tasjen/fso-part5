import { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import NotificationContext from '../context/NotificationContext';

export const useInput = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return { type, value, onChange, onReset };
};

export const useBlogsQuery = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext);

  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { mutateAsync: addBlog } = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blogObject) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], [...blogs, blogObject]);
      showNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
    },
    onError: (err) => showNotification(err),
  });

  const { mutateAsync: updateBlog } = useMutation({
    mutationFn: blogService.update,
    onSuccess: (blogObject) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((e) => (e.id !== blogObject.id ? e : blogObject))
      );
    },
    onError: (err) => showNotification(err),
  });

  const { mutateAsync: removeBlog } = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((e) => e.id !== id)
      );
    },
    onError: (err) => showNotification(err),
  });

  return { blogs, addBlog, updateBlog, removeBlog, isLoading, isError, error };
};

export const useLocalStorage = (key) => {
  const { showNotification } = useContext(NotificationContext);

  const getItem = () => {
    try {
      const item = localStorage.getItem(key);
      return JSON.parse(item);
    } catch (err) {
      showNotification(err);
    }
  };

  const setItem = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      showNotification(err);
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      showNotification(err);
    }
  };

  return { getItem, setItem, removeItem };
};
