import { useParams } from 'react-router-dom';
import { useBlogsQuery } from '../hooks';

const User = () => {
  const { userId } = useParams();
  const { blogs } = useBlogsQuery();
  const user = blogs.find((e) => e.user.id === userId)?.user;

  return user ? (
    <div className="m-4">
      <h2>{user.name}</h2>
      <b>added blogs</b>
      <ul>
        {blogs
          .filter((b) => b.user.id === user.id)
          .map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
      </ul>
    </div>
  ) : (
    <h1>user not found</h1>
  );
};

export default User;
