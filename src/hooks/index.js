import { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import loginService from '../services/login';
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

export const useUserQuery = () => {
  const loggedUser = useLocalStorage('loggedUser');
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: loggedUser.getItem,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { user, isLoading, isError, error };
};

export const useUserMutation = () => {
  const queryClient = useQueryClient();
  const loggedUser = useLocalStorage('loggedUser');
  const { showNotification } = useContext(NotificationContext);

  const { mutateAsync: logIn } = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      loggedUser.setItem(user);
      queryClient.invalidateQueries(['user']);
    },
    onError: (err) => showNotification(err),
  });

  const { mutateAsync: logOut } = useMutation({
    mutationFn: loggedUser.removeItem,
    onSuccess: () => {
      queryClient.resetQueries(['blogs']);
      queryClient.setQueryData(['user'], null);
    },
    onError: (err) => showNotification(err),
  });

  return { logIn, logOut };
};

export const useBlogsQuery = () => {
  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  return { blogs, isLoading, isError, error };
};

export const useBlogsMutation = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext);

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

  const { mutateAsync: commentBlog } = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (blogObject) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((e) => (e.id !== blogObject.id ? e : blogObject))
      );
    },
    onError: (err) => showNotification(err),
  });

  return { addBlog, updateBlog, removeBlog, commentBlog };
};

export const useLocalStorage = (key) => {
  const getItem = () => {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  };

  const setItem = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = () => {
    localStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
};
