import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlogsQuery } from '../hooks';

const Users = () => {
  const { blogs } = useBlogsQuery();

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
      <h2>Users</h2>
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
