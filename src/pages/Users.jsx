import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlogsQuery } from '../hooks';

const Users = () => {
  const { blogs, isLoading, isError, error } = useBlogsQuery();

  const users = useMemo(
    () =>
      blogs?.reduce((result, blog) => {
        const userInResult = result.find((e) => e.name === blog.user.name);
        if (!userInResult) {
          return [...result, { ...blog.user, blogCount: 1 }];
        }
        userInResult.blogCount += 1;
        return result;
      }, []),
    [blogs]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="m-4">
      <p className="text-2xl">Users</p>
      <b className="text-lg">blogs created</b>
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
