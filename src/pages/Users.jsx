import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Users = () => {
  const queryClient = useQueryClient();
  const blogs = queryClient.getQueryData(['blogs']) || [];

  const users = useMemo(
    () =>
      blogs.reduce((result, blog) => {
        const userInResult = result.find((e) => e.name === blog.user.name);
        if (!userInResult) {
          return [...result, { ...blog.user, blogCount: 1 }];
        }
        userInResult.blogCount += 1;
        return result;
      }, []),
    [blogs]
  );

  return (
    <div>
      <h1>Users</h1>
      <b>blogs created</b>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
