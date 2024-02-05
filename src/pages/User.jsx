import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const User = () => {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const blogs = queryClient.getQueryData(['blogs']);
  const user = blogs.find((e) => e.user.id === userId)?.user;

  return user ? (
    <>
      <h2>{user.name}</h2>
      <b>added blogs</b>
      <ul>
        {blogs
          .filter((b) => b.user.id === user.id)
          .map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
      </ul>
    </>
  ) : (
    <h1>user not found</h1>
  );
};

export default User;
